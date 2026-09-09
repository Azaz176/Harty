"use client";

import { Check } from "lucide-react";

export type Step = "address" | "payment" | "review";

const STEPS: Array<{ id: Step; label: string; number: number }> = [
  { id: "address", label: "Address", number: 1 },
  { id: "payment", label: "Payment", number: 2 },
  { id: "review", label: "Review", number: 3 },
];

function StepCheck() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2.5}>
      <path
        d="M5 13l4 4L19 7"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: 24,
          strokeDashoffset: 0,
        }}
      />
    </svg>
  );
}

export function CheckoutStepper({
  currentStep,
  completedSteps,
  onStepClick,
}: {
  currentStep: Step;
  completedSteps: Record<string, boolean>;
  onStepClick: (step: Step) => void;
}) {
  return (
    <nav aria-label="Checkout steps" className="mb-8">
      <ol className="flex items-center gap-0">
        {STEPS.map((step, idx) => {
          const isActive = step.id === currentStep;
          const isCompleted = completedSteps[step.id] ?? false;
          const isPast = isCompleted && !isActive;
          const isFuture = !isActive && !isCompleted;

          return (
            <li key={step.id} className="flex items-center flex-1 last:flex-initial">
              <button
                type="button"
                onClick={() => (isCompleted || isActive) && onStepClick(step.id)}
                disabled={isFuture}
                className={[
                  "flex items-center gap-3 rounded-[var(--radius-sm)] px-3 py-2 transition-colors duration-[var(--dur-micro)]",
                  isActive ? "text-ink" : "",
                  isPast ? "text-ink cursor-pointer hover:bg-paper-sunk" : "",
                  isFuture ? "text-ink-faint cursor-not-allowed" : "",
                ].join(" ")}
                aria-current={isActive ? "step" : undefined}
              >
                <span
                  className={[
                    "flex size-7 shrink-0 items-center justify-center rounded-full text-[length:var(--text-micro)] font-semibold transition-colors duration-[var(--dur-micro)]",
                    isActive ? "bg-ink text-paper" : "",
                    isPast ? "bg-volt text-volt-ink" : "",
                    isFuture ? "border border-hairline text-ink-faint" : "",
                  ].join(" ")}
                >
                  {isPast ? <StepCheck /> : step.number}
                </span>
                <span className="font-sans text-[length:var(--text-meta)] font-medium uppercase tracking-[var(--tracking-caps)]">
                  {step.label}
                </span>
              </button>
              {idx < STEPS.length - 1 && (
                <div
                  className={[
                    "mx-2 h-px flex-1 transition-colors duration-[var(--dur-micro)]",
                    isCompleted ? "bg-volt" : "bg-hairline",
                  ].join(" ")}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
