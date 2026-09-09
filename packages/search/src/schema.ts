import type { CollectionCreateSchema } from "typesense/lib/Typesense/Collections";

export const PRODUCTS_COLLECTION = "products" as const;
export const PRODUCTS_ALIAS = "products_alias" as const;

export const productsSchema: CollectionCreateSchema = {
  name: PRODUCTS_COLLECTION,
  fields: [
    { name: "id", type: "string" },
    { name: "slug", type: "string" },
    { name: "title", type: "string", sort: true },
    { name: "description", type: "string", optional: true },
    { name: "brand", type: "string", facet: true },
    { name: "brandSlug", type: "string" },
    { name: "category", type: "string", facet: true },
    { name: "categorySlug", type: "string" },
    { name: "gender", type: "string", facet: true },
    { name: "price", type: "int32", facet: true },
    { name: "mrp", type: "int32" },
    { name: "discount", type: "int32", facet: true },
    { name: "sizes", type: "string[]", facet: true },
    { name: "colors", type: "string[]", facet: true },
    { name: "colorHexes", type: "string[]" },
    { name: "occasion", type: "string[]", facet: true, optional: true },
    { name: "fabric", type: "string[]", facet: true, optional: true },
    { name: "rating", type: "float", facet: true },
    { name: "ratingCount", type: "int32" },
    { name: "inStock", type: "bool", facet: true },
    { name: "imageUrl", type: "string" },
    { name: "blurhash", type: "string", optional: true },
    { name: "publishedAt", type: "int64" },
    { name: "popularity", type: "int32" },
  ],
  default_sorting_field: "popularity",
  token_separators: ["-", "/"],
  symbols_to_index: ["&"],
};

export interface SearchProduct {
  id: string;
  slug: string;
  title: string;
  description?: string;
  brand: string;
  brandSlug: string;
  category: string;
  categorySlug: string;
  gender: string;
  price: number;
  mrp: number;
  discount: number;
  sizes: string[];
  colors: string[];
  colorHexes: string[];
  occasion?: string[];
  fabric?: string[];
  rating: number;
  ratingCount: number;
  inStock: boolean;
  imageUrl: string;
  blurhash?: string;
  publishedAt: number;
  popularity: number;
}
