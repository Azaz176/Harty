"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, Heart, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { trpc } from "@/lib/trpc/client";
import { formatMoney } from "@/lib/format-money";

function QtyControl({
  qty,
  onUpdate,
}: {
  qty: number;
  onUpdate: (newQty: number) => void;
}) {
  return (
    <div className="inline-flex items-center border border-hairline rounded-[var(--radius-sm)]">
      <button
        type="button"
        onClick={() => onUpdate(Math.max(1, qty - 1))}
        className="flex size-9 items-center justify-center text-ink-muted transition-colors duration-[var(--dur-micro)] hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-volt"
        aria-label="Decrease quantity"
      >
        <Minus className="size-4" strokeWidth={1.5} />
      </button>
      <span className="w-10 text-center font-sans text-[length:var(--text-body)] font-medium text-ink">
        {qty}
      </span>
      <button
        type="button"
        onClick={() => onUpdate(qty + 1)}
        className="flex size-9 items-center justify-center text-ink-muted transition-colors duration-[var(--dur-micro)] hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-volt"
        aria-label="Increase quantity"
      >
        <Plus className="size-4" strokeWidth={1.5} />
      </button>
    </div>
  );
}

function EmptyBag() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-24 text-center">
      <div className="flex size-28 items-center justify-center rounded-full bg-paper-sunk">
        <ShoppingBag className="size-12 text-ink-faint" strokeWidth={1} />
      </div>
      <div>
        <h2 className="font-display text-[length:var(--text-display)] text-ink mb-3">
          Your bag is waiting
        </h2>
        <p className="max-w-sm mx-auto font-sans text-[length:var(--text-lead)] text-ink-muted">
          It appears your shopping bag is empty. Discover pieces that speak to your style.
        </p>
      </div>
      <div className="flex gap-4">
        <Link
          href="/women"
          className="inline-flex h-11 items-center justify-center rounded-[var(--radius-sm)] bg-ink px-8 font-sans text-[length:var(--text-body)] font-medium text-paper transition-opacity duration-[var(--dur-micro)] hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt"
        >
          Explore Women
        </Link>
        <Link
          href="/men"
          className="inline-flex h-11 items-center justify-center rounded-[var(--radius-sm)] border border-hairline bg-transparent px-8 font-sans text-[length:var(--text-body)] font-medium text-ink transition-colors duration-[var(--dur-micro)] hover:bg-paper-sunk focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt"
        >
          Explore Men
        </Link>
      </div>
    </div>
  );
}

function BagSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div className="mb-10 h-10 w-48 bg-paper-sunk rounded-[var(--radius-sm)] animate-[shimmer_1.5s_infinite]" />
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex gap-4 border-b border-hairline pb-6">
              <div className="size-28 bg-paper-sunk rounded-[var(--radius-sm)] animate-[shimmer_1.5s_infinite]" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-20 bg-paper-sunk rounded-[var(--radius-sm)] animate-[shimmer_1.5s_infinite]" />
                <div className="h-4 w-48 bg-paper-sunk rounded-[var(--radius-sm)] animate-[shimmer_1.5s_infinite]" />
                <div className="h-3 w-24 bg-paper-sunk rounded-[var(--radius-sm)] animate-[shimmer_1.5s_infinite]" />
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-4">
          <div className="h-64 bg-paper-sunk rounded-[var(--radius-sm)] animate-[shimmer_1.5s_infinite]" />
        </div>
      </div>
    </div>
  );
}

export default function BagPage() {
  const { cartId, setItemCount } = useCartStore();
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");

  const cart = trpc.cart.get.useQuery(
    { cartId },
    { enabled: !!cartId },
  );

  const updateQty = trpc.cart.updateQty.useMutation({
    onSuccess: () => cart.refetch(),
  });

  const removeItem = trpc.cart.removeItem.useMutation({
    onSuccess: () => cart.refetch(),
  });

  const applyCoupon = trpc.cart.applyCoupon.useMutation({
    onSuccess: () => {
      cart.refetch();
      setCouponInput("");
      setCouponError("");
    },
    onError: (err) => setCouponError(err.message),
  });

  const removeCoupon = trpc.cart.removeCoupon.useMutation({
    onSuccess: () => cart.refetch(),
  });

  useEffect(() => {
    if (cart.data) {
      setItemCount(cart.data.summary.itemCount);
    }
  }, [cart.data, setItemCount]);

  if (cart.isLoading) return <BagSkeleton />;

  const items = cart.data?.items ?? [];
  const summary = cart.data?.summary;
  const hasCoupon = !!cart.data?.appliedCouponCode;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <h1 className="font-display text-[length:var(--text-display)] tracking-[var(--tracking-hero)] text-ink mb-4">
          Your Bag
        </h1>
        <EmptyBag />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <h1 className="font-display text-[length:var(--text-display)] tracking-[var(--tracking-hero)] text-ink mb-10">
        Your Bag
      </h1>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Items */}
        <div className="lg:col-span-8">
          <ul className="divide-y divide-hairline">
            {items.map((item) => (
              <li key={item.id} className="flex gap-5 py-6">
                {/* Image */}
                <Link
                  href={`/p/${item.slug}`}
                  className="relative size-28 shrink-0 bg-paper-sunk overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt"
                >
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  ) : (
                    <div className="size-full bg-paper-sunk" />
                  )}
                </Link>

                {/* Details */}
                <div className="flex flex-1 flex-col min-w-0">
                  <p className="font-sans text-[length:var(--text-micro)] font-medium uppercase tracking-[var(--tracking-caps)] text-ink-muted">
                    {item.brand}
                  </p>
                  <Link
                    href={`/p/${item.slug}`}
                    className="font-sans text-[length:var(--text-body)] text-ink hover:underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt"
                  >
                    {item.title}
                  </Link>
                  <p className="font-sans text-[length:var(--text-meta)] text-ink-muted mt-0.5">
                    {item.colorName} · Size {item.size}
                  </p>

                  <div className="mt-auto flex flex-wrap items-center gap-4 pt-3">
                    <QtyControl
                      qty={item.qty}
                      onUpdate={(q) =>
                        updateQty.mutate({ cartId, itemId: item.id, qty: q })
                      }
                    />

                    <button
                      type="button"
                      onClick={() => removeItem.mutate({ cartId, itemId: item.id })}
                      className="inline-flex items-center gap-1.5 font-sans text-[length:var(--text-meta)] text-ink-muted transition-colors duration-[var(--dur-micro)] hover:text-sale focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt"
                      aria-label={`Remove ${item.title}`}
                    >
                      <Trash2 className="size-3.5" strokeWidth={1.5} />
                      Remove
                    </button>

                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 font-sans text-[length:var(--text-meta)] text-ink-muted transition-colors duration-[var(--dur-micro)] hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt"
                    >
                      <Heart className="size-3.5" strokeWidth={1.5} />
                      Move to Wishlist
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="shrink-0 text-right">
                  <span className="font-sans text-[length:var(--text-body)] font-semibold text-ink">
                    {formatMoney(item.priceSnapshot * item.qty)}
                  </span>
                  {item.mrp > item.price && (
                    <>
                      <br />
                      <span className="font-sans text-[length:var(--text-micro)] text-ink-faint line-through">
                        {formatMoney(item.mrp * item.qty)}
                      </span>
                      <span className="ml-1 font-sans text-[length:var(--text-micro)] font-medium text-sale">
                        {Math.round(((item.mrp - item.price) / item.mrp) * 100)}% OFF
                      </span>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-24">
            <h2 className="font-sans text-[length:var(--text-lead)] font-semibold text-ink mb-6">
              Order Summary
            </h2>

            {/* Coupon */}
            <div className="mb-6">
              {hasCoupon ? (
                <div className="flex items-center justify-between rounded-[var(--radius-sm)] border border-success/30 bg-success/5 px-4 py-2.5">
                  <span className="font-sans text-[length:var(--text-meta)] font-medium text-success">
                    {cart.data?.appliedCouponCode} applied
                  </span>
                  <button
                    type="button"
                    onClick={() => removeCoupon.mutate({ cartId })}
                    className="font-sans text-[length:var(--text-meta)] text-ink-muted underline underline-offset-2 transition-colors duration-[var(--dur-micro)] hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (couponInput.trim()) {
                      applyCoupon.mutate({ cartId, code: couponInput.trim() });
                    }
                  }}
                  className="flex gap-2"
                >
                  <input
                    value={couponInput}
                    onChange={(e) => {
                      setCouponInput(e.target.value);
                      setCouponError("");
                    }}
                    placeholder="Enter coupon code"
                    className="flex-1 rounded-[var(--radius-sm)] border border-hairline bg-paper-sunk px-3 py-2 font-sans text-[length:var(--text-body)] text-ink placeholder:text-ink-faint outline-none transition-[border-color,box-shadow] duration-[var(--dur-micro)] focus:border-volt focus:ring-2 focus:ring-volt/20"
                  />
                  <button
                    type="submit"
                    className="rounded-[var(--radius-sm)] border border-hairline px-5 py-2 font-sans text-[length:var(--text-body)] font-medium text-ink transition-colors duration-[var(--dur-micro)] hover:bg-paper-sunk focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && (
                <p className="mt-1.5 font-sans text-[length:var(--text-micro)] text-sale">
                  {couponError}
                </p>
              )}
            </div>

            {/* Totals */}
            {summary && (
              <div className="space-y-3 border-t border-hairline pt-4">
                <div className="flex justify-between font-sans text-[length:var(--text-body)] text-ink-muted">
                  <span>Subtotal ({summary.itemCount} items)</span>
                  <span className="text-ink">{formatMoney(summary.subtotal)}</span>
                </div>
                {summary.discount > 0 && (
                  <div className="flex justify-between font-sans text-[length:var(--text-body)] text-sale">
                    <span>Discount</span>
                    <span>−{formatMoney(summary.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between font-sans text-[length:var(--text-body)] text-ink-muted">
                  <span>Shipping</span>
                  <span className="text-ink">
                    {summary.shipping === 0 ? (
                      <span className="text-success font-medium">Free</span>
                    ) : (
                      formatMoney(summary.shipping)
                    )}
                  </span>
                </div>
                <div className="flex justify-between border-t border-hairline pt-3 font-sans text-[length:var(--text-title)] font-semibold text-ink">
                  <span>Total</span>
                  <span>{formatMoney(summary.total)}</span>
                </div>

                <Link
                  href="/checkout"
                  className="mt-4 flex h-12 w-full items-center justify-center rounded-[var(--radius-sm)] bg-volt font-sans text-[length:var(--text-body)] font-semibold text-volt-ink transition-opacity duration-[var(--dur-micro)] hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt active:scale-[0.97]"
                >
                  Proceed to Checkout
                </Link>

                <p className="text-center font-sans text-[length:var(--text-micro)] text-ink-faint pt-2">
                  Taxes calculated at checkout · Free returns within 15 days
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
