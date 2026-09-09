import { TRPCError } from "@trpc/server";
import { z } from "zod";
import type { MockProduct, MockVariant } from "../data/mock-products";
import { getBrand, products } from "../data/mock-products";
import { publicProcedure, router } from "../trpc";

type CartItem = {
  id: string;
  variantId: string;
  productId: string;
  qty: number;
  priceSnapshot: number;
  addedAt: string;
};

type Cart = {
  id: string;
  items: CartItem[];
  appliedCouponCode: string | null;
};

type CouponDef = {
  code: string;
  kind: "flat" | "pct";
  value: number;
  maxDiscount: number | null;
  minSubtotal: number;
};

const COUPONS: CouponDef[] = [
  { code: "FLAT500", kind: "flat", value: 50000, maxDiscount: null, minSubtotal: 99900 },
  { code: "SAVE20", kind: "pct", value: 20, maxDiscount: 100000, minSubtotal: 149900 },
];

const FREE_SHIPPING_THRESHOLD = 99900;
const SHIPPING_COST = 4900;

const carts = new Map<string, Cart>();

function getOrCreateCart(cartId: string): Cart {
  let cart = carts.get(cartId);
  if (!cart) {
    cart = { id: cartId, items: [], appliedCouponCode: null };
    carts.set(cartId, cart);
  }
  return cart;
}

function findVariant(variantId: string): { product: MockProduct; variant: MockVariant } | null {
  for (const p of products) {
    const v = p.variants.find((v) => v.id === variantId);
    if (v) return { product: p, variant: v };
  }
  return null;
}

function _findProductForVariant(variantId: string): MockProduct | null {
  return products.find((p) => p.variants.some((v) => v.id === variantId)) ?? null;
}

type EnrichedItem = CartItem & {
  title: string;
  brand: string;
  imageUrl: string;
  colorName: string;
  colorHex: string;
  size: string;
  price: number;
  mrp: number;
  slug: string;
};

function enrichItems(items: CartItem[]): EnrichedItem[] {
  return items.map((item) => {
    const match = findVariant(item.variantId);
    const brand = match ? getBrand(match.product.brandId) : null;
    return {
      ...item,
      title: match?.product.title ?? "Unknown Product",
      brand: brand?.name ?? "Unknown",
      imageUrl: match?.product.media[0]?.url ?? "",
      colorName: match?.variant.colorName ?? "",
      colorHex: match?.variant.colorHex ?? "",
      size: match?.variant.size ?? "",
      price: match?.variant.price ?? item.priceSnapshot,
      mrp: match?.variant.mrp ?? item.priceSnapshot,
      slug: match?.product.slug ?? "",
    };
  });
}

function computeDiscount(subtotal: number, couponCode: string | null): number {
  if (!couponCode) return 0;
  const coupon = COUPONS.find((c) => c.code === couponCode);
  if (!coupon) return 0;
  if (subtotal < coupon.minSubtotal) return 0;

  let discount: number;
  if (coupon.kind === "flat") {
    discount = coupon.value;
  } else {
    discount = Math.round((subtotal * coupon.value) / 100);
  }
  if (coupon.maxDiscount !== null && discount > coupon.maxDiscount) {
    discount = coupon.maxDiscount;
  }
  if (discount > subtotal) discount = subtotal;
  return discount;
}

function computeSummary(cart: Cart) {
  const subtotal = cart.items.reduce((sum, i) => sum + i.priceSnapshot * i.qty, 0);
  const discount = computeDiscount(subtotal, cart.appliedCouponCode);
  const afterDiscount = subtotal - discount;
  const shipping = afterDiscount >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = afterDiscount + shipping;
  const itemCount = cart.items.reduce((sum, i) => sum + i.qty, 0);
  return { itemCount, subtotal, discount, shipping, total };
}

let itemIdCounter = 1;

export const cartRouter = router({
  get: publicProcedure.input(z.object({ cartId: z.string().min(1) })).query(({ input }) => {
    const cart = getOrCreateCart(input.cartId);
    return {
      ...cart,
      items: enrichItems(cart.items),
      summary: computeSummary(cart),
    };
  }),

  addItem: publicProcedure
    .input(
      z.object({
        cartId: z.string().min(1),
        variantId: z.string().min(1),
        qty: z.number().int().min(1).default(1),
      }),
    )
    .mutation(({ input }) => {
      const match = findVariant(input.variantId);
      if (!match) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Variant not found" });
      }
      if (!match.variant.inStock) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Variant is out of stock" });
      }

      const cart = getOrCreateCart(input.cartId);
      const existing = cart.items.find((i) => i.variantId === input.variantId);

      if (existing) {
        existing.qty += input.qty;
      } else {
        cart.items.push({
          id: `ci-${itemIdCounter++}`,
          variantId: input.variantId,
          productId: match.product.id,
          qty: input.qty,
          priceSnapshot: match.variant.price,
          addedAt: new Date().toISOString(),
        });
      }

      return {
        ...cart,
        items: enrichItems(cart.items),
        summary: computeSummary(cart),
      };
    }),

  updateQty: publicProcedure
    .input(
      z.object({
        cartId: z.string().min(1),
        itemId: z.string().min(1),
        qty: z.number().int().min(0),
      }),
    )
    .mutation(({ input }) => {
      const cart = getOrCreateCart(input.cartId);

      if (input.qty === 0) {
        cart.items = cart.items.filter((i) => i.id !== input.itemId);
      } else {
        const item = cart.items.find((i) => i.id === input.itemId);
        if (!item) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Cart item not found" });
        }
        item.qty = input.qty;
      }

      return {
        ...cart,
        items: enrichItems(cart.items),
        summary: computeSummary(cart),
      };
    }),

  removeItem: publicProcedure
    .input(z.object({ cartId: z.string().min(1), itemId: z.string().min(1) }))
    .mutation(({ input }) => {
      const cart = getOrCreateCart(input.cartId);
      cart.items = cart.items.filter((i) => i.id !== input.itemId);

      return {
        ...cart,
        items: enrichItems(cart.items),
        summary: computeSummary(cart),
      };
    }),

  applyCoupon: publicProcedure
    .input(z.object({ cartId: z.string().min(1), code: z.string().min(1) }))
    .mutation(({ input }) => {
      const code = input.code.toUpperCase().trim();
      const coupon = COUPONS.find((c) => c.code === code);
      if (!coupon) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid coupon code" });
      }

      const cart = getOrCreateCart(input.cartId);
      const subtotal = cart.items.reduce((sum, i) => sum + i.priceSnapshot * i.qty, 0);

      if (subtotal < coupon.minSubtotal) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Minimum order of ₹${(coupon.minSubtotal / 100).toLocaleString("en-IN")} required`,
        });
      }

      cart.appliedCouponCode = code;

      return {
        ...cart,
        items: enrichItems(cart.items),
        summary: computeSummary(cart),
      };
    }),

  removeCoupon: publicProcedure
    .input(z.object({ cartId: z.string().min(1) }))
    .mutation(({ input }) => {
      const cart = getOrCreateCart(input.cartId);
      cart.appliedCouponCode = null;

      return {
        ...cart,
        items: enrichItems(cart.items),
        summary: computeSummary(cart),
      };
    }),

  summary: publicProcedure.input(z.object({ cartId: z.string().min(1) })).query(({ input }) => {
    const cart = getOrCreateCart(input.cartId);
    return computeSummary(cart);
  }),
});
