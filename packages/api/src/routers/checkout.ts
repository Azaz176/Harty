import { TRPCError } from "@trpc/server";
import { z } from "zod";
import type { MockProduct, MockVariant } from "../data/mock-products";
import { getBrand, products } from "../data/mock-products";
import { publicProcedure, router } from "../trpc";

type Reservation = {
  id: string;
  cartId: string;
  items: Array<{
    variantId: string;
    productId: string;
    qty: number;
    price: number;
    mrp: number;
    title: string;
    brand: string;
    size: string;
    colorName: string;
    imageUrl: string;
  }>;
  address: Address | null;
  paymentMethod: string | null;
  paymentId: string | null;
  quote: Quote;
  createdAt: string;
};

type Address = {
  name: string;
  phone: string;
  line1: string;
  line2: string | null;
  city: string;
  state: string;
  pincode: string;
  country: string;
};

type Quote = {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
};

type Order = {
  id: string;
  humanId: string;
  reservationId: string;
  status: "confirmed";
  items: Reservation["items"];
  address: Address;
  paymentMethod: string;
  quote: Quote;
  placedAt: string;
};

const reservations = new Map<string, Reservation>();
const orders = new Map<string, Order>();
let reservationCounter = 1;
let orderCounter = 10000;
let paymentCounter = 1;

const carts = new Map<
  string,
  {
    items: Array<{ variantId: string; productId: string; qty: number; priceSnapshot: number }>;
    appliedCouponCode: string | null;
  }
>();

function _findVariant(variantId: string): { product: MockProduct; variant: MockVariant } | null {
  for (const p of products) {
    const v = p.variants.find((v) => v.id === variantId);
    if (v) return { product: p, variant: v };
  }
  return null;
}

const FREE_SHIPPING_THRESHOLD = 99900;
const SHIPPING_COST = 4900;
const GST_RATE = 18;

function computeQuote(subtotal: number, discount: number): Quote {
  const afterDiscount = subtotal - discount;
  const shipping = afterDiscount >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const tax = Math.round((afterDiscount * GST_RATE) / 100);
  const total = afterDiscount + shipping + tax;
  return { subtotal, discount, shipping, tax, total };
}

const addressSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number"),
  line1: z.string().min(5, "Address is required"),
  line2: z.string().nullable().optional().default(null),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
  country: z.string().default("IN"),
});

export const checkoutRouter = router({
  init: publicProcedure.input(z.object({ cartId: z.string().min(1) })).mutation(({ input }) => {
    const cartModule = require("./cart");
    let cartData: {
      items: Array<{ variantId: string; productId: string; qty: number; priceSnapshot: number }>;
      appliedCouponCode: string | null;
    };

    try {
      const _cartGetter = cartModule.cartRouter?.createCaller?.({});
      cartData = { items: [], appliedCouponCode: null };
    } catch {
      cartData = { items: [], appliedCouponCode: null };
    }

    const _cart = carts.get(input.cartId) ?? cartData;

    const items = products
      .flatMap((p) =>
        p.variants
          .filter((v) => v.inStock)
          .slice(0, 2)
          .map((v) => {
            const brand = getBrand(p.brandId);
            return {
              variantId: v.id,
              productId: p.id,
              qty: 1,
              price: v.price,
              mrp: v.mrp,
              title: p.title,
              brand: brand?.name ?? "Unknown",
              size: v.size,
              colorName: v.colorName,
              imageUrl: p.media[0]?.url ?? "",
            };
          }),
      )
      .slice(0, 3);

    const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
    const quote = computeQuote(subtotal, 0);

    const reservation: Reservation = {
      id: `res-${reservationCounter++}`,
      cartId: input.cartId,
      items,
      address: null,
      paymentMethod: null,
      paymentId: null,
      quote,
      createdAt: new Date().toISOString(),
    };

    reservations.set(reservation.id, reservation);

    return {
      reservationId: reservation.id,
      items: reservation.items,
      quote: reservation.quote,
    };
  }),

  setAddress: publicProcedure
    .input(
      z.object({
        reservationId: z.string().min(1),
        address: addressSchema,
      }),
    )
    .mutation(({ input }) => {
      const reservation = reservations.get(input.reservationId);
      if (!reservation) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Reservation not found" });
      }

      const address: Address = {
        name: input.address.name,
        phone: input.address.phone,
        line1: input.address.line1,
        line2: input.address.line2 ?? null,
        city: input.address.city,
        state: input.address.state,
        pincode: input.address.pincode,
        country: input.address.country ?? "IN",
      };

      reservation.address = address;

      return { ok: true as const, address };
    }),

  createPayment: publicProcedure
    .input(
      z.object({
        reservationId: z.string().min(1),
        method: z.enum(["card", "upi", "cod"]),
      }),
    )
    .mutation(({ input }) => {
      const reservation = reservations.get(input.reservationId);
      if (!reservation) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Reservation not found" });
      }
      if (!reservation.address) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Address is required before payment" });
      }

      const paymentId = `pay-${paymentCounter++}`;
      reservation.paymentMethod = input.method;
      reservation.paymentId = paymentId;

      return { paymentId, status: "pending" as const };
    }),

  confirm: publicProcedure
    .input(
      z.object({
        reservationId: z.string().min(1),
        paymentId: z.string().min(1),
      }),
    )
    .mutation(({ input }) => {
      const reservation = reservations.get(input.reservationId);
      if (!reservation) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Reservation not found" });
      }
      if (!reservation.address) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Address is required" });
      }
      if (reservation.paymentId !== input.paymentId) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Payment ID mismatch" });
      }

      const orderId = `ord-${++orderCounter}`;
      const humanId = `LOOM-${orderCounter}`;

      const order: Order = {
        id: orderId,
        humanId,
        reservationId: reservation.id,
        status: "confirmed",
        items: reservation.items,
        address: reservation.address,
        paymentMethod: reservation.paymentMethod!,
        quote: reservation.quote,
        placedAt: new Date().toISOString(),
      };

      orders.set(orderId, order);
      reservations.delete(input.reservationId);

      return {
        orderId: order.id,
        humanId: order.humanId,
        status: order.status,
        total: order.quote.total,
      };
    }),

  getOrder: publicProcedure.input(z.object({ orderId: z.string().min(1) })).query(({ input }) => {
    const order = orders.get(input.orderId);
    if (!order) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Order not found" });
    }
    return order;
  }),
});
