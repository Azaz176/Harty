# PROJECT_STATE (updated 2026-09-08 · after Phase 4)

## Stack deviations from Constitution
- Next.js 16.3.4 instead of 15+ (within spec, latest stable)
- TypeScript 5.9 instead of 5.6 (compatible upgrade)

## Completed Phases
- **Phase 0**: Foundation (monorepo, CI, docs, DB schema)
- **Phase 1**: Design System & Motion (tokens, 20 primitives, /motion-lab)
- **Phase 2**: Catalog & Discovery (tRPC, PLP, navigation, search)
- **Phase 3**: PDP (gallery, buy box, reviews, related)
- **Phase 4**: Bag & Checkout (bag drawer, checkout flow, order confirmation)

## Design tokens
Frozen. Source: `packages/ui/src/styles/tokens.css`. Additions require a ticket.

Includes:
- Surface: paper, paper-sunk, paper-raised, ink, ink-muted, ink-faint, hairline
- Accent: volt, volt-ink, clay, sale, success
- Typography: font-display (serif), font-sans (Geist), fluid scale (hero→micro)
- Motion: 5 ease curves, 6 durations, 3 stagger values, z-scale
- Radii: none/sm/md/pill (NO rounded-lg/xl)
- Shadows: drawer, pop (floating layers only)

## Public API of packages/ui
```
cn, Text, Button, Input, Chip, Skeleton,
Sheet, Drawer, Dialog, Toaster/toast,
ImageFrame, PriceTicker, Rating, SwatchPicker, SizePicker,
Marquee, CursorProvider,
SelectRoot/Trigger/Content/Item/...,
TabsRoot/List/Trigger/Content,
AccordionRoot/Item/Trigger/Content,
TooltipProvider/Root/Trigger/Content/Arrow
```

## packages/motion exports
```
spring (snap/smooth/morph/bouncy/release)
tween (micro/fast/base/slow/cinema)
Reveal, StaggerGroup, DigitRoll, Magnetic
```

## tRPC routers implemented
```
catalog.list / catalog.facets / catalog.product / catalog.related
search.query / search.suggest
cart.get / cart.addItem / cart.updateQty / cart.removeItem / cart.applyCoupon / cart.removeCoupon / cart.summary
wishlist.list / wishlist.toggle / wishlist.check / wishlist.moveToBag
review.list / review.summary / review.markHelpful
checkout.init / checkout.setAddress / checkout.createPayment / checkout.confirm
```

## Routes implemented
```
/ — Editorial home (hero, categories, trending, editorial, new arrivals, footer)
/[gender] — Gender hub
/[gender]/[category] — PLP (filters, sort, density, virtualized grid)
/p/[slug] — PDP (gallery, buy box, reviews, related)
/bag — Shopping bag page
/checkout — Multi-step checkout (address → payment → review)
/order/[id]/confirmed — Order confirmation
/motion-lab — Design system playground
/api/trpc/[trpc] — tRPC handler
```

## Signature Interactions implemented
- SI-03: Scrub Gallery (PDP)
- SI-05: Magnetic CTA (PDP buy box)
- SI-06: Bag Drawer (right-edge sheet, stagger, shipping bar)
- SI-07: Filter Morph Sheet (PLP sidebar + mobile drawer)
- SI-08: Wishlist Burst (PDP)
- SI-09: Fit Confidence (PDP size picker)
- SI-10: Velocity Grid (PLP)
- SI-11: Command Palette (Cmd+K search)
- SI-12: Editorial Scroll Hero (home)
- SI-14: Checkout Stepper (checkout)
- SI-16: Skeleton blur-up (everywhere)
- SI-17: Sticky Cross-fade Nav (navbar)
- SI-19: Empty/Error States (PDP not-found, bag empty)
- SI-20: Price Ticker (PDP, bag, checkout)

## DB schema (Drizzle, not migrated yet)
22 tables: users, addresses, brands, categories, products, variants, inventory, media, collections, collection_items, carts, cart_items, wishlists, coupons, orders, order_items, payments, shipments, returns, reviews, idempotency_keys, audit_log, outbox

14 enums defined.

## Mock data
~90 products across 8 brands (ZARA, H&M, UNIQLO, Mango, Massimo Dutti, COS, & Other Stories, Arket), 12 categories, with realistic titles, prices, variants, and seeded reviews.

## Known debt
- D-001: DB not connected (using in-memory mock data)
- D-002: Auth not implemented (cart uses localStorage cartId)
- D-003: Typesense not connected (search uses mock string matching)
- D-004: Payments not integrated (mock checkout)
- D-005: Account pages not built (/account/*)
- D-006: Wishlist page not built (/wishlist)

## Conventions established
- Server Action result: `{ ok, data } | { ok, error: { code, message, field? } }`
- Money: integer paise via `packages/config/money.ts`, branded `Paise` type
- Analytics events: `snake_case`, registry at `packages/analytics/events.ts`
- File naming: components PascalCase, hooks `use-*.ts`, actions `actions.ts`
- URL state: nuqs for all filter/sort/pagination
- tRPC: server caller in `lib/trpc/server.ts`, client in `lib/trpc/client.ts`
- Imports: `@loom/ui`, `@loom/motion`, `@loom/config` workspace aliases

## NEXT: Phase 5 (Account & Post-purchase)
- /account layout + profile
- /account/orders + order detail
- /account/addresses
- /wishlist page
- Returns flow
