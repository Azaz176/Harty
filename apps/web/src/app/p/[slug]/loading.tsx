import {
  GallerySkeleton,
  BuyBoxSkeleton,
  RailSkeleton,
  ReviewsSkeleton,
} from "./_components/skeletons";

export default function ProductLoading() {
  return (
    <main className="mx-auto max-w-7xl px-4 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-16 pt-6 lg:pt-10">
        <div className="lg:col-span-7">
          <GallerySkeleton />
        </div>
        <div className="lg:col-span-5 mt-6 lg:mt-0">
          <BuyBoxSkeleton />
        </div>
      </div>
      <RailSkeleton />
      <ReviewsSkeleton />
    </main>
  );
}
