import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import {
  products,
  brands,
  categories,
  getBrand,
  getCategory,
  type MockProduct,
} from "../data/mock-products";

const PAGE_SIZE = 40;

const filtersSchema = z
  .object({
    brands: z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),
    sizes: z.array(z.string()).optional(),
    colors: z.array(z.string()).optional(),
    priceRange: z.tuple([z.number(), z.number()]).optional(),
    gender: z.string().optional(),
  })
  .optional();

const sortSchema = z
  .enum([
    "relevance",
    "newest",
    "price_asc",
    "price_desc",
    "discount",
    "popularity",
  ])
  .default("relevance");

function applyFilters(
  items: MockProduct[],
  filters?: z.infer<typeof filtersSchema>,
): MockProduct[] {
  if (!filters) return items;
  let filtered = items;

  if (filters.gender) {
    filtered = filtered.filter((p) => p.gender === filters.gender);
  }
  if (filters.brands?.length) {
    const brandIds = brands
      .filter((b) => filters.brands!.includes(b.slug))
      .map((b) => b.id);
    filtered = filtered.filter((p) => brandIds.includes(p.brandId));
  }
  if (filters.categories?.length) {
    const catIds = categories
      .filter((c) => filters.categories!.includes(c.slug))
      .map((c) => c.id);
    filtered = filtered.filter((p) => catIds.includes(p.categoryId));
  }
  if (filters.sizes?.length) {
    filtered = filtered.filter((p) =>
      p.variants.some(
        (v) => filters.sizes!.includes(v.size) && v.inStock,
      ),
    );
  }
  if (filters.colors?.length) {
    filtered = filtered.filter((p) =>
      p.variants.some((v) =>
        filters.colors!.includes(v.colorName.toLowerCase()),
      ),
    );
  }
  if (filters.priceRange) {
    const [min, max] = filters.priceRange;
    filtered = filtered.filter(
      (p) => p.basePrice >= min && p.basePrice <= max,
    );
  }
  return filtered;
}

function applySort(items: MockProduct[], sort: string): MockProduct[] {
  const sorted = [...items];
  switch (sort) {
    case "newest":
      return sorted.sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() -
          new Date(a.publishedAt).getTime(),
      );
    case "price_asc":
      return sorted.sort((a, b) => a.basePrice - b.basePrice);
    case "price_desc":
      return sorted.sort((a, b) => b.basePrice - a.basePrice);
    case "discount": {
      const discountOf = (p: MockProduct) => {
        const v = p.variants[0];
        return v ? ((v.mrp - v.price) / v.mrp) * 100 : 0;
      };
      return sorted.sort((a, b) => discountOf(b) - discountOf(a));
    }
    case "popularity":
      return sorted.sort((a, b) => b.ratingCount - a.ratingCount);
    default:
      return sorted;
  }
}

function computeFacets(
  filtered: MockProduct[],
  allItems: MockProduct[],
  currentFilters?: z.infer<typeof filtersSchema>,
) {
  const countBrands = new Map<string, number>();
  const countCategories = new Map<string, number>();
  const countSizes = new Map<string, number>();
  const countColors = new Map<string, number>();
  const countGenders = new Map<string, number>();

  // For conjunction-correct counts: exclude current facet's own filter
  const itemsForBrandFacet = applyFilters(allItems, {
    ...currentFilters,
    brands: undefined,
  });
  for (const p of itemsForBrandFacet) {
    const brand = getBrand(p.brandId);
    if (brand) countBrands.set(brand.slug, (countBrands.get(brand.slug) ?? 0) + 1);
  }

  const itemsForCatFacet = applyFilters(allItems, {
    ...currentFilters,
    categories: undefined,
  });
  for (const p of itemsForCatFacet) {
    const cat = getCategory(p.categoryId);
    if (cat) countCategories.set(cat.slug, (countCategories.get(cat.slug) ?? 0) + 1);
  }

  for (const p of filtered) {
    for (const v of p.variants) {
      if (v.inStock) {
        countSizes.set(v.size, (countSizes.get(v.size) ?? 0) + 1);
        const color = v.colorName.toLowerCase();
        countColors.set(color, (countColors.get(color) ?? 0) + 1);
      }
    }
    countGenders.set(p.gender, (countGenders.get(p.gender) ?? 0) + 1);
  }

  const priceBuckets = [
    { label: "Under ₹500", min: 0, max: 49999 },
    { label: "₹500 – ₹999", min: 50000, max: 99999 },
    { label: "₹1,000 – ₹1,999", min: 100000, max: 199999 },
    { label: "₹2,000 – ₹4,999", min: 200000, max: 499999 },
    { label: "₹5,000 – ₹9,999", min: 500000, max: 999999 },
    { label: "₹10,000 – ₹24,999", min: 1000000, max: 2499999 },
    { label: "₹25,000+", min: 2500000, max: Infinity },
  ].map((bucket) => ({
    ...bucket,
    count: filtered.filter(
      (p) => p.basePrice >= bucket.min && p.basePrice <= bucket.max,
    ).length,
  }));

  return {
    brands: brands.map((b) => ({
      slug: b.slug,
      name: b.name,
      count: countBrands.get(b.slug) ?? 0,
    })),
    categories: categories.map((c) => ({
      slug: c.slug,
      name: c.name,
      gender: c.gender,
      count: countCategories.get(c.slug) ?? 0,
    })),
    sizes: [
      "XS", "S", "M", "L", "XL", "XXL",
      "28", "30", "32", "34", "36", "38",
      "6", "7", "8", "9", "10", "11",
      "2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y", "12-13Y",
      "32B", "34B", "34C", "36B", "36C", "38B",
      "50ml", "100ml", "200ml",
      "One Size",
    ].map(
      (s) => ({ value: s, count: countSizes.get(s) ?? 0 }),
    ),
    colors: [
      "black", "white", "navy", "olive", "sand",
      "burgundy", "charcoal", "stone", "rust", "slate blue",
      "maroon", "royal blue", "gold", "emerald", "magenta",
      "cream", "teal", "ivory",
      "natural", "rose", "berry", "coral", "nude",
    ].map((c) => ({
      value: c,
      hex:
        ({
          black: "#1A1A1A", white: "#F5F5F0", navy: "#1B2A4A", olive: "#5C6B4F",
          sand: "#C8B898", burgundy: "#6B2D3E", charcoal: "#3D3D3D", stone: "#A89F91",
          rust: "#A0522D", "slate blue": "#6A7B8B",
          maroon: "#800000", "royal blue": "#002366", gold: "#D4AF37", emerald: "#046307",
          magenta: "#B5338A", cream: "#FFFDD0", teal: "#008080", ivory: "#FFFFF0",
          natural: "#E8C39E", rose: "#C9717B", berry: "#8E354A", coral: "#E8836B", nude: "#D5A68E",
        } as Record<string, string>)[c] ?? "#888",
      count: countColors.get(c) ?? 0,
    })),
    genders: [
      { value: "men", count: countGenders.get("men") ?? 0 },
      { value: "women", count: countGenders.get("women") ?? 0 },
      { value: "kids", count: countGenders.get("kids") ?? 0 },
      { value: "girls", count: countGenders.get("girls") ?? 0 },
      { value: "boys", count: countGenders.get("boys") ?? 0 },
      { value: "beautify", count: countGenders.get("beautify") ?? 0 },
      { value: "accessories", count: countGenders.get("accessories") ?? 0 },
    ],
    priceBuckets,
  };
}

function toListItem(p: MockProduct) {
  const brand = getBrand(p.brandId);
  const category = getCategory(p.categoryId);
  const primaryVariant = p.variants[0]!;
  const uniqueColors = [
    ...new Map(
      p.variants.map((v) => [v.colorHex, { name: v.colorName, hex: v.colorHex }]),
    ).values(),
  ];
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    brand: brand ? { slug: brand.slug, name: brand.name } : null,
    category: category ? { slug: category.slug, name: category.name } : null,
    gender: p.gender,
    price: primaryVariant.price,
    mrp: primaryVariant.mrp,
    discount:
      primaryVariant.mrp > primaryVariant.price
        ? Math.round(
            ((primaryVariant.mrp - primaryVariant.price) / primaryVariant.mrp) *
              100,
          )
        : 0,
    ratingAvg: p.ratingAvg,
    ratingCount: p.ratingCount,
    image: p.media[0] ?? null,
    colors: uniqueColors,
    inStock: p.variants.some((v) => v.inStock),
  };
}

export const catalogRouter = router({
  list: publicProcedure
    .input(
      z.object({
        filters: filtersSchema,
        sort: sortSchema,
        page: z.number().int().min(1).default(1),
      }),
    )
    .query(({ input }) => {
      const activeProducts = products.filter((p) => p.status === "active");
      const filtered = applyFilters(activeProducts, input.filters);
      const sorted = applySort(filtered, input.sort);

      const start = (input.page - 1) * PAGE_SIZE;
      const paged = sorted.slice(start, start + PAGE_SIZE);
      const facets = computeFacets(filtered, activeProducts, input.filters);

      return {
        items: paged.map(toListItem),
        facets,
        total: filtered.length,
        page: input.page,
        pageSize: PAGE_SIZE,
        totalPages: Math.ceil(filtered.length / PAGE_SIZE),
        appliedFilters: input.filters ?? {},
      };
    }),

  facets: publicProcedure
    .input(z.object({ gender: z.string().optional() }).optional())
    .query(({ input }) => {
      const activeProducts = products.filter((p) => p.status === "active");
      const filtered = input?.gender
        ? activeProducts.filter((p) => p.gender === input.gender)
        : activeProducts;
      return computeFacets(filtered, activeProducts, input ? { gender: input.gender } : undefined);
    }),

  product: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ input }) => {
      const product = products.find((p) => p.slug === input.slug);
      if (!product) return null;

      const brand = getBrand(product.brandId);
      const category = getCategory(product.categoryId);

      const inventoryMap: Record<string, boolean> = {};
      for (const v of product.variants) {
        inventoryMap[v.id] = v.inStock;
      }

      const fitStats = {
        trueToSize: 78,
        totalResponses: Math.max(product.ratingCount, 100),
        runSmall: 12,
        runLarge: 10,
      };

      return {
        ...product,
        brand: brand ?? null,
        category: category ?? null,
        inventoryMap,
        fitStats,
        seoDescription: `Shop ${brand?.name ?? ""} ${product.title}. ${product.description}`,
      };
    }),

  related: publicProcedure
    .input(
      z.object({
        productId: z.string(),
        kind: z.enum(["similar", "complete-the-look", "also-viewed"]),
      }),
    )
    .query(({ input }) => {
      const source = products.find((p) => p.id === input.productId);
      if (!source) return [];

      let pool: MockProduct[];
      switch (input.kind) {
        case "similar":
          pool = products.filter(
            (p) =>
              p.id !== source.id && p.categoryId === source.categoryId,
          );
          break;
        case "complete-the-look":
          pool = products.filter(
            (p) =>
              p.id !== source.id &&
              p.gender === source.gender &&
              p.categoryId !== source.categoryId,
          );
          break;
        case "also-viewed":
        default:
          pool = products.filter(
            (p) => p.id !== source.id && p.gender === source.gender,
          );
          break;
      }

      return pool.slice(0, 12).map(toListItem);
    }),
});
