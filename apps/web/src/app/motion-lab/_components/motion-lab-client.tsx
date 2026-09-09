"use client";

import { useState } from "react";
import {
  Text,
  Button,
  Input,
  Chip,
  Skeleton,
  Toaster,
  toast,
  Sheet,
  Drawer,
  Dialog,
  PriceTicker,
  Rating,
  SwatchPicker,
  SizePicker,
  Marquee,
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
  TooltipArrow,
} from "@harty/ui";
import { Reveal, StaggerGroup, DigitRoll, Magnetic } from "@harty/motion";

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-16 py-[var(--space-section)]">
      <div className="mx-auto max-w-7xl px-6">
        <Text variant="title" weight="semibold" className="mb-10">
          {title}
        </Text>
        {children}
      </div>
      <div className="border-t border-hairline" />
    </section>
  );
}

function TypographySection() {
  return (
    <Section id="typography" title="Typography">
      <div className="space-y-8">
        <div>
          <Text variant="micro" color="ink-faint" tracking="caps" className="mb-2">Hero</Text>
          <Text variant="hero">THE EDIT</Text>
        </div>
        <div>
          <Text variant="micro" color="ink-faint" tracking="caps" className="mb-2">Display</Text>
          <Text variant="display">New Season Arrivals</Text>
        </div>
        <div>
          <Text variant="micro" color="ink-faint" tracking="caps" className="mb-2">Title</Text>
          <Text variant="title">Handpicked by our stylists</Text>
        </div>
        <div>
          <Text variant="micro" color="ink-faint" tracking="caps" className="mb-2">Lead</Text>
          <Text variant="lead" color="ink-muted">
            A curated collection of pieces that define the season — from structured blazers to
            fluid silhouettes that move with you.
          </Text>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <Text variant="micro" color="ink-faint" tracking="caps" className="mb-2">Body</Text>
            <Text variant="body">
              100% organic cotton. Relaxed fit through the body with a clean hem finish.
              Made in Portugal.
            </Text>
          </div>
          <div>
            <Text variant="micro" color="ink-faint" tracking="caps" className="mb-2">Meta</Text>
            <Text variant="meta" color="ink-muted">
              Delivered in 3–5 business days. Free shipping on orders above ₹999.
            </Text>
          </div>
          <div>
            <Text variant="micro" color="ink-faint" tracking="caps" className="mb-2">Micro</Text>
            <Text variant="micro" color="ink-faint">
              SKU: LM-TEE-BLK-042 · Last updated 2 hours ago
            </Text>
          </div>
        </div>
        <div className="flex flex-wrap gap-6">
          <Text variant="body" weight="regular">Regular</Text>
          <Text variant="body" weight="medium">Medium</Text>
          <Text variant="body" weight="semibold">Semibold</Text>
          <Text variant="body" weight="bold">Bold</Text>
        </div>
        <div className="flex flex-wrap gap-6">
          <Text variant="body" color="ink">Ink</Text>
          <Text variant="body" color="ink-muted">Muted</Text>
          <Text variant="body" color="ink-faint">Faint</Text>
          <Text variant="body" color="volt">Volt</Text>
          <Text variant="body" color="sale">Sale</Text>
        </div>
      </div>
    </Section>
  );
}

function ButtonsSection() {
  return (
    <Section id="buttons" title="Buttons">
      <div className="space-y-8">
        {(["primary", "ghost", "link", "volt"] as const).map((variant) => (
          <div key={variant} className="space-y-3">
            <Text variant="meta" color="ink-faint" tracking="caps">{variant}</Text>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant={variant} size="sm">Small</Button>
              <Button variant={variant} size="md">Add to Bag</Button>
              <Button variant={variant} size="lg">Shop the Collection</Button>
              <Button variant={variant} size="md" disabled>Sold Out</Button>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function InputsSection() {
  return (
    <Section id="inputs" title="Inputs & Forms">
      <div className="max-w-md space-y-8">
        <div className="space-y-3">
          <Text variant="meta" color="ink-faint" tracking="caps">Default</Text>
          <Input placeholder="Search for brands, styles, or looks..." />
          <Input inputSize="sm" placeholder="Small input" />
          <Input inputSize="lg" placeholder="Large input" />
        </div>
        <div className="space-y-3">
          <Text variant="meta" color="ink-faint" tracking="caps">Ghost</Text>
          <Input variant="ghost" placeholder="Coupon code" />
        </div>
        <div className="space-y-3">
          <Text variant="meta" color="ink-faint" tracking="caps">Error</Text>
          <Input error placeholder="Invalid pincode" defaultValue="000" />
        </div>
        <div className="space-y-3">
          <Text variant="meta" color="ink-faint" tracking="caps">Select</Text>
          <SelectRoot>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="newest">What&apos;s New</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="discount">Better Discount</SelectItem>
              <SelectItem value="rating">Customer Rating</SelectItem>
            </SelectContent>
          </SelectRoot>
        </div>
      </div>
    </Section>
  );
}

function ChipsSection() {
  const [active, setActive] = useState<string[]>(["Casual"]);
  const [removable, setRemovable] = useState(["Nike", "Size: M", "Under ₹999"]);

  return (
    <Section id="chips" title="Chips & Filters">
      <div className="space-y-8">
        <div className="space-y-3">
          <Text variant="meta" color="ink-faint" tracking="caps">Filter Pills</Text>
          <div className="flex flex-wrap gap-2">
            {["Casual", "Formal", "Streetwear", "Athleisure", "Ethnic"].map((label) => (
              <Chip
                key={label}
                variant={active.includes(label) ? "active" : "default"}
                onClick={() =>
                  setActive((prev) =>
                    prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
                  )
                }
              >
                {label}
              </Chip>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <Text variant="meta" color="ink-faint" tracking="caps">Applied Filters (Removable)</Text>
          <div className="flex flex-wrap gap-2">
            {removable.map((label) => (
              <Chip
                key={label}
                variant="removable"
                onRemove={() => setRemovable((prev) => prev.filter((l) => l !== label))}
              >
                {label}
              </Chip>
            ))}
            {removable.length > 0 && (
              <Button variant="link" size="sm" onClick={() => setRemovable([])}>
                Clear all
              </Button>
            )}
          </div>
        </div>
        <div className="space-y-3">
          <Text variant="meta" color="ink-faint" tracking="caps">Sizes</Text>
          <div className="flex flex-wrap gap-2">
            {["XS", "S", "M", "L", "XL", "XXL"].map((s) => (
              <Chip key={s} size="sm">{s}</Chip>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function OverlaysSection() {
  return (
    <Section id="overlays" title="Overlays">
      <div className="flex flex-wrap gap-4">
        <Sheet.Root>
          <Sheet.Trigger asChild>
            <Button variant="ghost">Open Sheet</Button>
          </Sheet.Trigger>
          <Sheet.Content>
            <div className="p-6">
              <Sheet.Title>Your Bag</Sheet.Title>
              <Sheet.Description>3 items in your bag</Sheet.Description>
              <div className="mt-8 space-y-4">
                {["Cotton Oversized Tee — Black", "Slim Fit Chinos — Khaki", "Canvas Low-top — Off White"].map(
                  (item) => (
                    <div key={item} className="flex items-center justify-between border-b border-hairline pb-4">
                      <Text variant="body">{item}</Text>
                      <Text variant="meta" color="ink-muted">₹1,299</Text>
                    </div>
                  )
                )}
              </div>
              <div className="mt-6 flex justify-between">
                <Text variant="lead" weight="semibold">Total</Text>
                <Text variant="lead" weight="semibold">₹3,897</Text>
              </div>
              <Button variant="volt" size="lg" className="mt-6 w-full">
                Proceed to Checkout
              </Button>
            </div>
          </Sheet.Content>
        </Sheet.Root>

        <Drawer.Root>
          <Drawer.Trigger asChild>
            <Button variant="ghost">Open Drawer</Button>
          </Drawer.Trigger>
          <Drawer.Content>
            <Drawer.Title className="px-4 text-[length:var(--text-lead)] font-semibold">
              Filter by Size
            </Drawer.Title>
            <div className="mt-4 flex flex-wrap gap-2 px-4">
              {["XS", "S", "M", "L", "XL", "XXL", "28", "30", "32", "34", "36"].map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </div>
            <Button variant="primary" size="lg" className="mx-4 mt-6 w-[calc(100%-2rem)]">
              Show 247 results
            </Button>
          </Drawer.Content>
        </Drawer.Root>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button variant="ghost">Open Dialog</Button>
          </Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Title>Remove from Bag?</Dialog.Title>
            <Dialog.Description>
              This will remove the Cotton Oversized Tee from your bag.
              You can always add it back later.
            </Dialog.Description>
            <Dialog.Footer>
              <Dialog.Close asChild>
                <Button variant="ghost">Keep it</Button>
              </Dialog.Close>
              <Dialog.Close asChild>
                <Button variant="primary">Remove</Button>
              </Dialog.Close>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Root>

        <Button variant="ghost" onClick={() => toast.success("Added to your bag", { description: "Cotton Oversized Tee — Black, Size M" })}>
          Toast: Success
        </Button>
        <Button variant="ghost" onClick={() => toast.error("Payment failed", { description: "Your card was declined. Try a different payment method." })}>
          Toast: Error
        </Button>
        <Button variant="ghost" onClick={() => toast("Back in stock", { description: "Nike Air Max 90 is available again in your size." })}>
          Toast: Default
        </Button>
      </div>
    </Section>
  );
}

function TabsAccordionSection() {
  return (
    <Section id="tabs-accordion" title="Tabs & Accordion">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <Text variant="meta" color="ink-faint" tracking="caps" className="mb-4">Tabs</Text>
          <TabsRoot defaultValue="description">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="sizeguide">Size Guide</TabsTrigger>
              <TabsTrigger value="reviews">Reviews (247)</TabsTrigger>
            </TabsList>
            <TabsContent value="description">
              <Text variant="body" color="ink-muted">
                Crafted from 100% organic cotton with a brushed interior for softness.
                The relaxed silhouette falls just below the hip, with ribbed cuffs and
                a clean hemline. Garment-dyed for a lived-in feel from day one.
              </Text>
            </TabsContent>
            <TabsContent value="sizeguide">
              <Text variant="body" color="ink-muted">
                This piece runs true to size. If between sizes, go up for a more
                relaxed fit or down for a closer cut.
              </Text>
            </TabsContent>
            <TabsContent value="reviews">
              <Text variant="body" color="ink-muted">
                4.5 out of 5 based on 247 reviews. 78% of buyers say it fits true to size.
              </Text>
            </TabsContent>
          </TabsRoot>
        </div>

        <div>
          <Text variant="meta" color="ink-faint" tracking="caps" className="mb-4">Accordion</Text>
          <AccordionRoot type="multiple">
            <AccordionItem value="material">
              <AccordionTrigger>Material & Composition</AccordionTrigger>
              <AccordionContent>
                100% organic cotton, 320 GSM. GOTS certified. Pre-shrunk and
                enzyme-washed for a soft hand feel. Origin: Portugal.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="care">
              <AccordionTrigger>Care Instructions</AccordionTrigger>
              <AccordionContent>
                Machine wash cold with like colours. Tumble dry low. Do not bleach.
                Iron on low heat. Do not dry clean.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="shipping">
              <AccordionTrigger>Shipping & Returns</AccordionTrigger>
              <AccordionContent>
                Free standard shipping on orders above ₹999. Express delivery
                available for ₹149. 15-day easy returns — no questions asked.
              </AccordionContent>
            </AccordionItem>
          </AccordionRoot>
        </div>
      </div>
    </Section>
  );
}

function TooltipsSection() {
  return (
    <Section id="tooltips" title="Tooltips">
      <TooltipProvider delayDuration={200}>
        <div className="flex flex-wrap gap-4">
          {(["top", "right", "bottom", "left"] as const).map((side) => (
            <TooltipRoot key={side}>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm">{`Hover — ${side}`}</Button>
              </TooltipTrigger>
              <TooltipContent side={side}>
                Tooltip on the {side}
                <TooltipArrow />
              </TooltipContent>
            </TooltipRoot>
          ))}
        </div>
      </TooltipProvider>
    </Section>
  );
}

function CommerceSection() {
  const [selectedColor, setSelectedColor] = useState("#1a1a1a");
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [ratingValue, setRatingValue] = useState(0);

  const swatches = [
    { name: "Midnight Black", hex: "#1a1a1a", available: true },
    { name: "Stone Wash", hex: "#8B8680", available: true },
    { name: "Ivory", hex: "#F5F0E8", available: true },
    { name: "Olive", hex: "#4A5240", available: true },
    { name: "Burnt Sienna", hex: "#A0522D", available: false },
  ];

  const sizes = [
    { label: "XS", value: "xs", available: true },
    { label: "S", value: "s", available: true },
    { label: "M", value: "m", available: true },
    { label: "L", value: "l", available: true },
    { label: "XL", value: "xl", available: false },
    { label: "XXL", value: "xxl", available: false },
  ];

  return (
    <Section id="commerce" title="Commerce Components">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="space-y-8">
          <div className="space-y-3">
            <Text variant="meta" color="ink-faint" tracking="caps">Price Ticker</Text>
            <div className="space-y-2">
              <PriceTicker value={129900} mrp={249900} />
              <PriceTicker value={89900} />
              <PriceTicker value={299900} mrp={399900} />
            </div>
          </div>

          <div className="space-y-3">
            <Text variant="meta" color="ink-faint" tracking="caps">Rating</Text>
            <div className="space-y-2">
              <Rating value={4.5} count={1204} size="md" />
              <Rating value={3} count={87} size="sm" />
              <Rating value={5} count={2341} size="lg" />
            </div>
          </div>

          <div className="space-y-3">
            <Text variant="meta" color="ink-faint" tracking="caps">Interactive Rating</Text>
            <Rating value={ratingValue} interactive onChange={setRatingValue} size="lg" />
            <Text variant="micro" color="ink-faint">
              {ratingValue > 0 ? `You rated ${ratingValue} star${ratingValue > 1 ? "s" : ""}` : "Click to rate"}
            </Text>
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-3">
            <Text variant="meta" color="ink-faint" tracking="caps">Colour</Text>
            <SwatchPicker
              swatches={swatches}
              selected={selectedColor}
              onSelect={setSelectedColor}
            />
            <Text variant="micro" color="ink-muted">
              {swatches.find((s) => s.hex === selectedColor)?.name ?? ""}
            </Text>
          </div>

          <div className="space-y-3">
            <Text variant="meta" color="ink-faint" tracking="caps">Size — with Fit Confidence (SI-09)</Text>
            <SizePicker
              sizes={sizes}
              selected={selectedSize}
              onSelect={setSelectedSize}
              onNotifyMe={(size: string) => toast(`We'll notify you when ${size.toUpperCase()} is back`)}
              fitStats={{
                label: "Fits true to size",
                percentage: 78,
                totalBuyers: 1204,
              }}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

function MotionSection() {
  const [counter, setCounter] = useState(1299);

  return (
    <Section id="motion" title="Motion Primitives">
      <div className="space-y-12">
        <div className="space-y-3">
          <Text variant="meta" color="ink-faint" tracking="caps">Reveal — directional entrance (SI-16)</Text>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {(["up", "down", "left", "right"] as const).map((dir) => (
              <Reveal key={dir} dir={dir}>
                <div className="flex h-24 items-center justify-center border border-hairline bg-paper-sunk">
                  <Text variant="meta" color="ink-muted">from {dir}</Text>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Text variant="meta" color="ink-faint" tracking="caps">Stagger Group</Text>
          <StaggerGroup className="grid grid-cols-3 gap-3 md:grid-cols-6" stagger={0.06}>
            {Array.from({ length: 6 }, (_, i) => (
              <Reveal key={i}>
                <div className="flex h-20 items-center justify-center border border-hairline bg-paper-sunk">
                  <Text variant="micro" color="ink-faint">{i + 1}</Text>
                </div>
              </Reveal>
            ))}
          </StaggerGroup>
        </div>

        <div className="space-y-3">
          <Text variant="meta" color="ink-faint" tracking="caps">Digit Roll (SI-20)</Text>
          <div className="flex items-center gap-4">
            <span className="font-display text-[length:var(--text-display)] tabular-nums">
              <DigitRoll value={`₹${counter.toLocaleString("en-IN")}`} />
            </span>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" onClick={() => setCounter((c) => c + 100)}>
                +₹100
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setCounter((c) => Math.max(0, c - 100))}>
                −₹100
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Text variant="meta" color="ink-faint" tracking="caps">Magnetic (SI-05) — hover these</Text>
          <div className="flex flex-wrap gap-4">
            <Magnetic>
              <Button variant="volt" size="lg">Add to Bag</Button>
            </Magnetic>
            <Magnetic strength={0.4} max={12}>
              <Button variant="primary" size="lg">Buy Now</Button>
            </Magnetic>
            <Magnetic>
              <Button variant="ghost" size="lg">Wishlist</Button>
            </Magnetic>
          </div>
        </div>
      </div>
    </Section>
  );
}

function MarqueeSection() {
  const brands = [
    "ZARA", "H&M", "UNIQLO", "MANGO", "MASSIMO DUTTI", "COS",
    "& OTHER STORIES", "ARKET", "WEEKDAY", "MUJI",
  ];

  return (
    <Section id="marquee" title="Marquee">
      <div className="-mx-6 space-y-6">
        <Marquee speed={25}>
          {brands.map((brand) => (
            <span
              key={brand}
              className="whitespace-nowrap px-6 font-display text-[length:var(--text-title)] text-ink-faint"
            >
              {brand}
            </span>
          ))}
        </Marquee>
        <Marquee speed={40}>
          {brands.map((brand) => (
            <span
              key={brand}
              className="whitespace-nowrap px-4 font-sans text-[length:var(--text-meta)] font-medium uppercase tracking-[var(--tracking-caps)] text-ink-muted"
            >
              {brand}
            </span>
          ))}
        </Marquee>
      </div>
    </Section>
  );
}

function SkeletonsSection() {
  return (
    <Section id="skeletons" title="Skeletons">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="space-y-3">
          <Text variant="meta" color="ink-faint" tracking="caps">Product Card</Text>
          <div className="space-y-3">
            <Skeleton className="aspect-[3/4] w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        </div>
        <div className="space-y-3">
          <Text variant="meta" color="ink-faint" tracking="caps">Text Block</Text>
          <div className="space-y-2">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
        <div className="space-y-3">
          <Text variant="meta" color="ink-faint" tracking="caps">Size Picker</Text>
          <div className="flex gap-2">
            {Array.from({ length: 5 }, (_, i) => (
              <Skeleton key={i} className="h-10 w-12 rounded-[var(--radius-pill)]" />
            ))}
          </div>
          <Skeleton className="mt-4 h-12 w-full" />
        </div>
      </div>
    </Section>
  );
}

export function MotionLabClient() {
  return (
    <>
      <Toaster />
      <TypographySection />
      <ButtonsSection />
      <InputsSection />
      <ChipsSection />
      <OverlaysSection />
      <TabsAccordionSection />
      <TooltipsSection />
      <CommerceSection />
      <MotionSection />
      <MarqueeSection />
      <SkeletonsSection />

      {/* Footer */}
      <footer className="border-t border-hairline py-12 text-center">
        <Text variant="micro" color="ink-faint">
          Harty Design System — Motion Lab
        </Text>
      </footer>
    </>
  );
}
