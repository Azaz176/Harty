"use client";

import { useState } from "react";
import { CreditCard, Smartphone, Banknote } from "lucide-react";

type PaymentMethod = "card" | "upi" | "cod";

const METHODS: Array<{
  id: PaymentMethod;
  label: string;
  description: string;
  icon: typeof CreditCard;
}> = [
  {
    id: "card",
    label: "Credit / Debit Card",
    description: "Visa, Mastercard, RuPay",
    icon: CreditCard,
  },
  {
    id: "upi",
    label: "UPI",
    description: "Google Pay, PhonePe, Paytm",
    icon: Smartphone,
  },
  {
    id: "cod",
    label: "Cash on Delivery",
    description: "Pay when your order arrives",
    icon: Banknote,
  },
];

function formatPrice(paise: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(paise / 100);
}

export function PaymentStep({
  total,
  onComplete,
  onBack,
  defaultMethod,
}: {
  total: number;
  onComplete: (method: PaymentMethod) => void;
  onBack?: () => void;
  defaultMethod?: PaymentMethod;
}) {
  const [selected, setSelected] = useState<PaymentMethod | null>(
    defaultMethod ?? null
  );
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [upiId, setUpiId] = useState("");

  const canProceed =
    selected === "cod" ||
    (selected === "upi" && upiId.includes("@")) ||
    (selected === "card" && cardNumber.length >= 16 && cardExpiry.length >= 4 && cardCvv.length >= 3);

  const inputClass =
    "w-full h-10 px-4 font-sans text-[length:var(--text-body)] text-ink bg-paper-sunk border border-hairline rounded-[var(--radius-sm)] placeholder:text-ink-faint transition-[border-color,box-shadow] duration-[var(--dur-micro)] ease-[var(--ease-out-expo)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt focus-visible:ring-offset-2 focus-visible:ring-offset-paper";

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {METHODS.map((method) => {
          const Icon = method.icon;
          const isSelected = selected === method.id;

          return (
            <div key={method.id}>
              <button
                type="button"
                onClick={() => setSelected(method.id)}
                className={[
                  "flex w-full items-center gap-4 rounded-[var(--radius-sm)] border p-4 text-left transition-colors duration-[var(--dur-micro)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
                  isSelected ? "border-volt bg-paper-raised" : "border-hairline hover:border-ink/20",
                ].join(" ")}
                aria-pressed={isSelected}
              >
                <span
                  className={[
                    "flex size-10 shrink-0 items-center justify-center rounded-full",
                    isSelected ? "bg-volt text-volt-ink" : "bg-paper-sunk text-ink-muted",
                  ].join(" ")}
                >
                  <Icon className="size-5" strokeWidth={1.5} />
                </span>
                <div className="flex-1">
                  <span className="block font-sans text-[length:var(--text-body)] font-medium text-ink">
                    {method.label}
                  </span>
                  <span className="block font-sans text-[length:var(--text-micro)] text-ink-muted">
                    {method.description}
                  </span>
                </div>
                <span
                  className={[
                    "size-5 shrink-0 rounded-full border-2 transition-colors duration-[var(--dur-micro)]",
                    isSelected
                      ? "border-volt bg-volt"
                      : "border-ink-faint",
                  ].join(" ")}
                >
                  {isSelected && (
                    <svg viewBox="0 0 20 20" className="size-full text-volt-ink">
                      <circle cx="10" cy="10" r="4" fill="currentColor" />
                    </svg>
                  )}
                </span>
              </button>

              {isSelected && method.id === "card" && (
                <div className="mt-3 ml-14 space-y-3">
                  <div>
                    <label className="block font-sans text-[length:var(--text-micro)] text-ink-muted mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="4111 1111 1111 1111"
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) =>
                        setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))
                      }
                      className={inputClass}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-sans text-[length:var(--text-micro)] text-ink-muted mb-1">
                        Expiry (MM/YY)
                      </label>
                      <input
                        type="text"
                        placeholder="12/28"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value.replace(/[^\d/]/g, "").slice(0, 5))}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-[length:var(--text-micro)] text-ink-muted mb-1">
                        CVV
                      </label>
                      <input
                        type="password"
                        placeholder="***"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>
              )}

              {isSelected && method.id === "upi" && (
                <div className="mt-3 ml-14">
                  <label className="block font-sans text-[length:var(--text-micro)] text-ink-muted mb-1">
                    UPI ID
                  </label>
                  <input
                    type="text"
                    placeholder="yourname@upi"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className={inputClass}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button
        type="button"
        disabled={!canProceed}
        onClick={() => selected && onComplete(selected)}
        className="mt-4 inline-flex h-10 items-center justify-center gap-2 rounded-[var(--radius-md)] bg-ink px-6 font-sans text-[length:var(--text-body)] font-medium text-paper transition-opacity duration-[var(--dur-micro)] hover:bg-ink/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:opacity-40 active:scale-[0.97]"
      >
        {selected === "cod"
          ? "Place Order"
          : `Pay ${formatPrice(total)}`}
      </button>
    </div>
  );
}
