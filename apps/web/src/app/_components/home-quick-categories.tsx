"use client";

import Link from "next/link";

const QUICK_CATEGORIES = [
  {
    label: "Men",
    href: "/men",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&q=80",
  },
  {
    label: "Women",
    href: "/women",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=160&h=160&fit=crop&q=80",
  },
  {
    label: "Kids",
    href: "/kids",
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=160&h=160&fit=crop&q=80",
  },
  {
    label: "Girls",
    href: "/girls",
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=160&h=160&fit=crop&q=80",
  },
  {
    label: "Boys",
    href: "/boys",
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=160&h=160&fit=crop&q=80",
  },
  {
    label: "Beautify",
    href: "/beautify",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=160&h=160&fit=crop&q=80",
  },
  {
    label: "Accessories",
    href: "/accessories",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=160&h=160&fit=crop&q=80",
  },
  {
    label: "Watches",
    href: "/accessories/watches-men",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=160&h=160&fit=crop&q=80",
  },
  {
    label: "Bags",
    href: "/accessories/handbags",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=160&h=160&fit=crop&q=80",
  },
  {
    label: "Ethnic",
    href: "/women/sarees",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=160&h=160&fit=crop&q=80",
  },
  {
    label: "Formal",
    href: "/men/formal-shirts",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=160&h=160&fit=crop&q=80",
  },
  {
    label: "Trending",
    href: "/women/dresses",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=160&h=160&fit=crop&q=80",
  },
];

export function HomeQuickCategories() {
  return (
    <section className="py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="mb-8 text-center font-display text-[length:var(--text-display)] font-bold tracking-tight text-ink">
          Shop by Category
          <span className="mx-auto mt-2 block h-1 w-12 rounded-pill bg-volt" />
        </h2>
      </div>

      <div className="flex gap-6 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory lg:justify-center lg:gap-8 lg:px-8">
        {QUICK_CATEGORIES.map((cat) => (
          <Link
            key={cat.href}
            href={cat.href}
            className="group flex shrink-0 snap-start flex-col items-center gap-3"
          >
            <div className="size-20 overflow-hidden rounded-full border-2 border-hairline transition-all duration-[var(--dur-fast)] group-hover:border-volt group-hover:shadow-[0_0_0_3px_var(--color-volt)] md:size-24">
              <img
                src={cat.image}
                alt={cat.label}
                className="h-full w-full object-cover transition-transform duration-[var(--dur-fast)] group-hover:scale-110"
                loading="lazy"
              />
            </div>
            <span className="font-sans text-[length:var(--text-meta)] font-medium text-ink transition-colors duration-[var(--dur-micro)] group-hover:text-volt">
              {cat.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
