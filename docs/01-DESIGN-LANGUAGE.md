# LOOM — Design Language

## Art Direction: "Editorial Brutalism x Soft Luxe"

> Think: SSENSE's ruthless grid + Aime Leon Dore's warmth + Apple's motion physics.

---

## Principles

### 1. Paper, not screen
Off-white canvas (`#FAF8F5`), warm grain overlay at 3% opacity. Never pure `#FFF`.

### 2. Type does the shouting
Display type at 8-14vw. Products are the only color.

### 3. Asymmetry over symmetry
12-col grid, but content deliberately breaks alignment. Nothing is centered except one thing per page.

### 4. One accent, used like a scalpel
Electric Lime `#C8FF00` only for: CTA state changes, live counters, sale flags, focus rings.

### 5. Edge-to-edge imagery
Product photos bleed off-canvas. No card borders. Whitespace does the separating.

### 6. Hairlines, not shadows
`1px solid rgb(0 0 0 / 0.08)`. Shadows only on floating layers (drawer, sheet, toast) and they're diffuse + warm-tinted.

### 7. Density switch
PLP has a real Comfort | Compact toggle — a fashion shopper scanning 200 items needs 4-up; a browser needs 2-up editorial.

### 8. Motion is the brand
If you removed all motion, it should feel broken, not merely static.

---

## Token File (Tailwind v4, CSS-first)

> Source of truth: `packages/ui/src/styles/tokens.css`
> Hand this to the LLM verbatim.

```css
/* packages/ui/src/styles/tokens.css */
@import "tailwindcss";

@theme {
  /* -- SURFACE: warm paper, never #fff --------------- */
  --color-paper:        oklch(97.8% 0.008 85);   /* #FAF8F5 */
  --color-paper-sunk:   oklch(95.2% 0.010 85);
  --color-paper-raised: oklch(99.2% 0.005 85);
  --color-ink:          oklch(18% 0.012 265);    /* near-black, cool */
  --color-ink-muted:    oklch(46% 0.010 265);
  --color-ink-faint:    oklch(68% 0.008 265);
  --color-hairline:     oklch(18% 0.012 265 / 8%);

  /* -- ACCENT: scalpel use only ---------------------- */
  --color-volt:         oklch(94% 0.24 118);     /* #C8FF00 */
  --color-volt-ink:     oklch(22% 0.06 118);
  --color-clay:         oklch(66% 0.13 42);      /* secondary warm */
  --color-sale:         oklch(58% 0.20 22);
  --color-success:      oklch(62% 0.16 152);

  /* -- TYPE ------------------------------------------ */
  --font-display: "PP Editorial New", "Instrument Serif", ui-serif, serif;
  --font-sans:    "Geist", "Inter Tight", ui-sans-serif, system-ui;
  --font-mono:    "Geist Mono", ui-monospace;

  /* fluid scale -- clamp(min, preferred, max) */
  --text-hero:    clamp(3.5rem, 11vw, 12rem);
  --text-display: clamp(2.5rem, 6vw, 5.5rem);
  --text-title:   clamp(1.75rem, 3vw, 2.75rem);
  --text-lead:    clamp(1.0625rem, 1.4vw, 1.25rem);
  --text-body:    0.9375rem;
  --text-meta:    0.8125rem;
  --text-micro:   0.6875rem;

  --tracking-hero: -0.045em;
  --tracking-caps:  0.14em;

  /* -- SPACE: 4pt base, non-linear top end ----------- */
  --spacing: 0.25rem;
  --space-section: clamp(4rem, 10vw, 12rem);

  /* -- RADII: mostly sharp --------------------------- */
  --radius-none: 0px;
  --radius-sm:   2px;
  --radius-md:   4px;
  --radius-pill: 999px;   /* chips, filter pills only */
  /* NO 8px/12px/16px card radius. Product media = 0px. */

  /* -- ELEVATION: warm, diffuse, floating layers only - */
  --shadow-drawer: 0 2px 8px oklch(18% 0.02 60 / 6%),
                   0 24px 64px -12px oklch(18% 0.02 60 / 18%);
  --shadow-pop:    0 1px 2px oklch(18% 0.02 60 / 5%),
                   0 12px 32px -8px oklch(18% 0.02 60 / 14%);

  /* -- MOTION TOKENS (the important part) ------------ */
  --ease-out-expo:    cubic-bezier(0.16, 1, 0.30, 1);
  --ease-out-quart:   cubic-bezier(0.25, 1, 0.50, 1);
  --ease-emphasized:  cubic-bezier(0.20, 0.00, 0.00, 1.00);
  --ease-in-out-soft: cubic-bezier(0.65, 0.05, 0.36, 1);
  --ease-overshoot:   cubic-bezier(0.34, 1.56, 0.64, 1);

  --dur-instant: 90ms;
  --dur-micro:  140ms;   /* hover, press, toggle */
  --dur-fast:   220ms;   /* chips, tooltips, icons */
  --dur-base:   320ms;   /* drawers, accordions, sheets */
  --dur-slow:   520ms;   /* page/route morphs */
  --dur-cinema: 900ms;   /* hero reveals, editorial only */

  --stagger-tight: 24ms;
  --stagger-base:  45ms;
  --stagger-loose: 80ms;

  /* z-scale */
  --z-sticky: 20; --z-nav: 40; --z-drawer: 60;
  --z-sheet: 70; --z-toast: 90; --z-cursor: 100;
}

/* Grain -- the single texture that makes it feel expensive */
@layer base {
  body::after {
    content: ""; position: fixed; inset: 0; pointer-events: none;
    z-index: 1; opacity: 0.028; mix-blend-mode: multiply;
    background-image: url("/noise.png"); background-size: 180px;
  }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 1ms !important;
      transition-duration: 1ms !important;
      scroll-behavior: auto !important;
    }
  }
}
```

---

## Rendering Strategy (Performance Moat)

| Route | Strategy |
|---|---|
| `/` home | RSC + PPR: static editorial shell, streamed personalized rails |
| `/[gender]/[category]` PLP | RSC, ISR 60s, facets from Typesense at edge; client-side filter mutations via nuqs URL state |
| `/p/[slug]` PDP | RSC static-ish (ISR 300s) + streamed inventory/price/reviews islands |
| `/bag`, `/checkout` | Fully dynamic, no-store, Server Actions |
| `/orders/*` | Dynamic, auth-gated |
| `search` | Edge route handler -> Typesense, stale-while-revalidate |
