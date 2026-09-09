import { cva, type VariantProps } from "class-variance-authority";
import { type ComponentPropsWithoutRef, type ElementType, forwardRef } from "react";
import { cn } from "./lib/cn";

const textVariants = cva("", {
  variants: {
    variant: {
      hero: "font-display text-[length:var(--text-hero)] leading-[0.9] tracking-[var(--tracking-hero)]",
      display:
        "font-display text-[length:var(--text-display)] leading-[1.05] tracking-[var(--tracking-hero)]",
      title: "font-sans text-[length:var(--text-title)] leading-[1.15]",
      lead: "font-sans text-[length:var(--text-lead)] leading-[1.5]",
      body: "font-sans text-[length:var(--text-body)] leading-[1.6]",
      meta: "font-sans text-[length:var(--text-meta)] leading-[1.5]",
      micro: "font-sans text-[length:var(--text-micro)] leading-[1.4]",
    },
    weight: {
      regular: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    tracking: {
      default: "",
      hero: "tracking-[var(--tracking-hero)]",
      caps: "uppercase tracking-[var(--tracking-caps)]",
    },
    color: {
      ink: "text-ink",
      "ink-muted": "text-ink-muted",
      "ink-faint": "text-ink-faint",
      volt: "text-volt",
      sale: "text-sale",
    },
    balance: {
      true: "[text-wrap:balance]",
      false: "",
    },
  },
  defaultVariants: {
    variant: "body",
    weight: "regular",
    tracking: "default",
    color: "ink",
    balance: false,
  },
});

type TextVariantProps = VariantProps<typeof textVariants>;

const DEFAULT_TAG_MAP: Record<NonNullable<TextVariantProps["variant"]>, ElementType> = {
  hero: "h1",
  display: "h2",
  title: "h3",
  lead: "p",
  body: "p",
  meta: "span",
  micro: "span",
};

type TextProps<T extends ElementType = "p"> = {
  as?: T;
} & TextVariantProps &
  Omit<ComponentPropsWithoutRef<T>, "color">;

function TextInner<T extends ElementType = "p">(
  { as, variant, weight, tracking, color, balance, className, ...props }: TextProps<T>,
  ref: React.ForwardedRef<Element>,
) {
  const Tag = as ?? DEFAULT_TAG_MAP[variant ?? "body"];
  return (
    <Tag
      ref={ref}
      className={cn(textVariants({ variant, weight, tracking, color, balance }), className)}
      {...props}
    />
  );
}

export const Text = forwardRef(TextInner) as <T extends ElementType = "p">(
  props: TextProps<T> & { ref?: React.ForwardedRef<Element> },
) => React.ReactElement | null;
