import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  jsonb,
  timestamp,
  index,
} from "drizzle-orm/pg-core";
import { fitFeedbackEnum, reviewStatusEnum } from "./enums";
import { users } from "./users";
import { products } from "./catalog";
import { orderItems } from "./orders";

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
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [
    index("reviews_product_id_idx").on(t.productId),
    index("reviews_user_id_idx").on(t.userId),
    index("reviews_status_idx").on(t.status),
  ]
);
