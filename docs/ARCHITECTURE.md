# LOOM Architecture

## Package Dependency Graph

```
┌─────────────────────────────────────────────────────────────────┐
│                         apps/web                                 │
│                    (Next.js 16 Storefront)                       │
└───────┬──────────────┬──────────────┬──────────────┬────────────┘
        │              │              │              │
        ▼              ▼              ▼              ▼
┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐
│ @loom/ui  │  │@loom/motion│ │ @loom/api │  │@loom/config│
│           │  │           │  │           │  │           │
│ 20 prims  │  │ springs   │  │ tRPC      │  │ env       │
│ tokens.css│  │ Reveal    │  │ routers   │  │ money     │
│ cn()      │  │ DigitRoll │  │ mock data │  │ constants │
└───────────┘  └───────────┘  └─────┬─────┘  └───────────┘
                                    │
                                    ▼
                             ┌───────────┐
                             │ @loom/db  │
                             │           │
                             │ Drizzle   │
                             │ 22 tables │
                             └───────────┘
```

## Data Flow

```
┌──────────────────────────────────────────────────────────────────┐
│                        Browser (Client)                          │
└──────────────────────────────────────────────────────────────────┘
         │                    │                    │
         │ RSC hydration      │ tRPC mutations     │ URL state
         ▼                    ▼                    ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   Server        │  │   TanStack      │  │     nuqs        │
│   Components    │  │   Query         │  │   (useQuery-    │
│   (RSC)         │  │   (client)      │  │    States)      │
└────────┬────────┘  └────────┬────────┘  └─────────────────┘
         │                    │
         │ direct call        │ /api/trpc/*
         ▼                    ▼
┌──────────────────────────────────────────────────────────────────┐
│                      tRPC Routers                                │
│  catalog | search | cart | wishlist | review | checkout          │
└──────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────┐
│                    Mock Data (in-memory)                         │
│              (will become PostgreSQL + Drizzle)                  │
└──────────────────────────────────────────────────────────────────┘
```

## Route Structure

```
/                          Editorial Home
├── /[gender]              Gender Hub (women, men, kids)
│   └── /[category]        PLP (filters, sort, grid)
├── /p/[slug]              PDP (gallery, buy box, reviews)
├── /bag                   Shopping Bag
├── /checkout              Multi-step Checkout
├── /order/[id]/confirmed  Order Confirmation
├── /motion-lab            Design System Playground
└── /api/trpc/[trpc]       tRPC Handler
```

## Component Architecture

```
Layout (root)
├── Navbar
│   ├── Logo
│   ├── MegaMenu (gender → categories)
│   ├── SearchTrigger → CommandPalette (SI-11)
│   ├── WishlistIcon
│   └── BagIcon → BagDrawer (SI-06)
│
├── Page Content
│   ├── Home
│   │   ├── HeroSection (SI-12)
│   │   ├── CategoryGrid
│   │   ├── TrendingCarousel
│   │   ├── EditorialSection
│   │   └── NewArrivals
│   │
│   ├── PLP ([gender]/[category])
│   │   ├── FilterSidebar (SI-07)
│   │   ├── SortDropdown
│   │   ├── DensityToggle
│   │   └── ProductGrid (SI-10, SI-16)
│   │
│   ├── PDP (p/[slug])
│   │   ├── ImageGallery (SI-03)
│   │   ├── BuyBox
│   │   │   ├── PriceTicker (SI-20)
│   │   │   ├── SizePicker (SI-09)
│   │   │   ├── AddToBag (SI-05 Magnetic)
│   │   │   └── WishlistButton (SI-08)
│   │   ├── ProductDetails
│   │   └── ReviewSection
│   │
│   └── Checkout
│       ├── CheckoutStepper (SI-14)
│       ├── AddressStep
│       ├── PaymentStep
│       └── ReviewStep
│
└── Footer
```

## State Management

```
┌─────────────────────────────────────────────────────────────────┐
│                       State Domains                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Server State (tRPC + TanStack Query)                           │
│  ├── catalog.list / catalog.product / catalog.related           │
│  ├── search.query / search.suggest                              │
│  ├── cart.get / cart.summary                                    │
│  ├── wishlist.list                                              │
│  └── review.list / review.summary                               │
│                                                                  │
│  Client State (Zustand)                                         │
│  └── useCartStore (cartId in localStorage)                      │
│                                                                  │
│  URL State (nuqs)                                                │
│  ├── filters: brand[], category[], size[], color[], price       │
│  ├── sort: relevance | price-asc | price-desc | newest          │
│  ├── page: number                                                │
│  └── density: comfortable | compact                             │
│                                                                  │
│  Form State (react-hook-form + zod)                             │
│  └── Checkout address/payment forms                             │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## File Naming Conventions

```
Components:     PascalCase.tsx      ProductCard.tsx
Hooks:          use-*.ts            use-cart.ts
Actions:        actions.ts          checkout/actions.ts
Types:          types.ts            catalog/types.ts
Utils:          kebab-case.ts       format-money.ts
Constants:      SCREAMING_SNAKE     MAX_CART_ITEMS
```
