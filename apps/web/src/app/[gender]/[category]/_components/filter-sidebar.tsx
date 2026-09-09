"use client";

import { useCallback } from "react";
import { SlidersHorizontal } from "lucide-react";
import {
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Chip,
  Drawer,
  Button,
} from "@harty/ui";
import type { SetPlpParams } from "./use-plp-params";

interface Facets {
  brands: Array<{ slug: string; name: string; count: number }>;
  categories: Array<{ slug: string; name: string; count: number }>;
  sizes: Array<{ value: string; count: number }>;
  colors: Array<{ value: string; hex: string; count: number }>;
  priceBuckets: Array<{ label: string; min: number; max: number; count: number }>;
}

interface FilterSidebarProps {
  facets: Facets;
  selectedBrands: string[] | null;
  selectedSizes: string[] | null;
  selectedColors: string[] | null;
  total: number;
  setParams: SetPlpParams;
}

export function FilterSidebar({
  facets,
  selectedBrands,
  selectedSizes,
  selectedColors,
  total,
  setParams,
}: FilterSidebarProps) {
  const toggleFilter = useCallback(
    (key: "brand" | "size" | "color", value: string) => {
      const current = { brand: selectedBrands, size: selectedSizes, color: selectedColors }[key] ?? [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      setParams({ [key]: updated.length > 0 ? updated : null, page: 1 });
    },
    [selectedBrands, selectedSizes, selectedColors, setParams]
  );

  const content = (
    <div className="space-y-0">
      <AccordionRoot type="multiple" defaultValue={["brands", "sizes", "colors"]}>
        {/* Brands */}
        <AccordionItem value="brands">
          <AccordionTrigger>Brand</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2">
              {facets.brands
                .filter((b) => b.count > 0)
                .map((brand) => (
                  <Chip
                    key={brand.slug}
                    size="sm"
                    variant={selectedBrands?.includes(brand.slug) ? "active" : "default"}
                    onClick={() => toggleFilter("brand", brand.slug)}
                  >
                    {brand.name}
                    <span className="text-ink-faint ml-0.5">({brand.count})</span>
                  </Chip>
                ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Sizes */}
        <AccordionItem value="sizes">
          <AccordionTrigger>Size</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2">
              {facets.sizes
                .filter((s) => s.count > 0)
                .map((size) => (
                  <Chip
                    key={size.value}
                    size="sm"
                    variant={selectedSizes?.includes(size.value) ? "active" : "default"}
                    onClick={() => toggleFilter("size", size.value)}
                  >
                    {size.value}
                  </Chip>
                ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Colors */}
        <AccordionItem value="colors">
          <AccordionTrigger>Color</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2">
              {facets.colors
                .filter((c) => c.count > 0)
                .map((color) => (
                  <Chip
                    key={color.value}
                    size="sm"
                    variant={selectedColors?.includes(color.value) ? "active" : "default"}
                    onClick={() => toggleFilter("color", color.value)}
                  >
                    <span
                      className="size-3 rounded-full border border-hairline"
                      style={{ backgroundColor: color.hex }}
                    />
                    {color.value}
                  </Chip>
                ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price */}
        <AccordionItem value="price">
          <AccordionTrigger>Price</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2">
              {facets.priceBuckets
                .filter((b) => b.count > 0)
                .map((bucket) => (
                  <Chip
                    key={bucket.label}
                    size="sm"
                    variant="default"
                    onClick={() =>
                      setParams({ priceMin: bucket.min, priceMax: bucket.max, page: 1 })
                    }
                  >
                    {bucket.label} ({bucket.count})
                  </Chip>
                ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </AccordionRoot>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <p className="mb-4 font-sans text-[length:var(--text-meta)] font-medium text-ink-muted">
            {total.toLocaleString("en-IN")} results
          </p>
          {content}
        </div>
      </aside>

      {/* Mobile drawer trigger + sheet */}
      <div className="lg:hidden">
        <Drawer.Root>
          <Drawer.Trigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <SlidersHorizontal className="size-4" />
              Filters
            </Button>
          </Drawer.Trigger>
          <Drawer.Content>
            <Drawer.Title className="font-sans text-[length:var(--text-title)] font-semibold text-ink px-4 pb-2">
              Filters
            </Drawer.Title>
            <p className="px-4 pb-4 font-sans text-[length:var(--text-meta)] text-ink-muted">
              {total.toLocaleString("en-IN")} results
            </p>
            {content}
          </Drawer.Content>
        </Drawer.Root>
      </div>
    </>
  );
}
