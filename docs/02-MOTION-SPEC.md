# LOOM — Motion Specification

---

## The Three Laws

### 1. Nothing teleports
Every state change is interpolated or explicitly justified.

### 2. Motion follows intent
Elements enter from the direction of the user's action (bag drawer from the bag icon's side; filter sheet from the filter button).

### 3. Speed scales inversely with size
A 24px icon: 140ms. A full-screen sheet: 320-420ms. Never the reverse.

---

## Spring Presets (Motion / framer-motion v11)

> Source of truth: `packages/motion/src/springs.ts`

```typescript
// packages/motion/src/springs.ts
export const spring = {
  /** buttons, icons, chips -- snappy, no wobble */
  snap:    { type: "spring", stiffness: 520, damping: 34, mass: 0.7 },
  /** drawers, sheets, layout shifts */
  smooth:  { type: "spring", stiffness: 260, damping: 30, mass: 1 },
  /** shared-element morphs between routes */
  morph:   { type: "spring", stiffness: 190, damping: 26, mass: 1.1 },
  /** playful: hearts, badges, counters */
  bouncy:  { type: "spring", stiffness: 420, damping: 15, mass: 0.8 },
  /** drag release */
  release: { type: "spring", stiffness: 340, damping: 38, mass: 0.9 },
} as const;

export const tween = {
  micro:  { duration: 0.14, ease: [0.16, 1, 0.30, 1] },
  fast:   { duration: 0.22, ease: [0.16, 1, 0.30, 1] },
  base:   { duration: 0.32, ease: [0.20, 0, 0, 1] },
  slow:   { duration: 0.52, ease: [0.16, 1, 0.30, 1] },
  cinema: { duration: 0.90, ease: [0.16, 1, 0.30, 1] },
} as const;
```

---

## CSS Motion Tokens

> Source of truth: `packages/ui/src/styles/tokens.css` `@theme` block

```css
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
```

---

## Animation Property Rules

Only animate these properties:
- `transform` (translate, scale, rotate)
- `opacity`
- `clip-path`
- `filter`

**Never** animate: `width`, `height`, `top`, `left`, `margin`, `padding`.
Use `layout` / `layoutId` from Motion for size changes.

Use `will-change` surgically and remove it on completion.

---

## Reduced-Motion Contract (NON-NEGOTIABLE)

Every motion primitive reads `useReducedMotion()` and degrades to:
- **Opacity-only crossfade at 120ms**
- Scroll-scrub effects become **static end-states**

This is in every ticket's Definition of Done. No exceptions.

```typescript
// Pattern for every motion component
const reduce = useReducedMotion();

const variants = reduce
  ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.12 } } }
  : {
      hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
      show: {
        opacity: 1, y: 0, filter: "blur(0px)",
        transition: { ...spring.smooth, delay },
      },
    };
```

---

## Duration Guidelines

| Element | Duration | Easing |
|---|---|---|
| Icon state change | `--dur-micro` (140ms) | `--ease-out-expo` |
| Chip / tooltip | `--dur-fast` (220ms) | `--ease-out-expo` |
| Drawer / accordion / sheet | `--dur-base` (320ms) | `spring.smooth` |
| Page / route morph | `--dur-slow` (520ms) | `--ease-out-expo` |
| Hero editorial reveal | `--dur-cinema` (900ms) | `--ease-out-expo` |

---

## Stagger Guidelines

| Context | Delay | Token |
|---|---|---|
| Tight: icon sequences, digit roll | 24ms | `--stagger-tight` |
| Base: list items, cards, nav links | 45ms | `--stagger-base` |
| Loose: section reveals, editorial blocks | 80ms | `--stagger-loose` |
