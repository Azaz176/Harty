# LOOM — Signature Interaction Catalog

> This is the file that makes your product not-generic. Each item is a named, spec'd, testable interaction the LLM must build.

> **Rule: every screen must implement at least 2 catalog items. A PR with zero signature interactions is rejected.**

---

## SI-01: Curtain Route Transition

View Transitions API. Outgoing page scales to `0.97` + fades to `0.6` opacity; a `--color-paper` panel wipes from the click origin's axis; incoming page reveals with `clip-path inset`. 520ms `--ease-out-expo`. Persistent nav/bag excluded via `view-transition-name`.

---

## SI-02: Product Morph

Clicking a PLP card: that image gets `view-transition-name: product-{id}` and morphs into the PDP hero. Title/price cross-fade with 45ms stagger. Fallback: Motion `layoutId`.

---

## SI-03: Scrub Gallery

**PDP desktop:** Left column sticky, images stack vertically; as you scroll, active thumb indicator animates and a thin progress rail fills.

**Mobile:** Embla with drag-velocity-based parallax on adjacent slides + pinch-to-zoom lightbox.

---

## SI-04: Flight to Bag

Add-to-bag: product thumbnail clones, flies along a quadratic bezier arc to the bag icon, scales `1 -> 0.2`, bag icon does a bouncy squash + count-ticker flip. 620ms. Haptic `navigator.vibrate(8)`.

---

## SI-05: Magnetic CTA

Primary CTA translates up to 6px toward cursor (`useSpring`, stiffness 180); inner label counter-translates 2px for depth; on press `scale: 0.97`; on success the fill wipes with `--color-volt` left -> right and the label crossfades to "Added".

---

## SI-06: Bag Drawer

Right-edge drawer, `spring.smooth`. Items enter with 45ms stagger, `y: 16 -> 0` + opacity. Swipe-left-to-remove with rubber-band resistance + red reveal. Total price is a rolling digit ticker, not a re-render. Free-shipping progress bar animates on qty change.

---

## SI-07: Filter Morph Sheet

Filter chips are the source: tapping "Size" expands that chip into the panel (`layoutId`). Result count ticks live while facets toggle (optimistic, debounced 250ms). Applied chips get a volt underline that draws in. Mobile = Vaul bottom sheet with snap points `[0.5, 0.92]`.

---

## SI-08: Wishlist Burst

Heart: path-morph outline -> filled + 8 particles on radial paths with staggered fade, `spring.bouncy`. Optimistic (`useOptimistic`), rollback shakes on failure.

---

## SI-09: Fit Confidence

Size selector: on hover/focus a horizontal bar shows "Fits true to size — 78% of 1,204 buyers" — bar width animates from 0 with `--dur-base`. Out-of-stock sizes get a diagonal strikethrough that draws in + a "Notify me" affordance.

---

## SI-10: Velocity Grid

Infinite PLP: virtualized. Card images get `scaleY` skew proportional to scroll velocity (max `1.04` / `3deg`), springing back to rest. New rows blur-up from LQIP.

---

## SI-11: Command K Commerce Palette

`cmdk` overlay, backdrop blur + paper scrim. Sections: Recent, Brands, Categories, Products (with thumbs). Type-ahead with character-level highlight. Arrow-key navigation animates a `layoutId` selection bar.

---

## SI-12: Editorial Scroll Hero

Home hero: GSAP ScrollTrigger pinned 120vh. Display headline split by char, mask-revealed with 24ms stagger. Background image scales `1.12 -> 1` with `clip-path inset` opening. A horizontal marquee of brand names skews on scroll velocity.

---

## SI-13: Shop-the-Look Hotspots

Editorial image with pulsing hotspot dots; tap expands into a card with product + inline size + add-to-bag, anchored with Radix Popover + spring scale from the dot's origin.

---

## SI-14: Checkout Stepper

Horizontal accordion. Completed steps collapse to a one-line summary with a check that draws its path. Active step expands with height animation. Order summary is sticky and each line item animates on coupon apply (price strikes through + new price slides up).

---

## SI-15: Order Timeline

Vertical timeline; the connecting line is an SVG `stroke-dashoffset` draw. Current node pulses. Live status polls and the new node "unfolds".

---

## SI-16: Skeleton to Blur-up

Every image: LQIP base64 blur -> sharp with 400ms crossfade + subtle `scale(1.02 -> 1)`. Skeletons use a directional shimmer, not a pulsing grey box.

---

## SI-17: Sticky Cross-fade Nav

Nav on scroll-down: shrinks height `88 -> 56px`, logo scales, becomes backdrop-blur + hairline. On scroll-up it returns. Category mega-menu opens with height spring + column stagger + a preview image that crossfades on hover.

---

## SI-18: Cursor Contexts (desktop, `pointer:fine` only)

10px ink dot with lag-follow. Grows to 56px with "VIEW" on media, becomes "DRAG <->" on carousels, ring on interactive. Auto-disabled on touch + reduced motion.

---

## SI-19: Empty & Error States

Hand-drawn SVG line illustrations with `stroke-dashoffset` draw-in, never a stock illustration or emoji. Each has a single clear action.

---

## SI-20: Price Ticker

All money values use a rolling-digit component (per-digit y translate spring). Applies to bag total, PDP discount, coupon savings.

---

## Quick Reference Matrix

| ID | Name | Screens | Key Tech |
|---|---|---|---|
| SI-01 | Curtain Route Transition | All routes | View Transitions API |
| SI-02 | Product Morph | PLP -> PDP | view-transition-name / layoutId |
| SI-03 | Scrub Gallery | PDP | Sticky scroll, Embla |
| SI-04 | Flight to Bag | PDP, PLP quick-add | Bezier arc, haptic |
| SI-05 | Magnetic CTA | PDP, Checkout | useSpring, volt wipe |
| SI-06 | Bag Drawer | Global | spring.smooth, swipe-to-remove |
| SI-07 | Filter Morph Sheet | PLP, Search | layoutId, Vaul |
| SI-08 | Wishlist Burst | PDP, PLP | Path morph, particles |
| SI-09 | Fit Confidence | PDP | Bar animation, notify-me |
| SI-10 | Velocity Grid | PLP | TanStack Virtual, scroll velocity |
| SI-11 | Command K Palette | Global | cmdk, layoutId selection |
| SI-12 | Editorial Scroll Hero | Home | GSAP ScrollTrigger, SplitText |
| SI-13 | Shop-the-Look Hotspots | Editorial, Collections | Radix Popover, spring |
| SI-14 | Checkout Stepper | Checkout | Horizontal accordion, draw |
| SI-15 | Order Timeline | Order detail | SVG stroke-dashoffset |
| SI-16 | Skeleton to Blur-up | All images | LQIP, crossfade |
| SI-17 | Sticky Cross-fade Nav | Global nav | Height spring, mega-menu |
| SI-18 | Cursor Contexts | Desktop global | Lag-follow, context labels |
| SI-19 | Empty & Error States | All empty/error | SVG draw-in |
| SI-20 | Price Ticker | PDP, Bag, Checkout | DigitRoll, spring |
