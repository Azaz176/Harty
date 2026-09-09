"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/cart-store";
import { trpc } from "@/lib/trpc/client";
import { formatMoney } from "@/lib/format-money";
import { CheckoutStepper } from "./_components/checkout-stepper";
import { AddressStep, type AddressFormData } from "./_components/address-step";
import { PaymentStep } from "./_components/payment-step";
import { Loader2, ShoppingBag } from "lucide-react";
import Link from "next/link";

type CheckoutStep = "address" | "payment" | "review";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartId, setItemCount } = useCartStore();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("address");
  const [address, setAddress] = useState<AddressFormData | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [isPlacing, setIsPlacing] = useState(false);

  const cart = trpc.cart.get.useQuery({ cartId }, { enabled: !!cartId });

  const initCheckout = trpc.checkout.init.useMutation();
  const confirmOrder = trpc.checkout.confirm.useMutation();

  const items = cart.data?.items ?? [];
  const summary = cart.data?.summary;
  const isEmpty = items.length === 0;

  const handleAddressComplete = (addr: AddressFormData) => {
    setAddress(addr);
    setCurrentStep("payment");
  };

  const handlePaymentComplete = (method: string) => {
    setPaymentMethod(method);
    setCurrentStep("review");
  };

  const handlePlaceOrder = async () => {
    if (!address || !paymentMethod || !summary) return;

    setIsPlacing(true);
    try {
      const init = await initCheckout.mutateAsync({ cartId });
      const result = await confirmOrder.mutateAsync({
        reservationId: init.reservationId,
        paymentId: "mock-payment-id",
      });
      setItemCount(0);
      router.push(`/order/${result.orderId}/confirmed`);
    } catch (error) {
      console.error("Order placement failed:", error);
      setIsPlacing(false);
    }
  };

  if (cart.isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="size-6 animate-spin text-ink-muted" />
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
        <div className="flex size-20 items-center justify-center rounded-full bg-paper-sunk">
          <ShoppingBag className="size-8 text-ink-faint" strokeWidth={1} />
        </div>
        <div>
          <p className="font-display text-[length:var(--text-title)] text-ink mb-2">
            Your bag is empty
          </p>
          <p className="font-sans text-[length:var(--text-body)] text-ink-muted">
            Add some items before checking out
          </p>
        </div>
        <Link
          href="/women"
          className="inline-flex h-10 items-center justify-center rounded-[var(--radius-sm)] bg-ink px-6 font-sans text-[length:var(--text-body)] font-medium text-paper transition-opacity duration-[var(--dur-micro)] hover:opacity-90"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8 lg:py-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Steps */}
        <div className="lg:col-span-7">
          <CheckoutStepper
            currentStep={currentStep}
            completedSteps={{
              address: !!address,
              payment: !!paymentMethod,
            }}
            onStepClick={(step) => {
              if (step === "address" || (step === "payment" && address)) {
                setCurrentStep(step);
              }
            }}
          />

          <div className="mt-8">
            {currentStep === "address" && (
              <AddressStep
                onComplete={handleAddressComplete}
                defaultValues={address ?? undefined}
              />
            )}

            {currentStep === "payment" && (
              <PaymentStep
                onComplete={handlePaymentComplete}
                onBack={() => setCurrentStep("address")}
                total={summary?.total ?? 0}
              />
            )}

            {currentStep === "review" && (
              <div className="space-y-6">
                <h2 className="font-display text-[length:var(--text-title)] text-ink">
                  Review Your Order
                </h2>

                {/* Address summary */}
                <div className="rounded-[var(--radius-sm)] border border-hairline p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-sans text-[length:var(--text-meta)] font-semibold uppercase tracking-[var(--tracking-caps)] text-ink-muted">
                      Delivery Address
                    </span>
                    <button
                      type="button"
                      onClick={() => setCurrentStep("address")}
                      className="font-sans text-[length:var(--text-meta)] text-ink-muted underline underline-offset-2 hover:text-ink"
                    >
                      Edit
                    </button>
                  </div>
                  {address && (
                    <p className="font-sans text-[length:var(--text-body)] text-ink">
                      {address.name}<br />
                      {address.line1}{address.line2 ? `, ${address.line2}` : ""}<br />
                      {address.city}, {address.state} — {address.pincode}
                    </p>
                  )}
                </div>

                {/* Payment summary */}
                <div className="rounded-[var(--radius-sm)] border border-hairline p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-sans text-[length:var(--text-meta)] font-semibold uppercase tracking-[var(--tracking-caps)] text-ink-muted">
                      Payment Method
                    </span>
                    <button
                      type="button"
                      onClick={() => setCurrentStep("payment")}
                      className="font-sans text-[length:var(--text-meta)] text-ink-muted underline underline-offset-2 hover:text-ink"
                    >
                      Edit
                    </button>
                  </div>
                  <p className="font-sans text-[length:var(--text-body)] text-ink capitalize">
                    {paymentMethod === "cod" ? "Cash on Delivery" : paymentMethod}
                  </p>
                </div>

                {/* Items */}
                <div className="rounded-[var(--radius-sm)] border border-hairline p-4">
                  <span className="font-sans text-[length:var(--text-meta)] font-semibold uppercase tracking-[var(--tracking-caps)] text-ink-muted">
                    Items ({summary?.itemCount})
                  </span>
                  <ul className="mt-3 divide-y divide-hairline">
                    {items.map((item) => (
                      <li key={item.id} className="flex gap-3 py-3 first:pt-0 last:pb-0">
                        <div className="size-16 shrink-0 bg-paper-sunk overflow-hidden">
                          {item.imageUrl && (
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="size-full object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-sans text-[length:var(--text-body)] text-ink truncate">
                            {item.title}
                          </p>
                          <p className="font-sans text-[length:var(--text-meta)] text-ink-muted">
                            {item.colorName} · {item.size} · Qty: {item.qty}
                          </p>
                        </div>
                        <span className="font-sans text-[length:var(--text-body)] font-medium text-ink">
                          {formatMoney(item.priceSnapshot * item.qty)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={isPlacing}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-sm)] bg-volt font-sans text-[length:var(--text-body)] font-semibold text-volt-ink transition-opacity duration-[var(--dur-micro)] hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt focus-visible:ring-offset-2 disabled:opacity-50 active:scale-[0.97]"
                >
                  {isPlacing ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Placing Order...
                    </>
                  ) : (
                    `Place Order — ${formatMoney(summary?.total ?? 0)}`
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <aside className="lg:col-span-5">
          <div className="sticky top-24 rounded-[var(--radius-sm)] border border-hairline p-6">
            <h3 className="font-sans text-[length:var(--text-meta)] font-semibold uppercase tracking-[var(--tracking-caps)] text-ink-muted mb-4">
              Order Summary
            </h3>

            <ul className="space-y-3 border-b border-hairline pb-4 mb-4">
              {items.slice(0, 3).map((item) => (
                <li key={item.id} className="flex gap-3">
                  <div className="size-12 shrink-0 bg-paper-sunk overflow-hidden">
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt=""
                        className="size-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-[length:var(--text-meta)] text-ink truncate">
                      {item.title}
                    </p>
                    <p className="font-sans text-[length:var(--text-micro)] text-ink-muted">
                      Qty: {item.qty}
                    </p>
                  </div>
                  <span className="font-sans text-[length:var(--text-meta)] font-medium text-ink">
                    {formatMoney(item.priceSnapshot * item.qty)}
                  </span>
                </li>
              ))}
              {items.length > 3 && (
                <li className="font-sans text-[length:var(--text-meta)] text-ink-muted">
                  + {items.length - 3} more item{items.length - 3 > 1 ? "s" : ""}
                </li>
              )}
            </ul>

            {summary && (
              <div className="space-y-2">
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
                <div className="flex justify-between border-t border-hairline pt-3 font-sans text-[length:var(--text-lead)] font-semibold text-ink">
                  <span>Total</span>
                  <span>{formatMoney(summary.total)}</span>
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
