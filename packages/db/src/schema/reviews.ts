import {
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { products } from "./catalog";
import { fitFeedbackEnum, reviewStatusEnum } from "./enums";
import { orderItems } from "./orders";
import { users } from "./users";

export const reviews = pgTable(
  "reviews",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    productId: uuid("product_id")
      .references(() => products.id)
      .notNull(),
    userId: uuid("user_id")
      .references(() => users.id)
      .notNull(),
    orderItemId: uuid("order_item_id").references(() => orderItems.id),
    rating: integer("rating").notNull(),
    title: varchar("title", { length: 500 }),
    body: text("body"),
    media: jsonb("media").$type<Array<{ url: string; type: string }>>(),
    fitFeedback: fitFeedbackEnum("fit_feedback"),
    helpfulCount: integer("helpful_count").default(0).notNull(),
    status: reviewStatusEnum("status").default("pending").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [
    index("reviews_product_id_idx").on(t.productId),
    index("reviews_user_id_idx").on(t.userId),
    index("reviews_status_idx").on(t.status),
  ],
);
