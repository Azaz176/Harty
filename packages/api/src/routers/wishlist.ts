import { TRPCError } from "@trpc/server";
import { z } from "zod";
import type { MockProduct } from "../data/mock-products";
import { getBrand, getCategory, products } from "../data/mock-products";
import { publicProcedure, router } from "../trpc";

const wishlists = new Map<string, Set<string>>();

function getWishlist(userId: string): Set<string> {
  let set = wishlists.get(userId);
  if (!set) {
    set = new Set();
    wishlists.set(userId, set);
  }
  return set;
}

function enrichProduct(p: MockProduct) {
  const brand = getBrand(p.brandId);
  const category = getCategory(p.categoryId);
  const minPriceVariant = p.variants.reduce((min, v) => (v.price < min.price ? v : min));
  const hasDiscount = minPriceVariant.mrp > minPriceVariant.price;

  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    brand: brand?.name ?? "Unknown",
    brandSlug: brand?.slug ?? "",
    category: category?.name ?? "",
    gender: p.gender,
    price: minPriceVariant.price,
    mrp: minPriceVariant.mrp,
    discount: hasDiscount
      ? Math.round(((minPriceVariant.mrp - minPriceVariant.price) / minPriceVariant.mrp) * 100)
      : 0,
    imageUrl: p.media[0]?.url ?? "",
    ratingAvg: p.ratingAvg,
    ratingCount: p.ratingCount,
    colors: [...new Map(p.variants.map((v) => [v.colorName, v.colorHex])).entries()].map(
      ([name, hex]) => ({ name, hex }),
    ),
    sizes: [...new Set(p.variants.map((v) => v.size))],
    hasStock: p.variants.some((v) => v.inStock),
  };
}

export const wishlistRouter = router({
  list: publicProcedure.input(z.object({ userId: z.string().min(1) })).query(({ input }) => {
    const set = getWishlist(input.userId);
    const items = products.filter((p) => set.has(p.id)).map(enrichProduct);
    return { items, total: items.length };
  }),

  toggle: publicProcedure
    .input(z.object({ userId: z.string().min(1), productId: z.string().min(1) }))
    .mutation(({ input }) => {
      const product = products.find((p) => p.id === input.productId);
      if (!product) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Product not found" });
      }

      const set = getWishlist(input.userId);
      const wasWishlisted = set.has(input.productId);

      if (wasWishlisted) {
        set.delete(input.productId);
      } else {
        set.add(input.productId);
      }

      return { wishlisted: !wasWishlisted, productId: input.productId };
    }),

  check: publicProcedure
    .input(z.object({ userId: z.string().min(1), productIds: z.array(z.string()) }))
    .query(({ input }) => {
      const set = getWishlist(input.userId);
      const result: Record<string, boolean> = {};
      for (const id of input.productIds) {
        result[id] = set.has(id);
      }
      return result;
    }),

  moveToBag: publicProcedure
    .input(
      z.object({
        userId: z.string().min(1),
        productId: z.string().min(1),
        variantId: z.string().min(1),
        cartId: z.string().min(1),
      }),
    )
    .mutation(({ input }) => {
      const set = getWishlist(input.userId);
      set.delete(input.productId);

      return { removed: input.productId, cartId: input.cartId, variantId: input.variantId };
    }),
});
