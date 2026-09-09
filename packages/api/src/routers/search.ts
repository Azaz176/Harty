import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { products, brands, categories, getBrand } from "../data/mock-products";

const PAGE_SIZE = 40;

function scoreMatch(text: string, query: string): number {
  const lower = text.toLowerCase();
  const q = query.toLowerCase();
  if (lower === q) return 100;
  if (lower.startsWith(q)) return 80;
  if (lower.includes(q)) return 60;

  const words = q.split(/\s+/);
  const matchedWords = words.filter((w) => lower.includes(w));
  if (matchedWords.length > 0) return (matchedWords.length / words.length) * 40;
  return 0;
}

function highlight(text: string, query: string): string {
  if (!query) return text;
  const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  return text.replace(re, "<mark>$1</mark>");
}

export const searchRouter = router({
  query: publicProcedure
    .input(
      z.object({
        q: z.string().min(1),
        filters: z
          .object({
            brands: z.array(z.string()).optional(),
            categories: z.array(z.string()).optional(),
            gender: z.string().optional(),
          })
          .optional(),
        page: z.number().int().min(1).default(1),
      }),
    )
    .query(({ input }) => {
      const q = input.q.toLowerCase();
      let scored = products
        .filter((p) => p.status === "active")
        .map((p) => {
          const brand = getBrand(p.brandId);
          const titleScore = scoreMatch(p.title, q);
          const brandScore = brand ? scoreMatch(brand.name, q) : 0;
          const descScore = scoreMatch(p.description, q) * 0.5;
          const attrScore = Object.values(p.attributes).reduce(
            (sum, v) => sum + scoreMatch(v, q) * 0.3,
            0,
          );
          const total = titleScore + brandScore + descScore + attrScore;
          return { product: p, score: total, brand };
        })
        .filter((s) => s.score > 0)
        .sort((a, b) => b.score - a.score);

      if (input.filters?.gender) {
        scored = scored.filter((s) => s.product.gender === input.filters!.gender);
      }
      if (input.filters?.brands?.length) {
        const slugs = new Set(input.filters.brands);
        scored = scored.filter((s) => s.brand && slugs.has(s.brand.slug));
      }
      if (input.filters?.categories?.length) {
        const slugs = new Set(input.filters.categories);
        const catIds = categories
          .filter((c) => slugs.has(c.slug))
          .map((c) => c.id);
        scored = scored.filter((s) =>
          catIds.includes(s.product.categoryId),
        );
      }

      const total = scored.length;
      const start = (input.page - 1) * PAGE_SIZE;
      const paged = scored.slice(start, start + PAGE_SIZE);

      return {
        items: paged.map((s) => {
          const p = s.product;
          const primaryVariant = p.variants[0]!;
          return {
            id: p.id,
            slug: p.slug,
            title: p.title,
            brand: s.brand
              ? { slug: s.brand.slug, name: s.brand.name }
              : null,
            price: primaryVariant.price,
            mrp: primaryVariant.mrp,
            image: p.media[0] ?? null,
            highlight: highlight(p.title, input.q),
          };
        }),
        total,
        page: input.page,
        query: input.q,
      };
    }),

  suggest: publicProcedure
    .input(z.object({ q: z.string().min(1) }))
    .query(({ input }) => {
      const q = input.q.toLowerCase();

      const matchedBrands = brands
        .filter((b) => b.name.toLowerCase().includes(q))
        .slice(0, 4)
        .map((b) => ({ slug: b.slug, name: b.name }));

      const matchedCategories = categories
        .filter((c) => c.name.toLowerCase().includes(q))
        .slice(0, 4)
        .map((c) => ({ slug: c.slug, name: c.name, gender: c.gender }));

      const matchedProducts = products
        .filter(
          (p) =>
            p.status === "active" &&
            (p.title.toLowerCase().includes(q) ||
              getBrand(p.brandId)?.name.toLowerCase().includes(q)),
        )
        .slice(0, 6)
        .map((p) => {
          const brand = getBrand(p.brandId);
          return {
            id: p.id,
            slug: p.slug,
            title: p.title,
            brand: brand?.name ?? "",
            price: p.variants[0]?.price ?? p.basePrice,
            image: p.media[0]?.url ?? null,
          };
        });

      const queries = [
        ...(q.length >= 2
          ? [`${input.q} for men`, `${input.q} for women`]
          : []),
      ].slice(0, 4);

      return { brands: matchedBrands, categories: matchedCategories, products: matchedProducts, queries };
    }),
});
