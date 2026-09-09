"use client";

import { usePlpParams } from "./use-plp-params";
import { FilterSidebar } from "./filter-sidebar";
import { ProductGrid } from "./product-grid";
import { SortSelect } from "./sort-select";
import { DensityToggle } from "./density-toggle";
import { ActiveFilters } from "./active-filters";
import { trpc } from "@/lib/trpc/client";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "../../../../../../../packages/api/src";

type CatalogListOutput = inferRouterOutputs<AppRouter>["catalog"]["list"];

interface PlpClientProps {
  gender: string;
  category: string;
  initialData: CatalogListOutput;
}

export function PlpClient({ gender, category, initialData }: PlpClientProps) {
  const [params, setParams] = usePlpParams();
  const density = (params.density === "compact" ? "compact" : "comfort") as "comfort" | "compact";

  const { data } = trpc.catalog.list.useQuery(
    {
      filters: {
        gender,
        categories: [category],
        brands: params.brand ?? undefined,
        sizes: params.size ?? undefined,
        colors: params.color ?? undefined,
        priceRange:
          params.priceMin != null && params.priceMax != null
            ? [params.priceMin, params.priceMax]
            : undefined,
      },
      sort: (params.sort ?? "relevance") as
        | "relevance"
        | "newest"
        | "price_asc"
        | "price_desc"
        | "discount"
        | "popularity",
      page: params.page ?? 1,
    },
    { initialData, staleTime: 30_000 }
  );

  const { items, facets, total, page, totalPages } = data ?? initialData;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
      {/* Filter sidebar — 3 cols on desktop */}
      <div className="lg:col-span-3">
        <FilterSidebar
          facets={facets}
          selectedBrands={params.brand}
          selectedSizes={params.size}
          selectedColors={params.color}
          total={total}
          setParams={setParams}
        />
      </div>

      {/* Product area — 9 cols */}
      <div className="lg:col-span-9">
        {/* Toolbar */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <p className="hidden font-sans text-[length:var(--text-meta)] text-ink-muted lg:block">
              {total.toLocaleString("en-IN")} products
            </p>
            <div className="lg:hidden">
              <FilterSidebar
                facets={facets}
                selectedBrands={params.brand}
                selectedSizes={params.size}
                selectedColors={params.color}
                total={total}
                setParams={setParams}
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <SortSelect
              value={params.sort ?? "relevance"}
              onChange={(sort) => setParams({ sort, page: 1 })}
            />
            <DensityToggle
              density={density}
              onChange={(d) => setParams({ density: d })}
            />
          </div>
        </div>

        {/* Active filters */}
        <ActiveFilters
          brands={params.brand}
          sizes={params.size}
          colors={params.color}
          setParams={setParams}
        />

        {/* Grid */}
        <div className="mt-6">
          <ProductGrid items={items} density={density} />
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Pagination">
            {page > 1 && (
              <button
                type="button"
                onClick={() => setParams({ page: page - 1 })}
                className="rounded-[var(--radius-sm)] border border-hairline px-4 py-2 font-sans text-[length:var(--text-meta)] text-ink transition-colors duration-[var(--dur-micro)] hover:bg-paper-sunk"
              >
                Previous
              </button>
            )}
            <span className="font-sans text-[length:var(--text-meta)] text-ink-muted">
              Page {page} of {totalPages}
            </span>
            {page < totalPages && (
              <button
                type="button"
                onClick={() => setParams({ page: page + 1 })}
                className="rounded-[var(--radius-sm)] border border-hairline px-4 py-2 font-sans text-[length:var(--text-meta)] text-ink transition-colors duration-[var(--dur-micro)] hover:bg-paper-sunk"
              >
                Next
              </button>
            )}
          </nav>
        )}
      </div>
    </div>
  );
}
