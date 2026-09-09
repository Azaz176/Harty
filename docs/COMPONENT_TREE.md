# LOOM Component Tree

## apps/web/src Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout, providers, fonts
│   ├── page.tsx                # Home (editorial sections)
│   ├── globals.css             # Tailwind imports
│   │
│   ├── [gender]/
│   │   ├── page.tsx            # Gender hub
│   │   └── [category]/
│   │       └── page.tsx        # PLP
│   │
│   ├── p/
│   │   └── [slug]/
│   │       └── page.tsx        # PDP
│   │
│   ├── bag/
│   │   └── page.tsx            # Bag page
│   │
│   ├── checkout/
│   │   ├── page.tsx            # Checkout flow
│   │   └── actions.ts          # Server actions
│   │
│   ├── order/
│   │   └── [id]/
│   │       └── confirmed/
│   │           └── page.tsx    # Order confirmation
│   │
│   ├── motion-lab/
│   │   └── page.tsx            # Design playground
│   │
│   ├── api/
│   │   └── trpc/
│   │       └── [trpc]/
│   │           └── route.ts    # tRPC handler
│   │
│   └── _components/            # Shared app components
│       ├── navbar.tsx
│       ├── footer.tsx
│       ├── bag-drawer.tsx
│       ├── command-palette.tsx
│       ├── product-card.tsx
│       ├── filter-sidebar.tsx
│       └── checkout-stepper.tsx
│
├── components/                 # Feature components
│   ├── home/
│   │   ├── hero-section.tsx
│   │   ├── category-grid.tsx
│   │   ├── trending-carousel.tsx
│   │   └── editorial-section.tsx
│   │
│   ├── plp/
│   │   ├── product-grid.tsx
│   │   ├── filter-chips.tsx
│   │   └── sort-dropdown.tsx
│   │
│   ├── pdp/
│   │   ├── image-gallery.tsx
│   │   ├── buy-box.tsx
│   │   ├── size-picker.tsx
│   │   ├── review-section.tsx
│   │   └── related-products.tsx
│   │
│   └── checkout/
│       ├── address-form.tsx
│       ├── payment-form.tsx
│       └── order-summary.tsx
│
├── lib/
│   ├── trpc/
│   │   ├── client.ts           # tRPC client hooks
│   │   ├── server.ts           # Server-side caller
│   │   └── provider.tsx        # TRPCProvider
│   │
│   ├── stores/
│   │   └── cart-store.ts       # Zustand cart
│   │
│   └── utils/
│       └── cn.ts               # Class merge utility
│
└── hooks/
    ├── use-cart.ts
    ├── use-wishlist.ts
    └── use-media-query.ts
```

## packages/ui Components

```
packages/ui/src/
├── styles/
│   └── tokens.css              # Design tokens (@theme)
│
├── primitives/
│   ├── button.tsx              # Primary, secondary, ghost, volt
│   ├── input.tsx               # Text, search, textarea
│   ├── chip.tsx                # Filter chips, tags
│   ├── skeleton.tsx            # Loading placeholders
│   ├── text.tsx                # Typography component
│   │
│   ├── sheet.tsx               # Side drawers (bag, filters)
│   ├── drawer.tsx              # Bottom drawer (mobile)
│   ├── dialog.tsx              # Modal dialogs
│   ├── toast.tsx               # Notifications
│   │
│   ├── image-frame.tsx         # Product images (no radius)
│   ├── price-ticker.tsx        # Animated price (SI-20)
│   ├── rating.tsx              # Star ratings
│   ├── swatch-picker.tsx       # Color swatches
│   ├── size-picker.tsx         # Size buttons
│   │
│   ├── select.tsx              # Dropdown select
│   ├── tabs.tsx                # Tab navigation
│   ├── accordion.tsx           # Collapsible sections
│   ├── tooltip.tsx             # Hover tooltips
│   │
│   ├── marquee.tsx             # Scrolling text banner
│   └── cursor-provider.tsx     # Custom cursor effects
│
├── utils/
│   └── cn.ts                   # tailwind-merge + clsx
│
└── index.ts                    # Public exports
```

## packages/motion Components

```
packages/motion/src/
├── springs.ts                  # Spring presets
│   ├── snap                    # stiffness: 520, damping: 34
│   ├── smooth                  # stiffness: 260, damping: 30
│   ├── morph                   # stiffness: 190, damping: 26
│   ├── bouncy                  # stiffness: 420, damping: 15
│   └── release                 # stiffness: 120, damping: 14
│
├── tween.ts                    # Duration presets
│   ├── micro                   # 140ms
│   ├── fast                    # 220ms
│   ├── base                    # 320ms
│   ├── slow                    # 520ms
│   └── cinema                  # 900ms
│
├── reveal.tsx                  # Fade + slide in
├── stagger-group.tsx           # Staggered children
├── digit-roll.tsx              # Number ticker
├── magnetic.tsx                # Magnetic hover effect
│
└── index.ts                    # Public exports
```

## packages/api Routers

```
packages/api/src/
├── routers/
│   ├── catalog.ts              # list, facets, product, related
│   ├── search.ts               # query, suggest
│   ├── cart.ts                 # get, addItem, updateQty, removeItem, applyCoupon
│   ├── wishlist.ts             # list, toggle, check, moveToBag
│   ├── review.ts               # list, summary, markHelpful
│   └── checkout.ts             # init, setAddress, createPayment, confirm
│
├── data/
│   └── mock-products.ts        # ~90 products, 8 brands
│
├── trpc.ts                     # tRPC init, context
└── index.ts                    # Root router
```

## packages/db Schema

```
packages/db/src/schema/
├── enums.ts                    # 14 enums (gender, orderStatus, etc.)
├── users.ts                    # users, addresses
├── catalog.ts                  # brands, categories, products, variants, inventory, media
├── collections.ts              # collections, collection_items
├── coupons.ts                  # coupons
├── cart.ts                     # carts, cart_items, wishlists
├── orders.ts                   # orders, order_items, payments, shipments, returns
├── reviews.ts                  # reviews
├── system.ts                   # idempotency_keys, audit_log, outbox
└── index.ts                    # All exports
```
