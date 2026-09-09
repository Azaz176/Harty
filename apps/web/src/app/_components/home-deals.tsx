"use client";

import Link from "next/link";
import { SparklesText } from "@harty/ui";

const DEALS = [
  {
    id: 1,
    title: "Up to 60% Off",
    brand: "Gucci",
    subtitle: "Luxury at unbeatable prices",
    href: "/brands/gucci",
    gradient: "from-red-900 via-red-800 to-red-950",
    accent: "text-yellow",
  },
  {
    id: 2,
    title: "Buy 2 Get 1 Free",
    brand: "Basics Collection",
    subtitle: "Everyday essentials",
    href: "/men/t-shirts",
    gradient: "from-amber-600 via-yellow-500 to-amber-600",
    accent: "text-ink",
  },
  {
    id: 3,
    title: "Flat 50% Off",
    brand: "Versace",
    subtitle: "Limited time only",
    href: "/brands/versace",
    gradient: "from-zinc-900 via-zinc-800 to-zinc-950",
    accent: "text-yellow",
  },
  {
    id: 4,
    title: "Starting ₹999",
    brand: "New Collection",
    subtitle: "Fresh arrivals daily",
    href: "/women",
    gradient: "from-rose-700 via-red-600 to-rose-800",
    accent: "text-paper",
  },
  {
    id: 5,
    title: "Up to 40% Off",
    brand: "Burberry",
    subtitle: "Iconic styles on sale",
    href: "/brands/burberry",
    gradient: "from-stone-800 via-stone-700 to-stone-900",
    accent: "text-yellow",
  },
  {
    id: 6,
    title: "Min 30% Off",
    brand: "Beauty Store",
    subtitle: "Top skincare & makeup",
    href: "/beautify",
    gradient: "from-pink-700 via-pink-600 to-pink-800",
    accent: "text-paper",
  },
  {
    id: 7,
    title: "Extra 20% Off",
    brand: "Accessories",
    subtitle: "Use code HARTY20",
    href: "/accessories",
    gradient: "from-violet-900 via-violet-800 to-violet-950",
    accent: "text-yellow",
  },
  {
    id: 8,
    title: "Under ₹499",
    brand: "Kids Special",
    subtitle: "Cute styles, tiny prices",
    href: "/kids",
    gradient: "from-sky-600 via-blue-500 to-sky-700",
    accent: "text-paper",
  },
];

export function HomeDeals() {
  return (
    <section className="bg-ink py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="mb-8 font-display text-[length:var(--text-display)] font-bold tracking-tight text-paper">
          Best Offers
          <span className="ml-3 inline-block rounded-pill bg-yellow px-3 py-1 align-middle font-sans text-[length:var(--text-micro)] font-bold uppercase text-yellow-ink">
            Limited Time
          </span>
        </h2>
      </div>

      <div className="flex gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory lg:px-8">
        {DEALS.map((deal) => (
          <Link
            key={deal.id}
            href={deal.href}
            className="group block w-[260px] shrink-0 snap-start md:w-[300px]"
          >
            <div
              className={`relative flex h-[180px] flex-col justify-between overflow-hidden rounded-lg bg-gradient-to-br ${deal.gradient} p-5 transition-transform duration-[var(--dur-fast)] group-hover:scale-[1.03] md:h-[200px]`}
            >
              <div>
                <span className="mb-1 block font-sans text-[length:var(--text-micro)] font-medium uppercase tracking-[var(--tracking-caps)] text-paper/60">
                  {deal.brand}
                </span>
                <SparklesText className={`font-display text-[length:var(--text-title)] font-bold leading-tight ${deal.accent}`}>
                  {deal.title}
                </SparklesText>
              </div>
              <div className="flex items-end justify-between">
                <span className="font-sans text-[length:var(--text-meta)] text-paper/70">
                  {deal.subtitle}
                </span>
                <span className="rounded-md bg-paper/20 px-3 py-1 font-sans text-[length:var(--text-micro)] font-semibold text-paper backdrop-blur-sm transition-colors duration-[var(--dur-micro)] group-hover:bg-paper/30">
                  Shop Now
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
