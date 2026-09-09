import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default async function OrderConfirmedPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 py-16 text-center">
      {/* Success icon with animated check */}
      <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-success/10">
        <CheckCircle2 className="size-10 text-success" strokeWidth={1.5} />
      </div>

      <h1 className="mb-2 font-display text-[length:var(--text-display)] tracking-[var(--tracking-hero)] text-ink">
        Order Confirmed
      </h1>

      <p className="mb-6 font-sans text-[length:var(--text-lead)] text-ink-muted">
        Thank you for shopping with Harty
      </p>

      <div className="mb-8 rounded-[var(--radius-sm)] border border-hairline bg-paper-sunk px-8 py-4">
        <p className="font-sans text-[length:var(--text-micro)] font-semibold uppercase tracking-[var(--tracking-caps)] text-ink-muted">
          Order ID
        </p>
        <p className="font-mono text-[length:var(--text-title)] font-semibold text-ink">
          Harty-{id.slice(0, 5).toUpperCase()}
        </p>
      </div>

      <div className="mb-10 max-w-md space-y-3 font-sans text-[length:var(--text-body)] text-ink-muted">
        <p>
          We&apos;ve sent a confirmation email with your order details. You can
          track your order status from your account.
        </p>
        <p className="flex items-center justify-center gap-2">
          <span className="size-2 rounded-full bg-success animate-pulse" />
          Estimated delivery: 5–7 business days
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href={`/account/orders/${id}`}
          className="inline-flex h-12 items-center justify-center rounded-[var(--radius-sm)] bg-ink px-7 font-sans text-[length:var(--text-body)] font-medium text-paper transition-opacity duration-[var(--dur-micro)] hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        >
          Track Order
        </Link>
        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center rounded-[var(--radius-sm)] border border-hairline px-7 font-sans text-[length:var(--text-body)] font-medium text-ink transition-colors duration-[var(--dur-micro)] hover:border-ink/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
