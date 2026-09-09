import {
  pgTable,
  uuid,
  varchar,
  integer,
  boolean,
  jsonb,
  timestamp,
  index,
} from "drizzle-orm/pg-core";
import { couponKindEnum } from "./enums";

export const coupons = pgTable(
  "coupons",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    code: varchar("code", { length: 50 }).unique().notNull(),
    kind: couponKindEnum("kind").notNull(),
    value: integer("value").notNull(),
    minSubtotal: integer("min_subtotal"),
    maxDiscount: integer("max_discount"),
    appliesTo: jsonb("applies_to").$type<{
      brands?: string[];
      categories?: string[];
      products?: string[];
    }>(),
    perUserLimit: integer("per_user_limit").default(1).notNull(),
    totalLimit: integer("total_limit"),
    usedCount: integer("used_count").default(0).notNull(),
    startsAt: timestamp("starts_at", { withTimezone: true }).notNull(),
    endsAt: timestamp("ends_at", { withTimezone: true }).notNull(),
    stackable: boolean("stackable").default(false).notNull(),
  },
  (t) => [index("coupons_code_idx").on(t.code)]
);
