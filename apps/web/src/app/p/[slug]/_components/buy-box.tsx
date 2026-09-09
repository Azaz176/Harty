"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Heart, Share2, Truck, RotateCcw, Ruler } from "lucide-react";
import {
  PriceTicker,
  SwatchPicker,
  SizePicker,
  Button,
  cn,
} from "@harty/ui";
import {
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@harty/ui";
import { Magnetic } from "@harty/motion";

interface Variant {
  id: string;
  sku: string;
  colorName: string;
  colorHex: string;
  size: string;
  price: number;
  mrp: number;
  inStock: boolean;
}

interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  brand: { slug: string; name: string } | null;
  category: { slug: string; name: string } | null;
  gender: string;
  basePrice: number;
  ratingAvg: number;
  ratingCount: number;
  variants: Variant[];
  inventoryMap: Record<string, boolean>;
  fitStats: {
    trueToSize: number;
    totalResponses: number;
    runSmall: number;
    runLarge: number;
  };
  attributes: Record<string, string>;
}

export function BuyBox({ product }: { product: Product }) {
  const uniqueColors = [
    ...new Map(
      product.variants.map((v) => [
        v.colorHex,
        { name: v.colorName, hex: v.colorHex, available: true },
      ]),
    ).values(),
  ];

  const [selectedColor, setSelectedColor] = useState(
    uniqueColors[0]?.hex ?? "",
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [addedToBag, setAddedToBag] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const colorVariants = product.variants.filter(
    (v) => v.colorHex === selectedColor,
  );
  const selectedVariant = colorVariants.find(
    (v) => v.size === selectedSize,
  );
  const displayPrice = selectedVariant?.price ?? product.basePrice;
  const displayMrp = selectedVariant?.mrp ?? product.variants[0]?.mrp;

  const sizes = (() => {
    const sizeMap = new Map<string, boolean>();
    for (const v of colorVariants) {
      sizeMap.set(v.size, v.inStock);
    }
    return Array.from(sizeMap.entries()).map(([size, available]) => ({
      label: size,
      value: size,
      available,
    }));
  })();

  const handleAddToBag = useCallback(() => {
    if (!selectedSize) return;
    setAddedToBag(true);
    setTimeout(() => setAddedToBag(false), 2000);
  }, [selectedSize]);

  const handleWishlist = useCallback(() => {
    setWishlisted((prev) => !prev);
  }, []);

  return (
    <div className="space-y-6">
      {/* Brand */}
      {product.brand && (
        <Link
          href={`/brands/${product.brand.slug}`}
          className="inline-block font-sans text-[length:var(--text-meta)] font-medium uppercase tracking-[var(--tracking-caps)] text-ink-muted transition-colors duration-[var(--dur-micro)] hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt"
        >
          {product.brand.name}
        </Link>
      )}

      {/* Title */}
      <h1 className="font-display text-[length:var(--text-title)] tracking-[var(--tracking-hero)] text-ink">
        {product.title}
      </h1>

      {/* Price — SI-20 */}
      <PriceTicker
        value={displayPrice}
        mrp={displayMrp && displayMrp > displayPrice ? displayMrp : undefined}
        className="text-[length:var(--text-lead)]"
      />

      {/* Tax note */}
      <p className="font-sans text-[length:var(--text-micro)] text-ink-faint">
        Inclusive of all taxes
      </p>

      {/* Color swatches */}
      {uniqueColors.length > 1 && (
        <div className="space-y-2">
          <p className="font-sans text-[length:var(--text-meta)] font-medium text-ink">
            Colour:{" "}
            <span className="font-normal text-ink-muted">
              {uniqueColors.find((c) => c.hex === selectedColor)?.name}
            </span>
          </p>
          <SwatchPicker
            swatches={uniqueColors}
            selected={selectedColor}
            onSelect={setSelectedColor}
          />
        </div>
      )}

      {/* Size selector — SI-09 */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="font-sans text-[length:var(--text-meta)] font-medium text-ink">
            Size{selectedSize ? `: ${selectedSize}` : ""}
          </p>
          <button
            type="button"
            className="inline-flex items-center gap-1 font-sans text-[length:var(--text-micro)] font-medium text-ink-muted transition-colors duration-[var(--dur-micro)] hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt"
          >
            <Ruler className="size-3.5" strokeWidth={1.5} />
            Size Guide
          </button>
        </div>
        <SizePicker
          sizes={sizes}
          selected={selectedSize}
          onSelect={setSelectedSize}
          fitStats={{
            label: "Fits true to size",
            percentage: product.fitStats.trueToSize,
            totalBuyers: product.fitStats.totalResponses,
          }}
        />
      </div>

      {/* Actions — SI-04, SI-05, SI-08 */}
      <div className="flex gap-3 pt-2">
        <Magnetic strength={0.15} max={4} className="flex-1">
          <Button
            variant={addedToBag ? "volt" : "primary"}
            size="lg"
            className={cn(
              "w-full transition-colors duration-[var(--dur-fast)]",
              !selectedSize && "opacity-60 cursor-not-allowed",
            )}
            onClick={handleAddToBag}
            disabled={!selectedSize}
            aria-label={
              addedToBag
                ? "Added to bag"
                : selectedSize
                  ? `Add ${product.title} size ${selectedSize} to bag`
                  : "Select a size first"
            }
          >
            {addedToBag ? "Added ✓" : "Add to Bag"}
          </Button>
        </Magnetic>

        <button
          type="button"
          onClick={handleWishlist}
          className={cn(
            "flex size-12 shrink-0 items-center justify-center border border-hairline transition-colors duration-[var(--dur-micro)]",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt",
            wishlisted && "border-transparent bg-sale/10",
          )}
          aria-label={
            wishlisted ? "Remove from wishlist" : "Add to wishlist"
          }
          aria-pressed={wishlisted}
        >
          <Heart
            className={cn(
              "size-5 transition-colors duration-[var(--dur-micro)]",
              wishlisted ? "fill-sale text-sale" : "text-ink",
            )}
            strokeWidth={1.5}
          />
        </button>

        <button
          type="button"
          className="flex size-12 shrink-0 items-center justify-center border border-hairline transition-colors duration-[var(--dur-micro)] hover:bg-paper-sunk focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt"
          aria-label="Share product"
        >
          <Share2 className="size-5 text-ink" strokeWidth={1.5} />
        </button>
      </div>

      {/* Prompt to select size */}
      {!selectedSize && (
        <p
          className="font-sans text-[length:var(--text-meta)] text-sale"
          role="alert"
        >
          Please select a size
        </p>
      )}

      {/* Delivery info */}
      <div className="space-y-3 border-t border-hairline pt-6">
        <div className="flex items-center gap-3">
          <Truck className="size-4 text-ink-muted" strokeWidth={1.5} />
          <p className="font-sans text-[length:var(--text-meta)] text-ink">
            Free delivery on orders above ₹999
          </p>
        </div>
        <div className="flex items-center gap-3">
          <RotateCcw className="size-4 text-ink-muted" strokeWidth={1.5} />
          <p className="font-sans text-[length:var(--text-meta)] text-ink">
            15-day easy returns &amp; exchange
          </p>
        </div>
      </div>

      {/* Product details accordion */}
      <AccordionRoot type="multiple" className="border-t border-hairline">
        <AccordionItem value="description">
          <AccordionTrigger>Product Details</AccordionTrigger>
          <AccordionContent>
            <p>{product.description}</p>
            {Object.entries(product.attributes).length > 0 && (
              <dl className="mt-3 grid grid-cols-2 gap-2">
                {Object.entries(product.attributes).map(([key, value]) => (
                  <div key={key}>
                    <dt className="font-sans text-[length:var(--text-micro)] text-ink-faint capitalize">
                      {key}
                    </dt>
                    <dd className="font-sans text-[length:var(--text-meta)] text-ink">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="care">
          <AccordionTrigger>Material &amp; Care</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-4 space-y-1">
              <li>Machine wash cold with similar colours</li>
              <li>Do not bleach</li>
              <li>Tumble dry low</li>
              <li>Iron on low heat if needed</li>
              <li>Do not dry clean</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="shipping">
          <AccordionTrigger>Shipping &amp; Returns</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-4 space-y-1">
              <li>Standard delivery: 3–5 business days</li>
              <li>Express delivery: 1–2 business days (₹149)</li>
              <li>Free shipping on orders above ₹999</li>
              <li>15-day return policy for unused items with tags</li>
              <li>Exchange available for different size or colour</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </AccordionRoot>
    </div>
  );
}
