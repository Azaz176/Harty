# LOOM File Tree (125 source files)

```
loom/
├── CLAUDE.md                           # Project instructions
├── package.json                        # Root workspace
├── pnpm-workspace.yaml
├── turbo.json
│
├── apps/
│   └── web/                            # Next.js 16 Storefront
│       ├── package.json
│       ├── next.config.ts
│       ├── tsconfig.json
│       └── src/
│           ├── app/
│           │   ├── layout.tsx          # Root layout + providers
│           │   ├── page.tsx            # Home (editorial)
│           │   ├── globals.css
│           │   │
│           │   ├── [gender]/
│           │   │   ├── page.tsx        # Gender hub
│           │   │   └── [category]/
│           │   │       ├── page.tsx    # PLP
│           │   │       ├── loading.tsx
│           │   │       └── _components/
│           │   │           ├── plp-client.tsx
│           │   │           ├── product-grid.tsx
│           │   │           ├── product-card.tsx
│           │   │           ├── filter-sidebar.tsx
│           │   │           ├── active-filters.tsx
│           │   │           ├── sort-select.tsx
│           │   │           ├── density-toggle.tsx
│           │   │           └── use-plp-params.ts
│           │   │
│           │   ├── p/[slug]/
│           │   │   ├── page.tsx        # PDP
│           │   │   ├── loading.tsx
│           │   │   ├── not-found.tsx
│           │   │   ├── error.tsx
│           │   │   └── _components/
│           │   │       ├── product-gallery.tsx
│           │   │       ├── buy-box.tsx
│           │   │       ├── reviews-panel.tsx
│           │   │       ├── related-rail.tsx
│           │   │       ├── sticky-mobile-bar.tsx
│           │   │       └── skeletons.tsx
│           │   │
│           │   ├── bag/
│           │   │   └── page.tsx        # Bag page
│           │   │
│           │   ├── checkout/
│           │   │   ├── layout.tsx
│           │   │   ├── page.tsx        # Multi-step checkout
│           │   │   └── _components/
│           │   │       ├── checkout-stepper.tsx
│           │   │       ├── address-step.tsx
│           │   │       └── payment-step.tsx
│           │   │
│           │   ├── order/[id]/confirmed/
│           │   │   └── page.tsx        # Order confirmation
│           │   │
│           │   ├── motion-lab/
│           │   │   ├── page.tsx        # Design playground
│           │   │   └── _components/
│           │   │       └── motion-lab-client.tsx
│           │   │
│           │   ├── api/trpc/[trpc]/
│           │   │   └── route.ts        # tRPC handler
│           │   │
│           │   └── _components/        # Shared components
│           │       ├── app-shell.tsx
│           │       ├── navbar.tsx
│           │       ├── mega-menu.tsx
│           │       ├── nav-data.ts
│           │       ├── footer.tsx
│           │       ├── bag-drawer.tsx
│           │       ├── bag-badge.tsx
│           │       ├── command-palette.tsx
│           │       ├── home-hero.tsx
│           │       ├── home-categories.tsx
│           │       ├── home-trending.tsx
│           │       └── home-editorial.tsx
│           │
│           ├── lib/
│           │   ├── format-money.ts
│           │   └── trpc/
│           │       ├── client.ts       # tRPC client hooks
│           │       ├── server.ts       # Server-side caller
│           │       └── provider.tsx    # TRPCProvider
│           │
│           └── stores/
│               └── cart-store.ts       # Zustand cart
│
├── packages/
│   ├── ui/                             # Design System
│   │   ├── package.json
│   │   └── src/
│   │       ├── index.ts                # Public exports
│   │       ├── styles/
│   │       │   └── tokens.css          # Design tokens
│   │       ├── lib/
│   │       │   └── cn.ts               # Class merge
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       ├── chip.tsx
│   │       ├── skeleton.tsx
│   │       ├── text.tsx
│   │       ├── sheet.tsx
│   │       ├── drawer.tsx
│   │       ├── dialog.tsx
│   │       ├── toast.tsx
│   │       ├── image-frame.tsx
│   │       ├── price-ticker.tsx
│   │       ├── rating.tsx
│   │       ├── swatch-picker.tsx
│   │       ├── size-picker.tsx
│   │       ├── select.tsx
│   │       ├── tabs.tsx
│   │       ├── accordion.tsx
│   │       ├── tooltip.tsx
│   │       ├── marquee.tsx
│   │       └── cursor.tsx
│   │
│   ├── motion/                         # Animation System
│   │   ├── package.json
│   │   └── src/
│   │       ├── index.ts
│   │       ├── springs.ts              # Spring presets
│   │       ├── reveal.tsx              # Fade/slide in
│   │       ├── digit-roll.tsx          # Number ticker
│   │       └── magnetic.tsx            # Magnetic hover
│   │
│   ├── api/                            # tRPC Backend
│   │   ├── package.json
│   │   └── src/
│   │       ├── index.ts
│   │       ├── root.ts                 # Root router
│   │       ├── trpc.ts                 # Init + context
│   │       ├── data/
│   │       │   └── mock-products.ts    # ~90 products
│   │       └── routers/
│   │           ├── catalog.ts
│   │           ├── search.ts
│   │           ├── cart.ts
│   │           ├── wishlist.ts
│   │           ├── review.ts
│   │           └── checkout.ts
│   │
│   ├── db/                             # Database Schema
│   │   ├── package.json
│   │   ├── drizzle.config.ts
│   │   └── src/
│   │       ├── index.ts
│   │       └── schema/
│   │           ├── index.ts
│   │           ├── enums.ts            # 14 enums
│   │           ├── users.ts
│   │           ├── catalog.ts
│   │           ├── collections.ts
│   │           ├── coupons.ts
│   │           ├── cart.ts
│   │           ├── orders.ts
│   │           ├── reviews.ts
│   │           └── system.ts
│   │
│   ├── search/                         # Typesense
│   │   ├── package.json
│   │   └── src/
│   │       ├── index.ts
│   │       ├── client.ts
│   │       ├── schema.ts
│   │       ├── searcher.ts
│   │       ├── indexer.ts
│   │       └── synonyms.ts
│   │
│   ├── config/                         # Shared Config
│   │   ├── package.json
│   │   └── src/
│   │       ├── index.ts
│   │       ├── env.ts
│   │       ├── money.ts                # Paise type + formatMoney
│   │       └── constants.ts
│   │
│   ├── analytics/                      # Event Registry
│   │   ├── package.json
│   │   └── src/
│   │       ├── index.ts
│   │       └── events.ts
│   │
│   └── payments/                       # Payment Adapters
│       ├── package.json
│       └── src/
│           └── index.ts                # Placeholder
│
├── docs/                               # Documentation
│   ├── 00-CONSTITUTION.md
│   ├── 01-DESIGN-LANGUAGE.md
│   ├── 02-MOTION-SPEC.md
│   ├── 03-INTERACTION-CATALOG.md
│   ├── 04-DATA-MODEL.md
│   ├── 05-API-CONTRACT.md
│   ├── PROJECT_STATE.md                # Living handoff
│   ├── ARCHITECTURE.md                 # Diagrams
│   ├── COMPONENT_TREE.md               # Component structure
│   ├── SIGNATURE_INTERACTIONS.md       # SI status
│   ├── API_REFERENCE.md                # tRPC docs
│   └── FILE_TREE.md                    # This file
│
├── scripts/
│   └── check-banned.ts                 # Quality enforcer
│
└── .github/
    └── workflows/
        └── ci.yml                      # CI pipeline
```
