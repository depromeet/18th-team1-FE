export const SentenceListCardSkeleton = (): React.ReactElement => (
  <div className="flex w-full flex-col items-start rounded-lg bg-gray-50 p-5">
    <div className="flex w-full animate-pulse flex-col gap-2">
      <div className="h-[15px] w-full rounded-[4px] bg-gray-0" />
      <div className="h-[15px] w-[201px] rounded-[4px] bg-gray-0" />
      <div className="h-[15px] w-[201px] rounded-[4px] bg-gray-0" />
    </div>
  </div>
);
