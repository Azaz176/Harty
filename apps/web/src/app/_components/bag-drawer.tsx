"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { Sheet } from "@harty/ui";
import { useCartStore } from "@/stores/cart-store";
import { trpc } from "@/lib/trpc/client";
import { formatMoney } from "@/lib/format-money";

const FREE_SHIPPING_THRESHOLD = 99900;

function ShippingProgress({ subtotal }: { subtotal: number }) {
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
  const pct = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const unlocked = remaining <= 0;

  return (
    <div className="px-6 py-3 border-b border-hairline">
      <p className="font-sans text-[length:var(--text-micro)] text-ink-muted mb-1.5">
        {unlocked
          ? "You've unlocked free shipping!"
          : `${formatMoney(remaining)} away from free shipping`}
      </p>
      <div className="h-1 w-full rounded-full bg-paper-sunk overflow-hidden">
        <div
          className="h-full rounded-full bg-volt transition-[width] duration-[var(--dur-base)] ease-[var(--ease-out-expo)]"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

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
        onClick={() => onUpdate(Math.max(0, qty - 1))}
        className="flex size-7 items-center justify-center text-ink-muted transition-colors duration-[var(--dur-micro)] hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-volt"
        aria-label="Decrease quantity"
      >
        <Minus className="size-3" strokeWidth={1.5} />
      </button>
      <span className="w-7 text-center font-sans text-[length:var(--text-meta)] font-medium text-ink">
        {qty}
      </span>
      <button
        type="button"
        onClick={() => onUpdate(qty + 1)}
        className="flex size-7 items-center justify-center text-ink-muted transition-colors duration-[var(--dur-micro)] hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-volt"
        aria-label="Increase quantity"
      >
        <Plus className="size-3" strokeWidth={1.5} />
      </button>
    </div>
  );
}

function EmptyBag({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="flex size-20 items-center justify-center rounded-full bg-paper-sunk">
        <ShoppingBag className="size-8 text-ink-faint" strokeWidth={1} />
      </div>
      <div>
        <p className="font-display text-[length:var(--text-title)] text-ink mb-2">
          Your bag is empty
        </p>
        <p className="font-sans text-[length:var(--text-body)] text-ink-muted">
          Looks like you haven&apos;t added anything yet
        </p>
      </div>
      <Link
        href="/women"
        onClick={onClose}
        className="inline-flex h-10 items-center justify-center rounded-[var(--radius-sm)] bg-ink px-6 font-sans text-[length:var(--text-body)] font-medium text-paper transition-opacity duration-[var(--dur-micro)] hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt"
      >
        Start Shopping
      </Link>
    </div>
  );
}

export function BagDrawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { cartId, setItemCount } = useCartStore();
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");

  const cart = trpc.cart.get.useQuery(
    { cartId },
    { enabled: open && !!cartId },
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

  const items = cart.data?.items ?? [];
  const summary = cart.data?.summary;
  const hasCoupon = !!cart.data?.appliedCouponCode;
  const isEmpty = items.length === 0;

  return (
    <Sheet.Root open={open} onOpenChange={onOpenChange}>
      <Sheet.Content side="right" className="flex flex-col">
        <div className="flex items-center justify-between border-b border-hairline px-6 py-4 pr-14">
          <Sheet.Title>
            Your Bag{summary && summary.itemCount > 0 ? ` (${summary.itemCount})` : ""}
          </Sheet.Title>
          <Sheet.Description className="sr-only">
            Shopping bag contents
          </Sheet.Description>
        </div>

        {isEmpty ? (
          <EmptyBag onClose={() => onOpenChange(false)} />
        ) : (
          <>
            {summary && <ShippingProgress subtotal={summary.subtotal} />}

            {/* Item list */}
            <div className="flex-1 overflow-y-auto">
              <ul className="divide-y divide-hairline">
                {items.map((item, idx) => (
                  <li
                    key={item.id}
                    className="flex gap-3 px-6 py-4"
                    style={{
                      animation: `fade-slide-in var(--dur-base) var(--ease-out-expo) ${idx * 45}ms both`,
                    }}
                  >
                    {/* Image */}
                    <div className="relative size-20 shrink-0 bg-paper-sunk overflow-hidden">
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      ) : (
                        <div className="size-full bg-paper-sunk" />
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex flex-1 flex-col min-w-0">
                      <p className="font-sans text-[length:var(--text-micro)] font-medium uppercase tracking-[var(--tracking-caps)] text-ink-muted">
                        {item.brand}
                      </p>
                      <p className="font-sans text-[length:var(--text-body)] text-ink truncate">
                        {item.title}
                      </p>
                      <p className="font-sans text-[length:var(--text-meta)] text-ink-muted">
                        {item.colorName} · {item.size}
                      </p>

                      <div className="mt-auto flex items-center justify-between pt-2">
                        <QtyControl
                          qty={item.qty}
                          onUpdate={(q) => {
                            if (q === 0) {
                              removeItem.mutate({ cartId, itemId: item.id });
                            } else {
                              updateQty.mutate({ cartId, itemId: item.id, qty: q });
                            }
                          }}
                        />
                        <div className="text-right">
                          <span className="font-sans text-[length:var(--text-body)] font-semibold text-ink">
                            {formatMoney(item.priceSnapshot * item.qty)}
                          </span>
                          {item.mrp > item.price && (
                            <span className="ml-1.5 font-sans text-[length:var(--text-micro)] text-ink-faint line-through">
                              {formatMoney(item.mrp * item.qty)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Remove button */}
                    <button
                      type="button"
                      onClick={() => removeItem.mutate({ cartId, itemId: item.id })}
                      className="mt-0.5 flex size-6 shrink-0 items-center justify-center text-ink-faint transition-colors duration-[var(--dur-micro)] hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt"
                      aria-label={`Remove ${item.title}`}
                    >
                      <X className="size-3.5" strokeWidth={1.5} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coupon */}
            <div className="border-t border-hairline px-6 py-3">
              {hasCoupon ? (
                <div className="flex items-center justify-between">
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
                    placeholder="Coupon code"
                    className="flex-1 rounded-[var(--radius-sm)] border border-hairline bg-paper-sunk px-3 py-1.5 font-sans text-[length:var(--text-meta)] text-ink placeholder:text-ink-faint outline-none transition-[border-color,box-shadow] duration-[var(--dur-micro)] focus:border-volt focus:ring-2 focus:ring-volt/20"
                  />
                  <button
                    type="submit"
                    className="rounded-[var(--radius-sm)] bg-ink px-4 py-1.5 font-sans text-[length:var(--text-meta)] font-medium text-paper transition-opacity duration-[var(--dur-micro)] hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && (
                <p className="mt-1 font-sans text-[length:var(--text-micro)] text-sale">
                  {couponError}
                </p>
              )}
            </div>

            {/* Summary */}
            {summary && (
              <div className="border-t border-hairline px-6 py-4 space-y-2">
                <div className="flex justify-between font-sans text-[length:var(--text-meta)] text-ink-muted">
                  <span>Subtotal</span>
                  <span>{formatMoney(summary.subtotal)}</span>
                </div>
                {summary.discount > 0 && (
                  <div className="flex justify-between font-sans text-[length:var(--text-meta)] text-sale">
                    <span>Discount</span>
                    <span>−{formatMoney(summary.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between font-sans text-[length:var(--text-meta)] text-ink-muted">
                  <span>Shipping</span>
                  <span>
                    {summary.shipping === 0 ? (
                      <span className="text-success">Free</span>
                    ) : (
                      formatMoney(summary.shipping)
                    )}
                  </span>
                </div>
                <div className="flex justify-between border-t border-hairline pt-2 font-sans text-[length:var(--text-lead)] font-semibold text-ink">
                  <span>Total</span>
                  <span>{formatMoney(summary.total)}</span>
                </div>

                <Link
                  href="/checkout"
                  onClick={() => onOpenChange(false)}
                  className="mt-3 flex h-12 w-full items-center justify-center rounded-[var(--radius-sm)] bg-volt font-sans text-[length:var(--text-body)] font-semibold text-volt-ink transition-opacity duration-[var(--dur-micro)] hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt active:scale-[0.97]"
                >
                  Proceed to Checkout
                </Link>
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="w-full text-center font-sans text-[length:var(--text-meta)] text-ink-muted underline underline-offset-2 transition-colors duration-[var(--dur-micro)] hover:text-ink"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </>
        )}
      </Sheet.Content>
    </Sheet.Root>
  );
}
