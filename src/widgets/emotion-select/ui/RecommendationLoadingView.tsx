export const RecommendationLoadingView = (): React.ReactElement => (
  <div
    className="fixed inset-x-0 top-0 flex flex-col items-center justify-center bg-gray-0 md:left-1/2 md:right-auto md:w-93.75 md:-translate-x-1/2"
    style={{ height: "var(--vh, 100dvh)" }}
  >
    <p className="body1 text-gray-400">로딩중...</p>
  </div>
);
