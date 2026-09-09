import { pgEnum } from "drizzle-orm/pg-core";

export const userTierEnum = pgEnum("user_tier", ["bronze", "silver", "gold", "platinum"]);

export const addressTypeEnum = pgEnum("address_type", ["home", "work"]);

export const genderEnum = pgEnum("gender", ["men", "women", "kids", "unisex"]);

export const productStatusEnum = pgEnum("product_status", ["draft", "active", "archived"]);

export const mediaKindEnum = pgEnum("media_kind", ["image", "video", "360"]);

export const collectionKindEnum = pgEnum("collection_kind", ["manual", "rule"]);

export const couponKindEnum = pgEnum("coupon_kind", ["pct", "flat", "bxgy", "shipping"]);

export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
]);

export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
  "authorized",
  "captured",
  "failed",
  "refunded",
]);

export const orderItemStatusEnum = pgEnum("order_item_status", [
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
  "return_requested",
  "returned",
]);

export const shipmentStatusEnum = pgEnum("shipment_status", [
  "created",
  "picked_up",
  "in_transit",
  "out_for_delivery",
  "delivered",
  "failed",
]);

export const returnKindEnum = pgEnum("return_kind", ["return", "exchange"]);

export const returnStatusEnum = pgEnum("return_status", [
  "requested",
  "approved",
  "picked_up",
  "received",
  "refunded",
  "rejected",
]);

export const fitFeedbackEnum = pgEnum("fit_feedback", ["small", "true", "large"]);

export const reviewStatusEnum = pgEnum("review_status", ["pending", "approved", "rejected"]);
