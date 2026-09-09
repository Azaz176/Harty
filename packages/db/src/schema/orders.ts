import {
  pgTable,
  uuid,
  varchar,
  integer,
  jsonb,
  text,
  timestamp,
  index,
} from "drizzle-orm/pg-core";
import {
  orderStatusEnum,
  paymentStatusEnum,
  orderItemStatusEnum,
  shipmentStatusEnum,
  returnKindEnum,
  returnStatusEnum,
} from "./enums";
import { users } from "./users";
import { variants } from "./catalog";

export const orders = pgTable(
  "orders",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    humanId: varchar("human_id", { length: 20 }).unique().notNull(),
    userId: uuid("user_id")
      .references(() => users.id)
      .notNull(),
    status: orderStatusEnum("status").default("pending").notNull(),
    subtotal: integer("subtotal").notNull(),
    discount: integer("discount").default(0).notNull(),
    shipping: integer("shipping").default(0).notNull(),
    tax: integer("tax").default(0).notNull(),
    total: integer("total").notNull(),
    currency: varchar("currency", { length: 3 }).default("INR").notNull(),
    addressSnapshot: jsonb("address_snapshot").notNull(),
    paymentStatus: paymentStatusEnum("payment_status")
      .default("pending")
      .notNull(),
    placedAt: timestamp("placed_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [
    index("orders_user_id_idx").on(t.userId),
    index("orders_status_idx").on(t.status),
    index("orders_placed_at_idx").on(t.placedAt),
  ]
);

export const orderItems = pgTable(
  "order_items",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    orderId: uuid("order_id")
      .references(() => orders.id, { onDelete: "cascade" })
      .notNull(),
    variantId: uuid("variant_id")
      .references(() => variants.id)
      .notNull(),
    productSnapshot: jsonb("product_snapshot").notNull(),
    qty: integer("qty").notNull(),
    unitPrice: integer("unit_price").notNull(),
    discount: integer("discount").default(0).notNull(),
    tax: integer("tax").default(0).notNull(),
    status: orderItemStatusEnum("status").default("pending").notNull(),
    returnWindowEndsAt: timestamp("return_window_ends_at", {
      withTimezone: true,
    }),
  },
  (t) => [index("order_items_order_id_idx").on(t.orderId)]
);

export const payments = pgTable(
  "payments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    orderId: uuid("order_id")
      .references(() => orders.id)
      .notNull(),
    provider: varchar("provider", { length: 50 }).notNull(),
    providerRefId: varchar("provider_ref_id", { length: 255 }),
    amount: integer("amount").notNull(),
    status: paymentStatusEnum("status").default("pending").notNull(),
    method: varchar("method", { length: 50 }),
    rawPayload: jsonb("raw_payload"),
  },
  (t) => [
    index("payments_order_id_idx").on(t.orderId),
    index("payments_provider_ref_idx").on(t.providerRefId),
  ]
);

export const shipments = pgTable(
  "shipments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    orderId: uuid("order_id")
      .references(() => orders.id)
      .notNull(),
    awb: varchar("awb", { length: 100 }),
    carrier: varchar("carrier", { length: 100 }),
    status: shipmentStatusEnum("status").default("created").notNull(),
    events: jsonb("events").$type<
      Array<{ status: string; location: string; at: string }>
    >(),
    eta: timestamp("eta", { withTimezone: true }),
  },
  (t) => [index("shipments_order_id_idx").on(t.orderId)]
);

export const returns = pgTable(
  "returns",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    orderItemId: uuid("order_item_id")
      .references(() => orderItems.id)
      .notNull(),
    kind: returnKindEnum("kind").notNull(),
    reason: varchar("reason", { length: 500 }).notNull(),
    comment: text("comment"),
    media: jsonb("media").$type<Array<{ url: string; type: string }>>(),
    status: returnStatusEnum("status").default("requested").notNull(),
    refundId: varchar("refund_id", { length: 255 }),
    exchangeVariantId: uuid("exchange_variant_id").references(
      () => variants.id
    ),
  },
  (t) => [index("returns_order_item_id_idx").on(t.orderItemId)]
);
