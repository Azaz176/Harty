import { Rating } from "@harty/ui";

interface Review {
  id: string;
  userName: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  fitFeedback?: "small" | "true" | "large";
  helpfulCount: number;
}

const MOCK_REVIEWS: Review[] = [
  {
    id: "r1",
    userName: "Priya M.",
    rating: 5,
    title: "Absolutely love the fit",
    body: "The fabric quality is outstanding for this price point. Fits perfectly true to size. Already ordered another one in a different colour.",
    date: "2 weeks ago",
    fitFeedback: "true",
    helpfulCount: 24,
  },
  {
    id: "r2",
    userName: "Rahul K.",
    rating: 4,
    title: "Great quality, slightly long",
    body: "Material feels premium. The length is a tad long for my frame (5'8\") but nothing a quick hem can't fix. Colour is exactly as shown.",
    date: "1 month ago",
    fitFeedback: "large",
    helpfulCount: 11,
  },
  {
    id: "r3",
    userName: "Ananya S.",
    rating: 4.5,
    title: "Perfect everyday piece",
    body: "This has become my go-to. Washes well, doesn't lose shape, and the cut is flattering. Highly recommend.",
    date: "3 weeks ago",
    fitFeedback: "true",
    helpfulCount: 18,
  },
  {
    id: "r4",
    userName: "Vikram T.",
    rating: 3.5,
    title: "Decent but sizing runs small",
    body: "Good fabric and stitching quality. However, I'd recommend sizing up if you prefer a relaxed fit. The M felt more like an S.",
    date: "1 month ago",
    fitFeedback: "small",
    helpfulCount: 32,
  },
];

const FIT_LABELS = { small: "Runs Small", true: "True to Size", large: "Runs Large" } as const;

function RatingDistribution({ avg, count }: { avg: number; count: number }) {
  const distribution = [
    { stars: 5, pct: 52 },
    { stars: 4, pct: 28 },
    { stars: 3, pct: 12 },
    { stars: 2, pct: 5 },
    { stars: 1, pct: 3 },
  ];

  return (
    <div className="flex gap-8 items-start">
      <div className="text-center shrink-0">
        <div className="font-display text-[length:var(--text-display)] tracking-[var(--tracking-hero)] text-ink">
          {avg.toFixed(1)}
        </div>
        <Rating value={avg} size="sm" />
        <p className="mt-1 font-sans text-[length:var(--text-micro)] text-ink-muted">
          {count.toLocaleString("en-IN")} ratings
        </p>
      </div>
      <div className="flex-1 space-y-1.5">
        {distribution.map((d) => (
          <div key={d.stars} className="flex items-center gap-2">
            <span className="w-3 font-sans text-[length:var(--text-micro)] text-ink-muted tabular-nums text-right">
              {d.stars}
            </span>
            <div className="flex-1 h-1.5 rounded-[var(--radius-pill)] bg-paper-sunk overflow-hidden">
              <div
                className="h-full rounded-[var(--radius-pill)] bg-volt"
                style={{ width: `${d.pct}%` }}
              />
            </div>
            <span className="w-8 font-sans text-[length:var(--text-micro)] text-ink-faint tabular-nums">
              {d.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FitDistribution() {
  const data = { small: 12, true: 78, large: 10 };
  return (
    <div className="space-y-2">
      <p className="font-sans text-[length:var(--text-meta)] font-medium text-ink">
        Fit Feedback
      </p>
      <div className="flex h-2 w-full overflow-hidden rounded-[var(--radius-pill)]">
        <div className="bg-clay" style={{ width: `${data.small}%` }} />
        <div className="bg-success" style={{ width: `${data.true}%` }} />
        <div className="bg-sale/60" style={{ width: `${data.large}%` }} />
      </div>
      <div className="flex justify-between font-sans text-[length:var(--text-micro)] text-ink-muted">
        <span>Runs Small ({data.small}%)</span>
        <span>True to Size ({data.true}%)</span>
        <span>Runs Large ({data.large}%)</span>
      </div>
    </div>
  );
}

export async function ReviewsPanel({ productId }: { productId: string }) {
  // In production, this would fetch from the reviews tRPC endpoint
  const reviews = MOCK_REVIEWS;
  const avg = 4.2;
  const count = 1204;

  return (
    <section className="py-[var(--space-section)]" aria-labelledby="reviews-heading">
      <h2
        id="reviews-heading"
        className="font-display text-[length:var(--text-title)] tracking-[var(--tracking-hero)] text-ink mb-8"
      >
        Reviews
      </h2>

      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5 space-y-6">
          <RatingDistribution avg={avg} count={count} />
          <FitDistribution />
        </div>

        <div className="lg:col-span-7 divide-y divide-hairline">
          {reviews.map((review) => (
            <article key={review.id} className="py-5 first:pt-0">
              <div className="flex items-center gap-3 mb-2">
                <Rating value={review.rating} size="sm" />
                <span className="font-sans text-[length:var(--text-meta)] font-medium text-ink">
                  {review.userName}
                </span>
                <span className="font-sans text-[length:var(--text-micro)] text-ink-faint">
                  {review.date}
                </span>
              </div>

              {review.title && (
                <h3 className="font-sans text-[length:var(--text-body)] font-medium text-ink mb-1">
                  {review.title}
                </h3>
              )}

              <p className="font-sans text-[length:var(--text-body)] text-ink-muted leading-relaxed">
                {review.body}
              </p>

              <div className="flex items-center gap-4 mt-3">
                {review.fitFeedback && (
                  <span className="inline-flex items-center rounded-[var(--radius-pill)] border border-hairline px-2.5 py-1 font-sans text-[length:var(--text-micro)] text-ink-muted">
                    {FIT_LABELS[review.fitFeedback]}
                  </span>
                )}
                <button
                  type="button"
                  className="font-sans text-[length:var(--text-micro)] text-ink-muted transition-colors duration-[var(--dur-micro)] hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt"
                >
                  Helpful ({review.helpfulCount})
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
