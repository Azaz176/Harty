# LOOM Signature Interactions

20 spec'd interactions that defeat generic UI. Every screen implements ≥2.

## Implemented (14/20)

### SI-03: Scrub Gallery
**Location:** PDP (`/p/[slug]`)
**Behavior:** Desktop: thumbnail strip, click to switch. Mobile: swipe carousel with dots.
**Motion:** `spring.smooth` crossfade between images.

### SI-05: Magnetic CTA
**Location:** PDP Buy Box
**Behavior:** "Add to Bag" button follows cursor within 40px radius, snaps back on leave.
**Motion:** `spring.snap` with 0.15 damping ratio.

### SI-06: Bag Drawer
**Location:** Global (navbar trigger)
**Behavior:** Right-edge sheet slides in. Items stagger in. Shipping progress bar animates.
**Motion:** Sheet: `spring.morph`. Items: `StaggerGroup` 50ms delay. Progress: `spring.smooth`.

### SI-07: Filter Morph Sheet
**Location:** PLP (`/[gender]/[category]`)
**Behavior:** Desktop: persistent sidebar. Mobile: bottom sheet morph from filter chip.
**Motion:** `spring.morph` for sheet, chips animate in/out with `spring.snap`.

### SI-08: Wishlist Burst
**Location:** PDP, Product Cards
**Behavior:** Heart icon bursts with particles on toggle.
**Motion:** Scale `spring.bouncy`, particles fade out over 600ms.

### SI-09: Fit Confidence
**Location:** PDP Size Picker
**Behavior:** Size buttons show fit indicator (slim/regular/relaxed). Tooltip on hover.
**Motion:** Tooltip: `spring.snap` fade + scale.

### SI-10: Velocity Grid
**Location:** PLP
**Behavior:** Product cards scale slightly on scroll velocity. Fast scroll = subtle shrink.
**Motion:** Scale 1.0 → 0.97 based on scroll delta, `spring.smooth` return.

### SI-11: Command Palette
**Location:** Global (Cmd+K)
**Behavior:** Search overlay with recent, trending, suggestions.
**Motion:** Backdrop blur fade 200ms, content `spring.morph` scale from 0.95.

### SI-12: Editorial Scroll Hero
**Location:** Home (`/`)
**Behavior:** Parallax layers, text reveals on scroll, image zoom.
**Motion:** CSS `scroll-timeline` with `Reveal` components.

### SI-14: Checkout Stepper
**Location:** Checkout (`/checkout`)
**Behavior:** Horizontal stepper with active/completed/upcoming states.
**Motion:** Step transition `spring.smooth`, checkmark draw-in on complete.

### SI-16: Skeleton Blur-up
**Location:** All product images
**Behavior:** Low-res placeholder blurs up to full image on load.
**Motion:** Blur 20px → 0px over 400ms with `ease-out`.

### SI-17: Sticky Cross-fade Nav
**Location:** Navbar
**Behavior:** Full nav shrinks to compact on scroll down, expands on scroll up.
**Motion:** Height: `spring.smooth`. Logo/links crossfade 200ms.

### SI-19: Empty/Error States
**Location:** Bag, PDP not-found, search no-results
**Behavior:** Illustrated empty states with clear CTAs.
**Motion:** Illustration `Reveal` fade + float up.

### SI-20: Price Ticker
**Location:** PDP, Bag, Checkout
**Behavior:** Price digits roll like odometer on change.
**Motion:** `DigitRoll` component with `spring.snap`.

---

## Not Yet Implemented (6/20)

### SI-01: Cursor Aura
**Behavior:** Subtle glow follows cursor on editorial pages.
**Where:** Home hero, brand pages.

### SI-02: Hover Parallax Card
**Behavior:** Product card layers shift on mouse position.
**Where:** Featured products, collections.

### SI-04: Size Guide Drawer
**Behavior:** Measurements overlay with brand-specific sizing.
**Where:** PDP.

### SI-13: Infinite Scroll + Anchor
**Behavior:** URL updates with scroll position, back button restores.
**Where:** PLP.

### SI-15: Payment Flip
**Behavior:** Card input flips to show CVV field on back.
**Where:** Checkout payment step.

### SI-18: Toast Stack
**Behavior:** Toasts stack and auto-dismiss with progress bar.
**Where:** Global.

---

## Implementation Checklist by Route

| Route | Required | Implemented |
|-------|----------|-------------|
| `/` | SI-01, SI-12 | SI-12 |
| `/[gender]/[category]` | SI-07, SI-10, SI-13 | SI-07, SI-10 |
| `/p/[slug]` | SI-03, SI-05, SI-08, SI-09, SI-20 | All ✓ |
| `/bag` | SI-06, SI-20 | All ✓ |
| `/checkout` | SI-14, SI-15, SI-20 | SI-14, SI-20 |
| `global` | SI-11, SI-16, SI-17, SI-18, SI-19 | SI-11, SI-16, SI-17, SI-19 |
