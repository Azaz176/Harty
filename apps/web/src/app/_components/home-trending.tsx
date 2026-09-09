"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal, StaggerGroup } from "@harty/motion";

type TrendingProduct = {
  id: string;
  slug: string;
  title: string;
  brand: { slug: string; name: string } | null;
  price: number;
  mrp: number;
  discount: number;
  image: { url: string; blurhash?: string | null } | null;
};

function formatPrice(paise: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(paise / 100);
}

export function HomeTrending({ products }: { products: TrendingProduct[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = direction === "left" ? -320 : 320;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="py-[var(--space-section)]">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <Reveal dir="up">
            <h2 className="font-display text-[length:var(--text-display)] font-bold tracking-tight text-ink">
              Trending Now
              <span className="ml-0 mt-2 block h-1 w-12 rounded-pill bg-volt" />
            </h2>
          </Reveal>
          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="flex size-10 items-center justify-center rounded-full border border-hairline transition-colors duration-[var(--dur-micro)] hover:border-ink hover:bg-ink hover:text-paper"
              aria-label="Scroll left"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="flex size-10 items-center justify-center rounded-full border border-hairline transition-colors duration-[var(--dur-micro)] hover:border-ink hover:bg-ink hover:text-paper"
              aria-label="Scroll right"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory lg:px-8"
      >
        <div className="shrink-0 w-[max(1rem,calc((100vw-80rem)/2+1rem))] lg:w-[max(2rem,calc((100vw-80rem)/2+2rem))]" />
        <StaggerGroup stagger={0.05} className="flex gap-4">
          {products.map((product) => (
            <Reveal key={product.id} dir="up">
              <Link
                href={`/p/${product.slug}`}
                className="group block w-[220px] shrink-0 snap-start lg:w-[280px]"
              >
                <div className="relative mb-3 overflow-hidden rounded-md bg-paper-sunk shadow-sm transition-shadow duration-[var(--dur-fast)] group-hover:shadow-lg" style={{ aspectRatio: "3/4" }}>
                  {product.image && (
                    <img
                      src={product.image.url}
                      alt={product.title}
                      className="h-full w-full object-cover transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
                      loading="lazy"
                    />
                  )}
                  {product.discount > 0 && (
                    <span className="absolute top-2 left-2 rounded-sm bg-volt px-2 py-0.5 font-sans text-[length:var(--text-micro)] font-bold text-volt-ink">
                      -{product.discount}%
                    </span>
                  )}
                </div>
                <div>
                  <span className="block font-sans text-[length:var(--text-micro)] font-medium uppercase tracking-[var(--tracking-caps)] text-ink-muted">
                    {product.brand?.name}
                  </span>
                  <span className="mt-0.5 block truncate font-sans text-[length:var(--text-body)] text-ink">
                    {product.title}
                  </span>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="font-sans text-[length:var(--text-body)] font-semibold text-ink">
                      {formatPrice(product.price)}
                    </span>
                    {product.mrp > product.price && (
                      <>
                        <span className="font-sans text-[length:var(--text-meta)] text-ink-faint line-through">
                          {formatPrice(product.mrp)}
                        </span>
                        <span className="font-sans text-[length:var(--text-micro)] font-semibold text-volt">
                          {product.discount}% off
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </StaggerGroup>
        <div className="shrink-0 w-4" />
      </div>
    </section>
  );
}
