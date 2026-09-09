import { Skeleton } from "@harty/ui";

function CardSkeleton() {
  return (
    <div>
      <Skeleton className="w-full" style={{ aspectRatio: "3/4" }} />
      <div className="mt-3 space-y-2">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}

export default function PLPLoading() {
  return (
    <main className="mx-auto max-w-[1440px] px-4 py-8 lg:px-8">
      {/* Breadcrumb skeleton */}
      <div className="mb-6">
        <Skeleton className="h-3 w-48" />
      </div>

      {/* Header skeleton */}
      <div className="mb-8 border-b border-hairline pb-6">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="mt-2 h-5 w-32" />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Filter sidebar skeleton */}
        <div className="hidden lg:col-span-3 lg:block">
          <Skeleton className="mb-4 h-4 w-24" />
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="mb-2 h-5 w-20" />
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <Skeleton key={j} className="h-7 w-16 rounded-[var(--radius-pill)]" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grid skeleton */}
        <div className="lg:col-span-9">
          {/* Toolbar skeleton */}
          <div className="mb-6 flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <div className="flex gap-3">
              <Skeleton className="h-8 w-40" />
              <Skeleton className="h-8 w-16" />
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
