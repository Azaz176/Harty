import type { SearchClient } from "./client";
import { PRODUCTS_COLLECTION, type SearchProduct } from "./schema";

const SORT_MAP: Record<string, string> = {
  relevance: "_text_match:desc,popularity:desc",
  price_asc: "price:asc",
  price_desc: "price:desc",
  newest: "publishedAt:desc",
  discount: "discount:desc",
  popularity: "popularity:desc",
  rating: "rating:desc",
};

function buildFilterString(filters: Record<string, string[]>): string {
  const parts: string[] = [];

  for (const [facet, values] of Object.entries(filters)) {
    if (values.length === 0) continue;

    if (facet === "price") {
      // price filters come as ranges like "0-999", "1000-2999"
      const ranges = values.map((v) => {
        const [min, max] = v.split("-").map(Number);
        return `price:>=${min} && price:<=${max}`;
      });
      parts.push(`(${ranges.join(" || ")})`);
    } else if (facet === "discount") {
      const ranges = values.map((v) => {
        const min = Number(v);
        return `discount:>=${min}`;
      });
      parts.push(`(${ranges.join(" || ")})`);
    } else if (facet === "rating") {
      const min = Math.min(...values.map(Number));
      parts.push(`rating:>=${min}`);
    } else if (facet === "inStock") {
      parts.push(`inStock:${values[0]}`);
    } else {
      const escaped = values.map((v) => `\`${v}\``);
      parts.push(`${facet}:[${escaped.join(",")}]`);
    }
  }

  return parts.join(" && ");
}

export interface SearchHit {
  document: SearchProduct;
  highlights: Array<{
    field: string;
    snippet: string;
    matchedTokens: string[];
  }>;
}

export interface FacetCount {
  field: string;
  counts: Array<{
    value: string;
    count: number;
  }>;
}

export interface SearchResult {
  hits: SearchHit[];
  found: number;
  facets: FacetCount[];
  page: number;
  totalPages: number;
}

export async function searchProducts(
  client: SearchClient,
  params: {
    query: string;
    filters?: Record<string, string[]>;
    sort?: string;
    page?: number;
    perPage?: number;
    facetBy?: string[];
  },
): Promise<SearchResult> {
  const {
    query,
    filters = {},
    sort = "relevance",
    page = 1,
    perPage = 40,
    facetBy = [
      "brand",
      "category",
      "gender",
      "sizes",
      "colors",
      "price",
      "discount",
      "rating",
      "occasion",
      "fabric",
      "inStock",
    ],
  } = params;

  const filterBy = buildFilterString(filters);
  const sortBy = SORT_MAP[sort] ?? SORT_MAP.relevance;

  const result = await client
    .collections(PRODUCTS_COLLECTION)
    .documents()
    .search({
      q: query || "*",
      query_by: "title,brand,category,description",
      query_by_weights: "4,3,2,1",
      filter_by: filterBy || undefined,
      sort_by: sortBy,
      facet_by: facetBy.join(","),
      max_facet_values: 50,
      page,
      per_page: perPage,
      highlight_full_fields: "title,brand",
      typo_tokens_threshold: 3,
      drop_tokens_threshold: 2,
      num_typos: 2,
    });

  const hits: SearchHit[] = (result.hits ?? []).map((hit) => ({
    document: hit.document as SearchProduct,
    highlights: (hit.highlights ?? []).map((h) => ({
      field: h.field,
      snippet: h.snippet ?? "",
      matchedTokens: (h.matched_tokens ?? []) as string[],
    })),
  }));

  const facets: FacetCount[] = (result.facet_counts ?? []).map((fc) => ({
    field: fc.field_name,
    counts: (fc.counts ?? []).map((c) => ({
      value: String(c.value),
      count: c.count,
    })),
  }));

  return {
    hits,
    found: result.found,
    facets,
    page,
    totalPages: Math.ceil(result.found / perPage),
  };
}

export interface SuggestionResult {
  products: Array<{
    id: string;
    title: string;
    slug: string;
    imageUrl: string;
    brand: string;
    price: number;
  }>;
  brands: string[];
  categories: string[];
  queries: string[];
}

export async function suggestProducts(
  client: SearchClient,
  params: {
    query: string;
    limit?: number;
  },
): Promise<SuggestionResult> {
  const { query, limit = 8 } = params;

  if (!query.trim()) {
    return { products: [], brands: [], categories: [], queries: [] };
  }

  const result = await client.collections(PRODUCTS_COLLECTION).documents().search({
    q: query,
    query_by: "title,brand,category",
    query_by_weights: "3,2,1",
    per_page: limit,
    facet_by: "brand,category",
    max_facet_values: 5,
    typo_tokens_threshold: 1,
    num_typos: 1,
    prefix: true,
    highlight_full_fields: "title",
  });

  const products = (result.hits ?? []).map((hit) => {
    const doc = hit.document as SearchProduct;
    return {
      id: doc.id,
      title: doc.title,
      slug: doc.slug,
      imageUrl: doc.imageUrl,
      brand: doc.brand,
      price: doc.price,
    };
  });

  const brands = (result.facet_counts?.find((fc) => fc.field_name === "brand")?.counts ?? []).map(
    (c) => String(c.value),
  );

  const categories = (
    result.facet_counts?.find((fc) => fc.field_name === "category")?.counts ?? []
  ).map((c) => String(c.value));

  return {
    products,
    brands,
    categories,
    queries: [],
  };
}
