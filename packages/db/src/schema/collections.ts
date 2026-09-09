import {
  pgTable,
  uuid,
  varchar,
  text,
  jsonb,
  integer,
  primaryKey,
} from "drizzle-orm/pg-core";
import { collectionKindEnum } from "./enums";
import { products } from "./catalog";

export const collections = pgTable("collections", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: varchar("slug", { length: 255 }).unique().notNull(),
  title: varchar("title", { length: 500 }).notNull(),
  kind: collectionKindEnum("kind").default("manual").notNull(),
  rules: jsonb("rules"),
  heroMedia: text("hero_media"),
});

export const collectionItems = pgTable(
  "collection_items",
  {
    collectionId: uuid("collection_id")
      .references(() => collections.id, { onDelete: "cascade" })
      .notNull(),
    productId: uuid("product_id")
      .references(() => products.id, { onDelete: "cascade" })
      .notNull(),
    position: integer("position").default(0).notNull(),
  },
  (t) => [
    primaryKey({ columns: [t.collectionId, t.productId] }),
  ]
);
