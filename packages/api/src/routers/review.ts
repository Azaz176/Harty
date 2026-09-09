import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { products } from "../data/mock-products";

type MockReview = {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  title: string;
  body: string;
  fitFeedback: "small" | "true" | "large" | null;
  media: Array<{ url: string; type: string }>;
  helpfulCount: number;
  createdAt: string;
};

const REVIEWER_NAMES = [
  "Priya S.", "Arjun K.", "Sneha M.", "Rahul D.", "Ananya P.",
  "Vikram R.", "Meera T.", "Rohit B.", "Ishita G.", "Karthik N.",
  "Divya L.", "Aditya V.", "Neha C.", "Siddharth J.", "Pooja W.",
];

const REVIEW_BODIES: Record<number, string[]> = {
  5: [
    "Absolutely love the fabric quality. The fit is exactly as described and the stitching is impeccable. Would buy again in a heartbeat.",
    "Perfect addition to my wardrobe. The material feels premium and it drapes beautifully. Received so many compliments already.",
    "Exceeded expectations. True to size, comfortable for all-day wear, and the color is exactly as shown. Fast delivery too.",
  ],
  4: [
    "Great quality for the price. Fits well, though slightly longer than expected. The fabric is soft and breathable.",
    "Really nice piece. The cut is modern and flattering. Took off one star because the color is slightly different from the photos.",
    "Solid purchase. Good construction, comfortable material. Runs just a tiny bit large but nothing a size down wouldn't fix.",
  ],
  3: [
    "Decent quality but the sizing runs a bit small. Had to exchange for a larger size. Material is okay, not premium.",
    "Average product. The fabric is thinner than I expected from the photos. Fit is acceptable after a wash.",
  ],
};

const REVIEW_TITLES = [
  "Love this piece!", "Great quality", "Perfect fit", "Exceeded expectations",
  "Good value", "Nice fabric", "Runs slightly large", "Beautiful color",
  "Comfortable and stylish", "Worth every rupee", "Decent purchase",
  "Not bad for the price", "Pleasantly surprised", "A wardrobe staple",
];

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

function generateReviews(productId: string): MockReview[] {
  const seed = productId.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const rng = seededRandom(seed);
  const count = 5 + Math.floor(rng() * 11);
  const reviews: MockReview[] = [];

  for (let i = 0; i < count; i++) {
    const rating = Math.min(5, Math.max(3, Math.round(3 + rng() * 2.5)));
    const bodies = REVIEW_BODIES[rating] ?? REVIEW_BODIES[4]!;
    const daysAgo = Math.floor(rng() * 180);
    const date = new Date(Date.now() - daysAgo * 86400000);

    const hasFit = rng() > 0.4;
    const fitOptions: Array<"small" | "true" | "large"> = ["small", "true", "large"];
    const fitWeights = [0.2, 0.6, 0.2];
    let fitFeedback: "small" | "true" | "large" | null = null;
    if (hasFit) {
      const r = rng();
      if (r < fitWeights[0]!) fitFeedback = fitOptions[0]!;
      else if (r < fitWeights[0]! + fitWeights[1]!) fitFeedback = fitOptions[1]!;
      else fitFeedback = fitOptions[2]!;
    }

    reviews.push({
      id: `rev-${productId}-${i}`,
      productId,
      userName: REVIEWER_NAMES[Math.floor(rng() * REVIEWER_NAMES.length)]!,
      rating,
      title: REVIEW_TITLES[Math.floor(rng() * REVIEW_TITLES.length)]!,
      body: bodies[Math.floor(rng() * bodies.length)]!,
      fitFeedback,
      media: rng() > 0.7
        ? [{ url: `https://images.unsplash.com/photo-${1500000000 + Math.floor(rng() * 100000000)}?w=200&h=200&fit=crop`, type: "image" }]
        : [],
      helpfulCount: Math.floor(rng() * 24),
      createdAt: date.toISOString(),
    });
  }

  return reviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

const reviewCache = new Map<string, MockReview[]>();
const helpfulCounts = new Map<string, number>();

function getReviews(productId: string): MockReview[] {
  let reviews = reviewCache.get(productId);
  if (!reviews) {
    reviews = generateReviews(productId);
    reviewCache.set(productId, reviews);
  }
  return reviews.map((r) => ({
    ...r,
    helpfulCount: helpfulCounts.get(r.id) ?? r.helpfulCount,
  }));
}

export const reviewRouter = router({
  list: publicProcedure
    .input(
      z.object({
        productId: z.string().min(1),
        page: z.number().int().min(1).default(1),
        sort: z.enum(["newest", "helpful", "rating_high", "rating_low"]).default("newest"),
      }),
    )
    .query(({ input }) => {
      const PAGE_SIZE = 10;
      let reviews = getReviews(input.productId);

      switch (input.sort) {
        case "helpful":
          reviews = [...reviews].sort((a, b) => b.helpfulCount - a.helpfulCount);
          break;
        case "rating_high":
          reviews = [...reviews].sort((a, b) => b.rating - a.rating);
          break;
        case "rating_low":
          reviews = [...reviews].sort((a, b) => a.rating - b.rating);
          break;
        case "newest":
        default:
          break;
      }

      const start = (input.page - 1) * PAGE_SIZE;
      const items = reviews.slice(start, start + PAGE_SIZE);

      return {
        items,
        total: reviews.length,
        page: input.page,
        totalPages: Math.ceil(reviews.length / PAGE_SIZE),
      };
    }),

  summary: publicProcedure
    .input(z.object({ productId: z.string().min(1) }))
    .query(({ input }) => {
      const reviews = getReviews(input.productId);
      const total = reviews.length;

      if (total === 0) {
        return {
          averageRating: 0,
          totalCount: 0,
          distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
          fitDistribution: { small: 0, true: 0, large: 0 },
        };
      }

      const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } as Record<number, number>;
      let ratingSum = 0;
      const fitCounts = { small: 0, true: 0, large: 0 };
      let fitTotal = 0;

      for (const r of reviews) {
        ratingSum += r.rating;
        distribution[r.rating] = (distribution[r.rating] ?? 0) + 1;
        if (r.fitFeedback) {
          fitCounts[r.fitFeedback]++;
          fitTotal++;
        }
      }

      return {
        averageRating: Math.round((ratingSum / total) * 10) / 10,
        totalCount: total,
        distribution,
        fitDistribution:
          fitTotal > 0
            ? {
                small: Math.round((fitCounts.small / fitTotal) * 100),
                true: Math.round((fitCounts.true / fitTotal) * 100),
                large: Math.round((fitCounts.large / fitTotal) * 100),
              }
            : { small: 0, true: 0, large: 0 },
      };
    }),

  markHelpful: publicProcedure
    .input(z.object({ reviewId: z.string().min(1) }))
    .mutation(({ input }) => {
      const current = helpfulCounts.get(input.reviewId) ?? 0;
      helpfulCounts.set(input.reviewId, current + 1);
      return { reviewId: input.reviewId, helpfulCount: current + 1 };
    }),
});
