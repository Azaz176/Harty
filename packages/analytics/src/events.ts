type AnalyticsEvent =
  | { name: "page_viewed"; properties: { path: string; title: string } }
  | { name: "product_viewed"; properties: { product_id: string; slug: string; brand: string; category: string; price: number } }
  | { name: "product_list_viewed"; properties: { category: string; page: number; total: number; filters: Record<string, string[]> } }
  | { name: "search_performed"; properties: { query: string; results_count: number } }
  | { name: "product_added_to_cart"; properties: { product_id: string; variant_id: string; price: number; qty: number } }
  | { name: "product_removed_from_cart"; properties: { product_id: string; variant_id: string } }
  | { name: "cart_viewed"; properties: { item_count: number; total: number } }
  | { name: "wishlist_toggled"; properties: { product_id: string; action: "add" | "remove" } }
  | { name: "checkout_started"; properties: { item_count: number; total: number } }
  | { name: "payment_initiated"; properties: { order_id: string; total: number; method: string } }
  | { name: "order_placed"; properties: { order_id: string; total: number; item_count: number } }
  | { name: "coupon_applied"; properties: { code: string; discount: number } }
  | { name: "size_selected"; properties: { product_id: string; size: string; in_stock: boolean } }
  | { name: "filter_applied"; properties: { facet: string; value: string; result_count: number } }
  | { name: "sort_changed"; properties: { sort_by: string } }
  | { name: "review_submitted"; properties: { product_id: string; rating: number } };

export type { AnalyticsEvent };

export function track<E extends AnalyticsEvent>(event: E): void {
  if (typeof window === "undefined") return;
  console.debug("[analytics]", event.name, event.properties);
}
