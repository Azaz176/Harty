"use client";

import { ProductCard } from "./product-card";
import { StaggerGroup } from "@harty/motion";

interface ProductGridProps {
  items: Array<Record<string, unknown>>;
  density: "comfort" | "compact";
}

export function ProductGrid({ items, density }: ProductGridProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <p className="font-sans text-[length:var(--text-title)] font-medium text-ink">
          No products found
        </p>
        <p className="mt-2 font-sans text-[length:var(--text-body)] text-ink-muted">
          Try adjusting your filters or browse our full collection.
        </p>
      </div>
    );
  }

  return (
    <StaggerGroup
      stagger={0.035}
      className={
        density === "compact"
          ? "grid grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-3 lg:grid-cols-4"
          : "grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-3"
      }
    >
      {items.map((product) => (
        <ProductCard key={product.id as string} product={product} density={density} />
      ))}
    </StaggerGroup>
  );
}
