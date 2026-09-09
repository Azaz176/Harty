import { notFound } from "next/navigation";
import Link from "next/link";
import { Text } from "@harty/ui";
import { Reveal, StaggerGroup } from "@harty/motion";

const GENDER_DATA: Record<
  string,
  {
    headline: string;
    subline: string;
    categories: Array<{ slug: string; name: string; description: string }>;
  }
> = {
  men: {
    headline: "THE MEN'S EDIT",
    subline: "Curated essentials for the considered wardrobe.",
    categories: [
      { slug: "t-shirts", name: "T-Shirts", description: "From oversized to slim fit" },
      { slug: "shirts", name: "Shirts", description: "Linen, oxford, and beyond" },
      { slug: "jeans", name: "Jeans", description: "Every wash, every cut" },
      { slug: "trousers", name: "Trousers", description: "Tailored to relaxed" },
      { slug: "jackets", name: "Jackets", description: "Layer with intention" },
      { slug: "sweaters", name: "Sweaters", description: "Knits worth keeping" },
    ],
  },
  women: {
    headline: "THE WOMEN'S EDIT",
    subline: "Pieces that move between worlds.",
    categories: [
      { slug: "dresses", name: "Dresses", description: "From day to occasion" },
      { slug: "tops", name: "Tops", description: "The foundation of every outfit" },
      { slug: "skirts", name: "Skirts", description: "Midi, mini, and maxi" },
      { slug: "jeans-women", name: "Jeans", description: "High-rise to wide-leg" },
      { slug: "jackets-women", name: "Jackets", description: "Structured and soft" },
      { slug: "knitwear", name: "Knitwear", description: "Cashmere, merino, cotton" },
    ],
  },
  kids: {
    headline: "THE KIDS' EDIT",
    subline: "Fun, comfy, and built for play.",
    categories: [
      { slug: "kids-tshirts", name: "T-Shirts", description: "Colorful and comfortable" },
      { slug: "kids-dresses", name: "Dresses", description: "For every occasion" },
      { slug: "kids-jeans", name: "Jeans", description: "Durable and stretchy" },
      { slug: "kids-ethnic", name: "Ethnic Wear", description: "Festival-ready looks" },
      { slug: "kids-shoes", name: "Footwear", description: "From school to play" },
      { slug: "kids-winterwear", name: "Winterwear", description: "Warm and cosy layers" },
    ],
  },
  girls: {
    headline: "THE GIRLS' EDIT",
    subline: "Style that grows with her.",
    categories: [
      { slug: "girls-dresses", name: "Dresses & Frocks", description: "Pretty for every day" },
      { slug: "girls-tops", name: "Tops & Tees", description: "Mix, match, and layer" },
      { slug: "girls-leggings", name: "Leggings & Jeans", description: "Stretchy and fun" },
      { slug: "girls-skirts", name: "Skirts & Shorts", description: "Twirl-worthy picks" },
      { slug: "girls-ethnic", name: "Ethnic Wear", description: "Lehengas, kurtis, and more" },
      { slug: "girls-winterwear", name: "Winterwear", description: "Snug and stylish" },
    ],
  },
  boys: {
    headline: "THE BOYS' EDIT",
    subline: "Adventure-ready, always.",
    categories: [
      { slug: "boys-tshirts", name: "T-Shirts", description: "Graphic, plain, and polo" },
      { slug: "boys-shirts", name: "Shirts", description: "Casual and smart" },
      { slug: "boys-jeans", name: "Jeans & Trousers", description: "Tough enough to keep up" },
      { slug: "boys-shorts", name: "Shorts", description: "For sun-soaked days" },
      { slug: "boys-ethnic", name: "Ethnic Wear", description: "Kurtas and sherwanis" },
      { slug: "boys-winterwear", name: "Winterwear", description: "Warm layers for cold days" },
    ],
  },
  beautify: {
    headline: "BEAUTIFY",
    subline: "Glow up with premium skincare, makeup, and fragrances.",
    categories: [
      { slug: "moisturisers", name: "Skincare", description: "Serums, moisturisers, and SPF" },
      { slug: "lipstick", name: "Makeup", description: "From everyday to glam" },
      { slug: "shampoo", name: "Haircare", description: "Nourish from root to tip" },
      { slug: "perfumes", name: "Fragrances", description: "Signature scents" },
      { slug: "sunscreen", name: "Sun Protection", description: "Shield and glow" },
      { slug: "deodorants", name: "Deodorants", description: "Stay fresh all day" },
    ],
  },
  accessories: {
    headline: "ACCESSORIES",
    subline: "The finishing touch that makes the outfit.",
    categories: [
      { slug: "watches-men", name: "Watches", description: "Timeless timepieces" },
      { slug: "handbags", name: "Bags & Purses", description: "Carry in style" },
      { slug: "belts-men", name: "Belts & Wallets", description: "Leather and beyond" },
      { slug: "sunglasses", name: "Sunglasses", description: "Shade and statement" },
      { slug: "earrings", name: "Jewellery", description: "Subtle to statement" },
      { slug: "backpacks", name: "Backpacks", description: "For work, travel, and play" },
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ gender: string }>;
}) {
  const { gender } = await params;
  const data = GENDER_DATA[gender];
  if (!data) return {};

  return {
    title: `${data.headline} — Harty`,
    description: data.subline,
  };
}

export default async function GenderHubPage({
  params,
}: {
  params: Promise<{ gender: string }>;
}) {
  const { gender } = await params;
  const data = GENDER_DATA[gender];

  if (!data) notFound();

  return (
    <main className="mx-auto max-w-[1440px] px-4 py-16 lg:px-8">
      {/* Hero */}
      <Reveal dir="up" className="mb-16 lg:mb-24">
        <Text variant="hero" as="h1" weight="bold" tracking="hero" className="max-w-4xl">
          {data.headline}
        </Text>
        <Text variant="lead" color="ink-muted" className="mt-4 max-w-xl">
          {data.subline}
        </Text>
      </Reveal>

      {/* Category grid — asymmetric 12-col */}
      <StaggerGroup stagger={0.06} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.categories.map((cat) => (
          <Reveal key={cat.slug} dir="up">
            <Link
              href={`/${gender}/${cat.slug}`}
              className="group block border-b border-hairline pb-6 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-volt"
              data-cursor="view"
            >
              <Text variant="title" as="h2" weight="semibold" className="transition-colors duration-[var(--dur-micro)] group-hover:text-ink-muted">
                {cat.name}
              </Text>
              <Text variant="body" color="ink-muted" className="mt-1">
                {cat.description}
              </Text>
              <span className="mt-3 inline-block font-sans text-[length:var(--text-meta)] font-medium tracking-[var(--tracking-caps)] text-ink-faint uppercase transition-colors duration-[var(--dur-micro)] group-hover:text-volt">
                Explore
              </span>
            </Link>
          </Reveal>
        ))}
      </StaggerGroup>
    </main>
  );
}
