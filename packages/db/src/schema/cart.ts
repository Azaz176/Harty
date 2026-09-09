import {
  pgTable,
  uuid,
  varchar,
  integer,
  timestamp,
  primaryKey,
  index,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { products, variants } from "./catalog";
import { coupons } from "./coupons";

export const carts = pgTable(
  "carts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").references(() => users.id),
    anonId: varchar("anon_id", { length: 64 }),
    currency: varchar("currency", { length: 3 }).default("INR").notNull(),
    appliedCouponId: uuid("applied_coupon_id").references(() => coupons.id),
    expiresAt: timestamp("expires_at", { withTimezone: true }),
  },
  (t) => [
    index("carts_user_id_idx").on(t.userId),
    index("carts_anon_id_idx").on(t.anonId),
  ]
);

export const cartItems = pgTable(
  "cart_items",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    cartId: uuid("cart_id")
      .references(() => carts.id, { onDelete: "cascade" })
      .notNull(),
    variantId: uuid("variant_id")
      .references(() => variants.id)
      .notNull(),
    qty: integer("qty").default(1).notNull(),
    priceSnapshot: integer("price_snapshot").notNull(),
    addedAt: timestamp("added_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [index("cart_items_cart_id_idx").on(t.cartId)]
);

export const wishlists = pgTable(
  "wishlists",
  {
    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    productId: uuid("product_id")
      .references(() => products.id, { onDelete: "cascade" })
      .notNull(),
    variantId: uuid("variant_id").references(() => variants.id, {
      onDelete: "set null",
    }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [
    primaryKey({ columns: [t.userId, t.productId] }),
  ]
);
