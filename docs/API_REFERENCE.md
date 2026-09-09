# LOOM API Reference

## tRPC Routers

Base URL: `/api/trpc/[procedure]`

---

## Catalog Router

### `catalog.list`
List products with filters and pagination.

**Input:**
```ts
{
  gender?: "women" | "men" | "kids"
  category?: string
  brands?: string[]
  sizes?: string[]
  colors?: string[]
  priceMin?: number  // paise
  priceMax?: number  // paise
  sort?: "relevance" | "price-asc" | "price-desc" | "newest"
  page?: number
  limit?: number
}
```

**Output:**
```ts
{
  products: Product[]
  total: number
  page: number
  totalPages: number
}
```

### `catalog.facets`
Get available filter options for current query.

**Input:** Same as `catalog.list` (without pagination)

**Output:**
```ts
{
  brands: { slug: string, name: string, count: number }[]
  categories: { slug: string, name: string, count: number }[]
  sizes: { value: string, count: number }[]
  colors: { value: string, hex: string, count: number }[]
  priceRange: { min: number, max: number }
}
```

### `catalog.product`
Get single product by slug.

**Input:** `{ slug: string }`

**Output:** `Product | null`

### `catalog.related`
Get related products.

**Input:** `{ productId: string, limit?: number }`

**Output:** `Product[]`

---

## Search Router

### `search.query`
Full-text search.

**Input:**
```ts
{
  q: string
  filters?: FilterInput
  page?: number
  limit?: number
}
```

**Output:** Same as `catalog.list`

### `search.suggest`
Autocomplete suggestions.

**Input:** `{ q: string, limit?: number }`

**Output:**
```ts
{
  products: { slug: string, name: string, image: string }[]
  categories: { slug: string, name: string }[]
  brands: { slug: string, name: string }[]
}
```

---

## Cart Router

### `cart.get`
Get cart by ID.

**Input:** `{ cartId: string }`

**Output:**
```ts
{
  id: string
  items: CartItem[]
  itemCount: number
  subtotal: number  // paise
}
```

### `cart.addItem`
Add item to cart.

**Input:**
```ts
{
  cartId?: string  // creates new if omitted
  productId: string
  variantId: string
  quantity: number
}
```

**Output:** `Cart`

### `cart.updateQty`
Update item quantity.

**Input:**
```ts
{
  cartId: string
  itemId: string
  quantity: number  // 0 to remove
}
```

**Output:** `Cart`

### `cart.removeItem`
Remove item from cart.

**Input:** `{ cartId: string, itemId: string }`

**Output:** `Cart`

### `cart.applyCoupon`
Apply coupon code.

**Input:** `{ cartId: string, code: string }`

**Output:** `Cart` with discount applied

### `cart.removeCoupon`
Remove applied coupon.

**Input:** `{ cartId: string }`

**Output:** `Cart`

### `cart.summary`
Get cart summary with shipping and totals.

**Input:** `{ cartId: string }`

**Output:**
```ts
{
  subtotal: number
  discount: number
  shipping: number
  tax: number
  total: number
  coupon?: { code: string, discount: number }
}
```

---

## Wishlist Router

### `wishlist.list`
Get user's wishlist.

**Input:** `{ userId: string }`

**Output:** `Product[]`

### `wishlist.toggle`
Add or remove from wishlist.

**Input:** `{ userId: string, productId: string }`

**Output:** `{ added: boolean }`

### `wishlist.check`
Check if product is in wishlist.

**Input:** `{ userId: string, productId: string }`

**Output:** `{ inWishlist: boolean }`

### `wishlist.moveToBag`
Move wishlist item to cart.

**Input:**
```ts
{
  userId: string
  productId: string
  variantId: string
  cartId: string
}
```

**Output:** `{ success: boolean }`

---

## Review Router

### `review.list`
Get reviews for product.

**Input:**
```ts
{
  productId: string
  sort?: "newest" | "helpful" | "rating-high" | "rating-low"
  page?: number
  limit?: number
}
```

**Output:**
```ts
{
  reviews: Review[]
  total: number
  page: number
}
```

### `review.summary`
Get review summary/stats.

**Input:** `{ productId: string }`

**Output:**
```ts
{
  average: number
  total: number
  distribution: { [1-5]: number }
}
```

### `review.markHelpful`
Mark review as helpful.

**Input:** `{ reviewId: string }`

**Output:** `{ helpfulCount: number }`

---

## Checkout Router

### `checkout.init`
Initialize checkout session.

**Input:** `{ cartId: string }`

**Output:**
```ts
{
  checkoutId: string
  cart: Cart
  summary: CartSummary
}
```

### `checkout.setAddress`
Set shipping/billing address.

**Input:**
```ts
{
  checkoutId: string
  address: {
    fullName: string
    phone: string
    line1: string
    line2?: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  type: "shipping" | "billing"
}
```

**Output:** `{ success: boolean }`

### `checkout.createPayment`
Create payment intent.

**Input:**
```ts
{
  checkoutId: string
  method: "card" | "upi" | "cod"
}
```

**Output:**
```ts
{
  paymentId: string
  clientSecret?: string  // for Stripe
}
```

### `checkout.confirm`
Confirm and place order.

**Input:** `{ checkoutId: string, paymentId: string }`

**Output:**
```ts
{
  orderId: string
  orderNumber: string
  status: "confirmed"
}
```

---

## Types

### Product
```ts
{
  id: string
  slug: string
  name: string
  brand: { slug: string, name: string }
  category: { slug: string, name: string }
  price: number          // paise
  comparePrice?: number  // paise (original price if on sale)
  images: { url: string, alt: string }[]
  variants: Variant[]
  description: string
  details: string[]
  createdAt: Date
}
```

### Variant
```ts
{
  id: string
  size: string
  color: string
  colorHex: string
  sku: string
  inventory: number
}
```

### CartItem
```ts
{
  id: string
  product: Product
  variant: Variant
  quantity: number
  price: number  // paise, at time of add
}
```

### Review
```ts
{
  id: string
  author: string
  rating: number  // 1-5
  title: string
  body: string
  helpful: number
  verified: boolean
  createdAt: Date
}
```
