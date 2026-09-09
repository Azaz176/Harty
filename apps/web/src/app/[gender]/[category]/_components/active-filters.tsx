"use client";

import { Chip } from "@harty/ui";
import type { SetPlpParams } from "./use-plp-params";

interface ActiveFiltersProps {
  brands: string[] | null;
  sizes: string[] | null;
  colors: string[] | null;
  setParams: SetPlpParams;
}

export function ActiveFilters({ brands, sizes, colors, setParams }: ActiveFiltersProps) {
  const filters: Array<{ type: string; value: string; key: "brand" | "size" | "color" }> = [];

  if (brands?.length) {
    for (const b of brands) filters.push({ type: "Brand", value: b, key: "brand" });
  }
  if (sizes?.length) {
    for (const s of sizes) filters.push({ type: "Size", value: s, key: "size" });
  }
  if (colors?.length) {
    for (const c of colors) filters.push({ type: "Color", value: c, key: "color" });
  }

  if (filters.length === 0) return null;

  const removeFilter = (key: "brand" | "size" | "color", value: string) => {
    const paramKey = key;
    const current = { brand: brands, size: sizes, color: colors }[paramKey] ?? [];
    const updated = current.filter((v) => v !== value);
    setParams({ [paramKey]: updated.length > 0 ? updated : null, page: 1 });
  };

  const clearAll = () => {
    setParams({ brand: null, size: null, color: null, priceMin: null, priceMax: null, page: 1 });
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {filters.map((f) => (
        <Chip
          key={`${f.key}-${f.value}`}
          variant="removable"
          size="sm"
          onRemove={() => removeFilter(f.key, f.value)}
        >
          {f.value}
        </Chip>
      ))}
      <button
        type="button"
        onClick={clearAll}
        className="font-sans text-[length:var(--text-micro)] text-ink-muted underline underline-offset-2 transition-colors duration-[var(--dur-micro)] hover:text-ink"
      >
        Clear all
      </button>
    </div>
  );
}
