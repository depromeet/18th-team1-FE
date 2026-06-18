const SkeletonItem = (): React.ReactElement => (
  <div className="flex animate-pulse flex-col gap-4 border-b border-border bg-background py-5">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="size-8 rounded-full bg-gray-100" />
        <div className="h-3 w-20 rounded bg-gray-100" />
      </div>
      <div className="size-5 rounded bg-gray-100" />
    </div>
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="h-3.5 w-full rounded bg-gray-100" />
        <div className="h-3.5 w-4/5 rounded bg-gray-100" />
        <div className="h-3.5 w-3/5 rounded bg-gray-100" />
        <div className="mt-1 h-3 w-2/5 rounded bg-gray-100" />
      </div>
      <div className="flex gap-2">
        <div className="h-6 w-16 rounded-full bg-gray-100" />
        <div className="h-6 w-16 rounded-full bg-gray-100" />
      </div>
    </div>
  </div>
);

export const DiscoverFeedSkeleton = (): React.ReactElement => (
  <div className="flex flex-col px-5">
    <SkeletonItem />
    <SkeletonItem />
    <SkeletonItem />
  </div>
);
