# HARTY — Project Instructions

Multi-brand fashion marketplace. Bold, modern design with red/yellow/black/white palette.

## Quick Start
```bash
cd apps/web && pnpm dev  # → http://localhost:3001
```

## Architecture
- **apps/web**: Next.js 16 storefront (main app)
- **packages/ui**: Design system (tokens.css + 20 primitives + Aceternity effects)
- **packages/motion**: Spring presets, Reveal, DigitRoll, Magnetic
- **packages/api**: tRPC routers + mock data (category-specific images)
- **packages/db**: Drizzle schema (not connected, mock data in use)

## Import Aliases
- `@harty/ui`, `@harty/motion`, `@harty/config`, `@harty/api` — workspace packages
- `@/` — apps/web/src

## Design Rules (Enforced)
- White (#FFFFFF) as primary background via `--color-paper`
- Red (#E53935) accent for CTAs, offers, primary actions via `--color-volt`
- Yellow (#FFC107) for badges, highlights, secondary accent via `--color-yellow`
- Inter for headings (font-display), Roboto for body text (font-sans)
- Rounded corners allowed (radius-sm 4px, radius-md 8px, radius-lg 12px)
- Shadows permitted on cards and floating elements

## Banned Patterns
Run `pnpm check-banned` to validate. Fails CI on:
- `#3B82F6` (generic blue)
- `#C8FF00` (old volt green — replaced by red)
- `#7C3AED` / `#8B5CF6` (purple gradients)
- `transition-all`
- Emoji icons in production

## Money
Integer paise via branded `Paise` type. Never floats. Prices rounded to 100 paise (whole rupees).
`formatMoney(paise)` with `maximumFractionDigits: 0` for display.

## State
- URL state: nuqs for filters/sort/pagination
- Cart: Zustand with localStorage (`harty-cart`)
- Auth: Zustand with localStorage (`harty-auth`)
- Language: Zustand with localStorage (`harty-language`)
- Server data: tRPC + TanStack Query

## Navigation
7 departments: Men, Women, Kids, Girls, Boys, Beautify, Accessories
Shop by Brand: Gucci, Prada, Louis Vuitton, Versace, Burberry, Dior, etc.

## Current State (2026-09-09)
Full shopping flow works: home → PLP → PDP → bag → checkout → confirmation.

Features:
- Auth modal (login/signup with mock auth)
- AI chatbot (floating red bubble, pattern-matched responses)
- Language selector (8 Indian languages)
- Notifications (mock notifications with drawer)
- Offer banner (yellow, inside fixed header)
- Visible search bar + Cmd+K palette

Mock Data: 26 brands, 79 categories, ~190 products with category-specific images.

## Key Files
- `packages/ui/src/styles/tokens.css` — Design tokens source of truth
- `packages/api/src/data/mock-products.ts` — Product data with CATEGORY_IMAGES
- `apps/web/src/app/_components/navbar.tsx` — Fixed header with OfferBanner
- `apps/web/src/app/_components/home-*.tsx` — Homepage sections
- `apps/web/src/stores/*.ts` — Zustand stores

## CSS Import Note (Turbopack)
In `globals.css`, use `@import "@harty/ui/styles/tokens.css"` (NOT `/src/styles/`).
The exports map `./*` → `./src/*` handles the resolution.
