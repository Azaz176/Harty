"use client";

import { InfiniteMovingCards } from "@harty/ui";

const BRANDS_ROW_1 = [
  { name: "GUCCI" },
  { name: "PRADA" },
  { name: "LOUIS VUITTON" },
  { name: "VERSACE" },
  { name: "BURBERRY" },
  { name: "DIOR" },
];

const BRANDS_ROW_2 = [
  { name: "BALENCIAGA" },
  { name: "ARMANI" },
  { name: "VALENTINO" },
  { name: "FENDI" },
  { name: "DOLCE & GABBANA" },
  { name: "ZARA" },
];

function BrandCard({ name }: { name: string }) {
  return (
    <div className="flex h-20 w-48 items-center justify-center rounded-lg border border-hairline bg-paper px-6 transition-colors duration-[var(--dur-fast)] hover:border-ink md:h-24 md:w-56">
      <span className="font-display text-[length:var(--text-lead)] font-bold uppercase tracking-[var(--tracking-caps)] text-ink-muted transition-colors duration-[var(--dur-fast)] hover:text-ink md:text-[length:var(--text-title)]">
        {name}
      </span>
    </div>
  );
}

export function HomeBrandMarquee() {
  return (
    <section className="overflow-hidden bg-paper-sunk py-12 md:py-16">
      <h2 className="mb-8 text-center font-display text-[length:var(--text-display)] font-bold tracking-tight text-ink">
        Shop by Brand
      </h2>

      <div className="space-y-4">
        <InfiniteMovingCards
          items={BRANDS_ROW_1}
          direction="left"
          speed="normal"
          pauseOnHover
          renderItem={(item) => <BrandCard name={item.name} />}
        />
        <InfiniteMovingCards
          items={BRANDS_ROW_2}
          direction="right"
          speed="normal"
          pauseOnHover
          renderItem={(item) => <BrandCard name={item.name} />}
        />
      </div>
    </section>
  );
}
