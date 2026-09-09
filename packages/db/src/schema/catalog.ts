import {
  boolean,
  index,
  integer,
  jsonb,
  numeric,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { genderEnum, mediaKindEnum, productStatusEnum } from "./enums";

export const brands = pgTable("brands", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: varchar("slug", { length: 255 }).unique().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  logoUrl: text("logo_url"),
  story: text("story"),
  isPremium: boolean("is_premium").default(false).notNull(),
});

export const categories = pgTable(
  "categories",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: varchar("slug", { length: 255 }).unique().notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    parentId: uuid("parent_id"),
    gender: genderEnum("gender"),
    path: text("path").notNull(),
    sortOrder: integer("sort_order").default(0).notNull(),
    image: text("image"),
  },
  (t) => [
    index("categories_parent_id_idx").on(t.parentId),
    index("categories_gender_idx").on(t.gender),
  ],
);

export const products = pgTable(
  "products",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: varchar("slug", { length: 500 }).unique().notNull(),
    brandId: uuid("brand_id")
      .references(() => brands.id)
      .notNull(),
    categoryId: uuid("category_id")
      .references(() => categories.id)
      .notNull(),
    title: varchar("title", { length: 500 }).notNull(),
    description: text("description"),
    gender: genderEnum("gender").notNull(),
    attributes: jsonb("attributes").$type<Record<string, string>>(),
    basePrice: integer("base_price").notNull(),
    status: productStatusEnum("status").default("draft").notNull(),
    ratingAvg: numeric("rating_avg", { precision: 3, scale: 2 }),
    ratingCount: integer("rating_count").default(0).notNull(),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    searchVersion: integer("search_version").default(0).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [
    index("products_brand_id_idx").on(t.brandId),
    index("products_category_id_idx").on(t.categoryId),
    index("products_status_idx").on(t.status),
    index("products_gender_idx").on(t.gender),
  ],
);

export const variants = pgTable(
  "variants",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    productId: uuid("product_id")
      .references(() => products.id, { onDelete: "cascade" })
      .notNull(),
    sku: varchar("sku", { length: 100 }).unique().notNull(),
    colorName: varchar("color_name", { length: 100 }).notNull(),
    colorHex: varchar("color_hex", { length: 7 }).notNull(),
    size: varchar("size", { length: 20 }).notNull(),
    sizeSystem: varchar("size_system", { length: 20 }),
    price: integer("price").notNull(),
    mrp: integer("mrp").notNull(),
    weightGrams: integer("weight_grams"),
    barcode: varchar("barcode", { length: 50 }),
    position: integer("position").default(0).notNull(),
  },
  (t) => [index("variants_product_id_idx").on(t.productId)],
);

export const inventory = pgTable(
  "inventory",
  {
    variantId: uuid("variant_id")
      .references(() => variants.id, { onDelete: "cascade" })
      .notNull(),
    warehouseId: varchar("warehouse_id", { length: 50 }).notNull(),
    onHand: integer("on_hand").default(0).notNull(),
    reserved: integer("reserved").default(0).notNull(),
    safetyStock: integer("safety_stock").default(0).notNull(),
  },
  (t) => [primaryKey({ columns: [t.variantId, t.warehouseId] })],
);

export const media = pgTable(
  "media",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    productId: uuid("product_id")
      .references(() => products.id, { onDelete: "cascade" })
      .notNull(),
    variantId: uuid("variant_id").references(() => variants.id, {
      onDelete: "set null",
    }),
    url: text("url").notNull(),
    blurhash: text("blurhash"),
    width: integer("width"),
    height: integer("height"),
    kind: mediaKindEnum("kind").default("image").notNull(),
    position: integer("position").default(0).notNull(),
    alt: text("alt"),
  },
  (t) => [
    index("media_product_id_idx").on(t.productId),
    index("media_variant_id_idx").on(t.variantId),
  ],
);
