# LOOM — API Contract

> tRPC v11 routers. Types flow end-to-end. No `any` on API boundaries.

---

## Catalog

```typescript
catalog.list      { filters, sort, page, cursor } -> { items, facets, total, appliedFilters }
catalog.facets    { scope } -> facet tree with counts
catalog.product   { slug } -> product + variants + media + inventoryMap + sizeChart
catalog.related   { productId, kind: similar | complete-the-look | also-viewed }
```

## Search

```typescript
search.query      { q, filters, page } -> typesense passthrough + highlights
search.suggest    { q } -> { brands, categories, products, queries }
```

## Cart

```typescript
cart.get           -> full cart with computed totals
cart.addItem       { variantId, qty } -> updated cart (idempotent)
cart.updateQty     { itemId, qty } -> updated cart
cart.removeItem    { itemId } -> updated cart
cart.applyCoupon   { code } -> updated cart with discount breakdown
cart.removeCoupon  -> updated cart
cart.merge         { anonId -> userId } -> merged cart
```

## Wishlist

```typescript
wishlist.list    -> { items[] }
wishlist.toggle  { productId, variantId? } -> { wishlisted: boolean }
wishlist.moveToBag { productId, variantId } -> updated cart
```

## Checkout

```typescript
checkout.init          -> reserves inventory, returns quote + reservationId
checkout.setAddress    { addressId } -> updated quote with shipping
checkout.quote         -> { subtotal, discounts[], shipping, tax, total, breakdown }
checkout.createPayment -> provider order/intent (Razorpay/Stripe)
checkout.confirm       -> idempotent order creation
```

## Orders

```typescript
order.list       { page, status? } -> paginated orders
order.get        { id } -> order + items + shipments + timeline
order.cancelItem { orderItemId, reason } -> updated order
```

## Returns

```typescript
returns.eligibility { orderItemId } -> { eligible, reason, deadline }
returns.create      { orderItemId, kind, reason, comment?, media? } -> return request
returns.list        { orderId? } -> return requests
```

## Reviews

```typescript
review.create      { productId, orderItemId, rating, title?, body?, media?, fitFeedback? }
review.list        { productId, sort, page } -> paginated reviews + stats
review.markHelpful { reviewId } -> { helpfulCount }
```

## Account

```typescript
account.profile.get    -> user profile
account.profile.update { name?, email?, phone?, avatar? }
account.addresses.list
account.addresses.create { label, name, phone, line1, line2?, city, state, pincode, country, type }
account.addresses.update { id, ...fields }
account.addresses.delete { id }
account.addresses.setDefault { id }
```

## Admin (RBAC-guarded)

```typescript
admin.products.*    CRUD + bulk status change + media management
admin.orders.*      List + detail + status updates + manual actions
admin.inventory.*   Stock adjustments, warehouse management
admin.coupons.*     CRUD + usage analytics
admin.media.*       Upload, organize, bulk operations
admin.curation.*    Collection management, homepage slot editing
```

---

## Pricing Engine

> The #1 source of ecommerce bugs is two price calculators.
> There is ONE pure function used by both cart and checkout.

```typescript
computeQuote(input: {
  lines: { variantId, qty, mrp, price }[]
  coupon?: Coupon
  address?: Address
  userTier?: Tier
}): Quote   // pure, unit-tested, 40+ cases
```

### Quote Shape

```typescript
type Quote = {
  subtotal: Money          // sum of line prices * qty
  mrpTotal: Money          // sum of line mrp * qty
  productDiscount: Money   // mrpTotal - subtotal
  couponDiscount: Money    // from coupon rules
  shipping: Money          // based on address + total + tier
  tax: Money               // based on address + category GST rates
  total: Money             // subtotal - couponDiscount + shipping + tax
  breakdown: {
    lines: {
      variantId: string
      qty: number
      unitPrice: Money
      unitMrp: Money
      lineTotal: Money
      discount: Money
    }[]
    discounts: {
      kind: string
      label: string
      amount: Money
    }[]
    freeShippingThreshold?: Money
    freeShippingDelta?: Money
  }
}
```

### Rules

- Money = integer minor units (paise/cents). Never float.
- Coupon `maxDiscount` caps the coupon discount.
- `perUserLimit` and `totalLimit` checked atomically.
- Shipping free above threshold (tier-dependent).
- Tax calculated per-line based on category HSN codes.
- The function is **pure** — no DB calls, no side effects.
- 40+ unit test cases covering: basic, coupon pct, coupon flat, coupon BXGY, coupon shipping, min subtotal not met, max discount cap, stacking, empty cart, single item, tier discounts.

---

## Server Action Contract

Every Server Action follows this pattern:

```typescript
type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: { code: string; message: string; field?: string } }
```

Every Server Action:
1. `authGuard()` — verify session
2. Zod parse — validate input
3. Rate-limit — Upstash sliding window
4. Execute — domain logic
5. Return typed result — never throw to client

---

## Idempotency

Required on these endpoints:
- `cart.addItem` — keyed on `cartId + variantId`
- `checkout.confirm` — keyed on `reservationId`
- Payment webhooks — keyed on `providerRefId`
- Refund creation — keyed on `returnId`

Implementation:
- `Idempotency-Key` header
- Stored in `idempotency_keys` table
- Response cached for 24h
- Stale keys cleaned by cron
