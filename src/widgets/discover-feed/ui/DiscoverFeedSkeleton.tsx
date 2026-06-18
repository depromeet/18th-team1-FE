const SkeletonItem = (): React.ReactElement => (
  <div className="flex animate-pulse flex-row items-center gap-4 rounded-2xl bg-background px-4 py-5">
    <div className="size-20 shrink-0 rounded-xl bg-gray-100" />
    <div className="flex flex-1 flex-col gap-2">
      <div className="h-3.5 w-full rounded bg-gray-100" />
      <div className="h-3.5 w-4/5 rounded bg-gray-100" />
      <div className="h-3.5 w-3/5 rounded bg-gray-100" />
    </div>
  </div>
);

export const DiscoverFeedSkeleton = (): React.ReactElement => (
  <div className="flex flex-col gap-3.5">
    <SkeletonItem />
    <SkeletonItem />
    <SkeletonItem />
    <SkeletonItem />
    <SkeletonItem />
    <SkeletonItem />
  </div>
);
