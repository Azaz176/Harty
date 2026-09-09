/** Branded type for money in minor units (paise/cents). */
export type Paise = number & { readonly __brand: "paise" };

export function paise(value: number): Paise {
  if (!Number.isInteger(value)) {
    throw new Error(`Money must be integer minor units, got ${value}`);
  }
  return value as Paise;
}

export function fromMajor(rupees: number): Paise {
  return paise(Math.round(rupees * 100));
}

export function toMajor(p: Paise): number {
  return p / 100;
}

export function formatMoney(
  p: Paise,
  options: { currency?: string; locale?: string } = {}
): string {
  const { currency = "INR", locale = "en-IN" } = options;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(toMajor(p));
}

export function addMoney(...values: Paise[]): Paise {
  return paise(values.reduce((sum, v) => sum + v, 0));
}

export function subtractMoney(a: Paise, b: Paise): Paise {
  return paise(a - b);
}

export function multiplyMoney(p: Paise, qty: number): Paise {
  return paise(Math.round(p * qty));
}

export function percentOf(p: Paise, percent: number): Paise {
  return paise(Math.round((p * percent) / 100));
}

export function clampDiscount(discount: Paise, maxDiscount: Paise | null, subtotal: Paise): Paise {
  let d = discount;
  if (maxDiscount !== null && d > maxDiscount) d = maxDiscount;
  if (d > subtotal) d = subtotal;
  return paise(d);
}
