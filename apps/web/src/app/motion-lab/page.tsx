import type { Metadata } from "next";
import { MotionLabClient } from "./_components/motion-lab-client";

export const metadata: Metadata = {
  title: "Motion Lab — Harty Design System",
  robots: "noindex",
};

const NAV_ITEMS = [
  { id: "typography", label: "Type" },
  { id: "buttons", label: "Buttons" },
  { id: "inputs", label: "Inputs" },
  { id: "chips", label: "Chips" },
  { id: "overlays", label: "Overlays" },
  { id: "tabs-accordion", label: "Tabs" },
  { id: "tooltips", label: "Tooltips" },
  { id: "commerce", label: "Commerce" },
  { id: "motion", label: "Motion" },
  { id: "marquee", label: "Marquee" },
  { id: "skeletons", label: "Skeletons" },
];

export default function MotionLabPage() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      {/* Sticky section nav */}
      <nav className="sticky top-0 z-[var(--z-nav)] border-b border-hairline bg-paper/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-6 py-3">
          <span className="mr-4 shrink-0 font-display text-[length:var(--text-lead)] font-bold tracking-[var(--tracking-hero)]">
            Motion Lab
          </span>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="shrink-0 rounded-[var(--radius-pill)] border border-hairline px-3 py-1 font-sans text-[length:var(--text-micro)] font-medium text-ink-muted transition-colors duration-[var(--dur-micro)] hover:bg-paper-sunk hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <header className="mx-auto max-w-7xl px-6 py-[var(--space-section)]">
        <h1 className="font-display text-[length:var(--text-hero)] leading-[0.9] tracking-[var(--tracking-hero)]">
          Design
          <br />
          System
        </h1>
        <p className="mt-6 max-w-xl font-sans text-[length:var(--text-lead)] text-ink-muted">
          Every primitive, every motion token, every interaction pattern — live on one page.
          The foundation that makes Harty not-generic.
        </p>
      </header>

      <div className="border-t border-hairline" />

      <MotionLabClient />
    </main>
  );
}
