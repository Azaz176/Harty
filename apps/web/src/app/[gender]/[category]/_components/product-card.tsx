"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { ImageFrame, PriceTicker, Rating } from "@harty/ui";
import { Reveal } from "@harty/motion";

interface ProductCardProps {
  product: Record<string, unknown>;
  density: "comfort" | "compact";
}

export function ProductCard({ product, density }: ProductCardProps) {
  const isCompact = density === "compact";
  const p = product as {
    id: string;
    slug: string;
    title: string;
    brand: { slug: string; name: string } | null;
    price: number;
    mrp: number;
    discount: number;
    ratingAvg: number;
    ratingCount: number;
    image: { url: string; blurhash: string; width: number; height: number; alt: string } | null;
    colors: Array<{ name: string; hex: string }>;
    inStock: boolean;
  };

  return (
    <Reveal dir="up" once className="group">
      <Link
        href={`/p/${p.slug}`}
        className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-volt"
        data-cursor="view"
      >
        {/* Image */}
        <div className="relative overflow-hidden">
          <ImageFrame
            src={p.image?.url ?? "/placeholder.jpg"}
            alt={p.image?.alt ?? p.title}
            width={p.image?.width ?? 640}
            height={p.image?.height ?? 853}
            ratio="3/4"
            sizes={isCompact ? "(min-width: 1024px) 25vw, 50vw" : "(min-width: 1024px) 33vw, 50vw"}
            className="transition-transform duration-[var(--dur-base)] ease-[var(--ease-out-expo)] group-hover:scale-[1.02]"
          />

          {/* Wishlist */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-paper/80 backdrop-blur-sm transition-transform duration-[var(--dur-micro)] ease-[var(--ease-out-expo)] hover:scale-110 focus-visible:outline-2 focus-visible:outline-volt"
            aria-label={`Add ${p.title} to wishlist`}
          >
            <Heart className="size-4 text-ink" />
          </button>

          {/* Discount badge */}
          {p.discount > 0 && (
            <span className="absolute bottom-2 left-2 bg-sale px-2 py-0.5 text-[length:var(--text-micro)] font-semibold text-paper">
              {p.discount}% OFF
            </span>
          )}

          {/* Out of stock */}
          {!p.inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-paper/60">
              <span className="font-sans text-[length:var(--text-meta)] font-medium tracking-[var(--tracking-caps)] text-ink-muted uppercase">
                Sold Out
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className={isCompact ? "mt-2 space-y-0.5" : "mt-3 space-y-1"}>
          {p.brand && (
            <p className="font-sans text-[length:var(--text-micro)] font-medium tracking-[var(--tracking-caps)] text-ink-muted uppercase truncate">
              {p.brand.name}
            </p>
          )}

          <p className={`font-sans text-ink truncate ${isCompact ? "text-[length:var(--text-micro)]" : "text-[length:var(--text-body)]"}`}>
            {p.title}
          </p>

          <PriceTicker
            value={p.price}
            mrp={p.mrp > p.price ? p.mrp : undefined}
            className={isCompact ? "text-[length:var(--text-micro)]" : "text-[length:var(--text-body)]"}
          />

          {p.ratingAvg > 0 && !isCompact && (
            <Rating value={p.ratingAvg} count={p.ratingCount} size="sm" />
          )}

          {p.colors?.length > 1 && !isCompact && (
            <div className="flex gap-1 pt-1">
              {p.colors.slice(0, 5).map((c) => (
                <span
                  key={c.hex}
                  className="size-3 rounded-full border border-hairline"
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
              {p.colors.length > 5 && (
                <span className="text-[length:var(--text-micro)] text-ink-faint">
                  +{p.colors.length - 5}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </Reveal>
  );
}
