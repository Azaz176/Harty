import { Suspense } from "react";
import { notFound } from "next/navigation";
import { api } from "@/lib/trpc/server";
import { ProductGallery } from "./_components/product-gallery";
import { BuyBox } from "./_components/buy-box";
import { ReviewsPanel } from "./_components/reviews-panel";
import { RelatedRail } from "./_components/related-rail";
import { ReviewsSkeleton, RailSkeleton } from "./_components/skeletons";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = await api.catalog.product({ slug });
  if (!p) return {};
  return {
    title: `${p.brand?.name ?? ""} ${p.title} — Harty`,
    description: p.seoDescription,
    openGraph: {
      images: p.media[0]
        ? [{ url: p.media[0].url, width: 1200, height: 1500 }]
        : [],
    },
    alternates: { canonical: `/p/${p.slug}` },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await api.catalog.product({ slug });
  if (!product) notFound();

  return (
    <main className="mx-auto max-w-7xl px-4 lg:px-8">
      {/* JSON-LD for rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.title,
            brand: { "@type": "Brand", name: product.brand?.name },
            image: product.media.map((m) => m.url),
            description: product.description,
            offers: {
              "@type": "AggregateOffer",
              lowPrice: (
                Math.min(...product.variants.map((v) => v.price)) / 100
              ).toFixed(2),
              highPrice: (
                Math.max(...product.variants.map((v) => v.price)) / 100
              ).toFixed(2),
              priceCurrency: "INR",
              availability: product.variants.some((v) => v.inStock)
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
            },
            aggregateRating: product.ratingCount > 0
              ? {
                  "@type": "AggregateRating",
                  ratingValue: product.ratingAvg,
                  reviewCount: product.ratingCount,
                }
              : undefined,
          }),
        }}
      />

      {/* Asymmetric 12-col: gallery 7, buy box 5 with generous gutter */}
      <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-16 pt-6 lg:pt-10">
        <div className="lg:col-span-7">
          <ProductGallery media={product.media} title={product.title} />
        </div>
        <div className="lg:col-span-5 lg:sticky lg:top-24 lg:h-fit lg:py-0 mt-6 lg:mt-0">
          <BuyBox product={product} />
        </div>
      </div>

      {/* Related rail — streamed */}
      <Suspense fallback={<RailSkeleton />}>
        <RelatedRail productId={product.id} kind="complete-the-look" />
      </Suspense>

      {/* Reviews — streamed */}
      <Suspense fallback={<ReviewsSkeleton />}>
        <ReviewsPanel productId={product.id} />
      </Suspense>

      {/* Similar styles */}
      <Suspense fallback={<RailSkeleton />}>
        <RelatedRail productId={product.id} kind="similar" />
      </Suspense>

      {/* Mobile sticky bar spacer */}
      <div className="h-16 lg:hidden" />
    </main>
  );
}
