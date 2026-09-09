"use client";

import { Button } from "@harty/ui";

export default function ProductError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display text-[length:var(--text-display)] tracking-[var(--tracking-hero)] text-ink mb-4">
        Something went wrong
      </h1>
      <p className="font-sans text-[length:var(--text-lead)] text-ink-muted mb-8">
        We couldn&apos;t load this product. This might be a temporary issue.
      </p>
      <Button variant="primary" size="lg" onClick={reset}>
        Try Again
      </Button>
    </main>
  );
}
