interface LoadingSkeletonProps {
  count?: number;
}

export function ProductSkeleton({ count = 8 }: LoadingSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="group">
          <div className="aspect-[3/4] rounded-sm bg-surface animate-pulse" />
          <div className="mt-3 space-y-2">
            <div className="h-3 w-16 bg-surface animate-pulse rounded-sm" />
            <div className="h-3.5 w-3/4 bg-surface animate-pulse rounded-sm" />
            <div className="h-3 w-14 bg-surface animate-pulse rounded-sm" />
          </div>
        </div>
      ))}
    </>
  );
}

export function DesignSkeleton({ count = 6 }: LoadingSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="group">
          <div className="aspect-[4/5] rounded-sm bg-surface animate-pulse" />
          <div className="mt-3 space-y-2">
            <div className="h-4 w-32 bg-surface animate-pulse rounded-sm" />
            <div className="h-3 w-24 bg-surface animate-pulse rounded-sm" />
          </div>
        </div>
      ))}
    </>
  );
}

export function CollectionSkeleton({ count = 3 }: LoadingSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>
          <div className="aspect-[16/9] rounded-sm bg-surface animate-pulse" />
          <div className="mt-3 space-y-2">
            <div className="h-4 w-28 bg-surface animate-pulse rounded-sm" />
            <div className="h-3 w-48 bg-surface animate-pulse rounded-sm" />
          </div>
        </div>
      ))}
    </>
  );
}
