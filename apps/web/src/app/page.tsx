import { Suspense } from "react";
import { api } from "@/lib/trpc/server";
import { HomeHero } from "./_components/home-hero";
import { HomeQuickCategories } from "./_components/home-quick-categories";
import { HomeDeals } from "./_components/home-deals";
import { HomeTrending } from "./_components/home-trending";
import { HomeCategories } from "./_components/home-categories";
import { HomeEditorial } from "./_components/home-editorial";
import { HomeBrandMarquee } from "./_components/home-brand-marquee";
import { Footer } from "./_components/footer";
import { Skeleton } from "@harty/ui";

function RailSkeleton() {
  return (
    <div className="flex gap-4 overflow-hidden px-4 lg:px-8">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="w-[220px] shrink-0 lg:w-[280px]">
          <Skeleton className="mb-3 aspect-[3/4] w-full rounded-md" />
          <Skeleton className="mb-1 h-3 w-16" />
          <Skeleton className="mb-1 h-4 w-full" />
          <Skeleton className="h-4 w-20" />
        </div>
      ))}
    </div>
  );
}

function GridSkeleton() {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 lg:grid-cols-4 lg:px-8">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i}>
          <Skeleton className="mb-3 aspect-[3/4] w-full rounded-md" />
          <Skeleton className="mb-1 h-3 w-16" />
          <Skeleton className="mb-1 h-4 w-full" />
          <Skeleton className="h-4 w-20" />
        </div>
      ))}
    </div>
  );
}

function formatPrice(paise: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(paise / 100);
}

async function TrendingProducts() {
  const data = await api.catalog.list({
    sort: "popularity",
    page: 1,
    filters: {},
  });

  const products = data.items.slice(0, 8).map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    brand: p.brand,
    price: p.price,
    mrp: p.mrp,
    discount: p.discount,
    image: p.image,
  }));

  return <HomeTrending products={products} />;
}

async function NewArrivals() {
  const data = await api.catalog.list({
    sort: "newest",
    page: 1,
    filters: {},
  });

  const products = data.items.slice(0, 8);

  return (
    <section className="py-[var(--space-section)]">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="mb-10 text-center font-display text-[length:var(--text-display)] font-bold tracking-tight text-ink">
          New Arrivals
          <span className="mx-auto mt-2 block h-1 w-12 rounded-pill bg-volt" />
        </h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {products.map((product) => (
            <a
              key={product.id}
              href={`/p/${product.slug}`}
              className="group block"
            >
              <div
                className="relative mb-3 overflow-hidden rounded-md bg-paper-sunk shadow-sm transition-shadow duration-[var(--dur-fast)] group-hover:shadow-lg"
                style={{ aspectRatio: "3/4" }}
              >
                {product.image && (
                  <img
                    src={product.image.url}
                    alt={product.title}
                    className="h-full w-full object-cover transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
                    loading="lazy"
                  />
                )}
                {product.discount > 0 && (
                  <span className="absolute left-2 top-2 rounded-sm bg-volt px-2 py-0.5 font-sans text-[length:var(--text-micro)] font-bold text-volt-ink">
                    -{product.discount}%
                  </span>
                )}
              </div>
              <span className="block font-sans text-[length:var(--text-micro)] font-medium uppercase tracking-[var(--tracking-caps)] text-ink-muted">
                {product.brand?.name}
              </span>
              <span className="mt-0.5 block truncate font-sans text-[length:var(--text-body)] text-ink">
                {product.title}
              </span>
              <div className="mt-1 flex items-center gap-2">
                <span className="font-sans text-[length:var(--text-body)] font-semibold text-ink">
                  {formatPrice(product.price)}
                </span>
                {product.mrp > product.price && (
                  <>
                    <span className="font-sans text-[length:var(--text-meta)] text-ink-faint line-through">
                      {formatPrice(product.mrp)}
                    </span>
                    <span className="font-sans text-[length:var(--text-micro)] font-semibold text-volt">
                      {product.discount}% off
                    </span>
                  </>
                )}
              </div>
            </a>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a
            href="/women"
            className="inline-flex items-center rounded-md bg-ink px-6 py-3 font-sans text-[length:var(--text-body)] font-semibold text-paper transition-transform duration-[var(--dur-micro)] hover:scale-105"
          >
            View All New Arrivals
          </a>
        </div>
      </div>
    </section>
  );
}

export default async function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeQuickCategories />
      <HomeDeals />
      <Suspense fallback={<RailSkeleton />}>
        <TrendingProducts />
      </Suspense>
      <HomeCategories />
      <HomeEditorial />
      <Suspense fallback={<GridSkeleton />}>
        <NewArrivals />
      </Suspense>
      <HomeBrandMarquee />
      <Footer />
    </>
  );
}
