import { notFound } from "next/navigation";
import { Suspense } from "react";
import { api } from "@/lib/trpc/server";
import { PlpClient } from "./_components/plp-client";
import { Text } from "@harty/ui";

const VALID_GENDERS = ["men", "women", "kids", "girls", "boys", "beautify", "accessories"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ gender: string; category: string }>;
}) {
  const { gender, category } = await params;
  const categoryName = category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const genderName = gender.charAt(0).toUpperCase() + gender.slice(1);

  return {
    title: `${genderName}'s ${categoryName} — Harty`,
    description: `Shop the latest ${categoryName.toLowerCase()} for ${genderName.toLowerCase()}. Editorial-grade fashion at Harty.`,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ gender: string; category: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { gender, category } = await params;
  const sp = await searchParams;

  if (!VALID_GENDERS.includes(gender)) notFound();

  const parseCsv = (v: string | string[] | undefined): string[] | undefined => {
    if (!v) return undefined;
    const str = Array.isArray(v) ? v[0] : v;
    return str ? str.split(",").filter(Boolean) : undefined;
  };

  const brands = parseCsv(sp.brand);
  const sizes = parseCsv(sp.size);
  const colors = parseCsv(sp.color);
  const sort = (typeof sp.sort === "string" ? sp.sort : "relevance") as
    | "relevance" | "newest" | "price_asc" | "price_desc" | "discount" | "popularity";
  const page = typeof sp.page === "string" ? Math.max(1, parseInt(sp.page, 10) || 1) : 1;

  const priceMin = typeof sp.priceMin === "string" ? parseInt(sp.priceMin, 10) : undefined;
  const priceMax = typeof sp.priceMax === "string" ? parseInt(sp.priceMax, 10) : undefined;

  const data = await api.catalog.list({
    filters: {
      gender,
      categories: [category],
      brands,
      sizes,
      colors,
      priceRange: priceMin != null && priceMax != null ? [priceMin, priceMax] : undefined,
    },
    sort,
    page,
  });

  const categoryName = category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const genderName = gender.charAt(0).toUpperCase() + gender.slice(1);

  return (
    <main className="mx-auto max-w-[1440px] px-4 py-8 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 font-sans text-[length:var(--text-micro)] text-ink-muted">
          <li><a href="/" className="transition-colors hover:text-ink">Home</a></li>
          <li aria-hidden>/</li>
          <li><a href={`/${gender}`} className="transition-colors hover:text-ink">{genderName}</a></li>
          <li aria-hidden>/</li>
          <li className="text-ink">{categoryName}</li>
        </ol>
      </nav>

      {/* Page header */}
      <header className="mb-8 border-b border-hairline pb-6">
        <Text variant="display" as="h1" weight="bold" tracking="hero">
          {categoryName}
        </Text>
        <Text variant="lead" color="ink-muted" className="mt-2">
          {data.total.toLocaleString("en-IN")} styles found
        </Text>
      </header>

      {/* PLP client island */}
      <Suspense>
        <PlpClient
          gender={gender}
          category={category}
          initialData={data}
        />
      </Suspense>
    </main>
  );
}
