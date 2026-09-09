// packages/motion/src/springs.ts

export const spring = {
  /** buttons, icons, chips — snappy, no wobble */
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
