import type { Metadata } from "next";
import Link from "next/link";
import { Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Checkout — Harty",
  description: "Complete your order securely.",
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-hairline">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 lg:px-8">
          <Link
            href="/"
            className="font-display text-xl tracking-[var(--tracking-hero)]"
          >
            Harty
          </Link>
          <div className="flex items-center gap-2 text-ink-muted">
            <Lock className="size-3.5" strokeWidth={1.5} />
            <span className="font-sans text-[length:var(--text-meta)]">
              Secure Checkout
            </span>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 lg:px-8 lg:py-12">
        {children}
      </main>
    </div>
  );
}
