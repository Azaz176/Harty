import Link from "next/link";
import { Button } from "@harty/ui";

export default function ProductNotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      {/* SI-19: hand-drawn style SVG illustration */}
      <svg
        className="mb-8 size-32 text-ink-faint"
        viewBox="0 0 128 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" />
        <path
          d="M44 52 c0-8 8-16 20-16s20 8 20 16M44 76 c0 8 8 16 20 16s20-8 20-16"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="50" cy="58" r="2" fill="currentColor" />
        <circle cx="78" cy="58" r="2" fill="currentColor" />
        <path
          d="M54 72 c2 4 14 4 16 0"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>

      <h1 className="font-display text-[length:var(--text-display)] tracking-[var(--tracking-hero)] text-ink mb-4">
        Piece not found
      </h1>
      <p className="font-sans text-[length:var(--text-lead)] text-ink-muted mb-8">
        This item may have been removed or the link is incorrect. Our collection refreshes constantly — something better might be waiting.
      </p>
      <Link href="/women">
        <Button variant="primary" size="lg">
          Browse the Collection
        </Button>
      </Link>
    </main>
  );
}
