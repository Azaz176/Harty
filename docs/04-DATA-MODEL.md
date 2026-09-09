# LOOM — Data Model

> Source of truth: `packages/db/src/schema.ts`

---

## Core Schema (Drizzle ORM + PostgreSQL)

### Users & Addresses

```
users            (id, phone?, email?, name, avatar, tier, createdAt)
addresses        (id, userId, label, name, phone, line1, line2, city, state,
                  pincode, country, isDefault, type: home|work)
```

### Catalog

```
brands           (id, slug, name, logoUrl, story, isPremium)
categories       (id, slug, name, parentId, gender, path, sortOrder, image)

products         (id, slug, brandId, categoryId, title, description,
                  gender, attributes jsonb,        -- fabric, fit, pattern, occasion, wash
                  basePrice int,                    -- paise/cents. NEVER float.
                  status: draft|active|archived,
                  ratingAvg numeric, ratingCount int,
                  publishedAt, searchVersion)

variants         (id, productId, sku UNIQUE, colorName, colorHex,
                  size, sizeSystem, price int, mrp int, weightGrams,
                  barcode, position)
inventory        (variantId, warehouseId, onHand, reserved, safetyStock)
                  -- available = onHand - reserved - safetyStock
media            (id, productId, variantId?, url, blurhash, width, height,
                  kind: image|video|360, position, alt)
```

### Collections

```
collections      (id, slug, title, kind: manual|rule, rules jsonb, heroMedia)
collection_items (collectionId, productId, position)
```

### Commerce

```
carts            (id, userId?, anonId?, currency, appliedCouponId?, expiresAt)
cart_items       (id, cartId, variantId, qty, priceSnapshot, addedAt)
wishlists        (userId, variantId?, productId, createdAt)

coupons          (id, code UNIQUE, kind: pct|flat|bxgy|shipping, value,
                  minSubtotal, maxDiscount, appliesTo jsonb, perUserLimit,
                  totalLimit, usedCount, startsAt, endsAt, stackable)
```

### Orders

```
orders           (id, humanId, userId, status, subtotal, discount, shipping,
                  tax, total, currency, addressSnapshot jsonb,
                  paymentStatus, placedAt)
order_items      (id, orderId, variantId, productSnapshot jsonb, qty,
                  unitPrice, discount, tax, status, returnWindowEndsAt)
payments         (id, orderId, provider, providerRefId, amount, status,
                  method, rawPayload jsonb)
shipments        (id, orderId, awb, carrier, status, events jsonb, eta)
returns          (id, orderItemId, kind: return|exchange, reason, comment,
                  media jsonb, status, refundId?, exchangeVariantId?)
```

### Reviews

```
reviews          (id, productId, userId, orderItemId, rating, title, body,
                  media jsonb, fitFeedback: small|true|large,
                  helpfulCount, status)
```

### Infrastructure

```
idempotency_keys (key PRIMARY KEY, scope, response jsonb, createdAt)
audit_log        (id, actorId, action, entity, entityId, diff jsonb, at)
outbox           (id, topic, payload jsonb, publishedAt?)  -- transactional outbox
```

---

## Hard Rules (NON-NEGOTIABLE)

### 1. Money = Integer Minor Units
- All monetary values stored as **integer** (paise/cents). NEVER float.
- A `Money` branded type + `formatMoney()` utility only.
- Never use `toFixed()` for money math.

### 2. Snapshot into Orders
- Snapshot product/price/address into orders — orders must be **immutable historical records**.
- `productSnapshot jsonb` on `order_items`.
- `addressSnapshot jsonb` on `orders`.
- Price changes after order placement do not affect existing orders.

### 3. Inventory Reservation
- Inventory reservation on checkout-start with TTL (Redis + DB `reserved` column).
- Released by an Inngest job on abandonment/timeout.
- `available = onHand - reserved - safetyStock`.

### 4. Idempotency Keys
Required on:
- Add-to-cart
- Place-order
- Payment-webhook
- Refund

### 5. Transactional Outbox
- For search reindex + emails — no dual-write bugs.
- `outbox` table with `publishedAt` column.
- Background worker processes unpublished outbox entries.

### 6. Soft-Delete
- Via `status` field, never hard `DELETE` on commerce entities.
- Products: `draft | active | archived`
- Orders: status lifecycle (never deleted)
- Reviews: `status` field for moderation

---

## Relationships

```
users 1--* addresses
users 1--* orders
users 1--* reviews
users 1--* wishlists

brands 1--* products
categories 1--* products (self-referencing via parentId)

products 1--* variants
products 1--* media
products 1--* reviews

variants 1--* inventory (per warehouse)
variants 1--* cart_items

collections *--* products (via collection_items)

carts 1--* cart_items
carts *--1 coupons (optional)

orders 1--* order_items
orders 1--* payments
orders 1--* shipments

order_items 1--* returns
```

---

## Indexes (Critical)

```sql
-- Product discovery
CREATE INDEX idx_products_brand ON products(brandId) WHERE status = 'active';
CREATE INDEX idx_products_category ON products(categoryId, gender) WHERE status = 'active';
CREATE INDEX idx_products_slug ON products(slug);

-- Variant lookup
CREATE UNIQUE INDEX idx_variants_sku ON variants(sku);
CREATE INDEX idx_variants_product ON variants(productId);

-- Inventory
CREATE INDEX idx_inventory_variant ON inventory(variantId, warehouseId);

-- Orders
CREATE INDEX idx_orders_user ON orders(userId, placedAt DESC);
CREATE INDEX idx_orders_human_id ON orders(humanId);

-- Search reindex
CREATE INDEX idx_outbox_unpublished ON outbox(publishedAt) WHERE publishedAt IS NULL;

-- Idempotency cleanup
CREATE INDEX idx_idempotency_created ON idempotency_keys(createdAt);
```
