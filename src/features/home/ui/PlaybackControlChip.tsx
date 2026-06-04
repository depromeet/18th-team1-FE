interface PlaybackControlChipProps {
  isPaused: boolean;
  currentPosition: number;
  total: number;
  onToggle: () => void;
}

export const PlaybackControlChip = ({
  isPaused,
  currentPosition,
  total,
  onToggle,
}: PlaybackControlChipProps): React.ReactElement => (
  <button
    type="button"
    onClick={onToggle}
    aria-label={isPaused ? "재생" : "일시정지"}
    className="absolute bottom-5 right-5 flex h-8 w-19.75 items-center justify-center rounded-full border border-gray-600-15 bg-gray-500-50 p-px backdrop-blur-sm"
  >
    <div className="flex h-full items-center gap-1.25">
      <div className="flex h-full w-2.25 shrink-0 items-center justify-center">
        {isPaused ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="9"
            height="9"
            viewBox="0 0 11 11"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M9.24853 3.90644C9.50369 4.04213 9.71712 4.24469 9.86595 4.49241C10.0148 4.74012 10.0934 5.02367 10.0934 5.31266C10.0934 5.60166 10.0148 5.8852 9.86595 6.13292C9.71712 6.38064 9.50369 6.58319 9.24853 6.71888L2.44216 10.4201C1.34619 11.0167 0 10.2411 0 9.01441V1.61144C0 0.384257 1.34619 -0.390837 2.44216 0.204695L9.24853 3.90644Z"
              fill="white"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="9"
            height="10.5"
            viewBox="0 0 9 11"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M7 10.5C6.44772 10.5 6 10.0523 6 9.5V1C6 0.447715 6.44772 0 7 0H8C8.55229 0 9 0.447715 9 1V9.5C9 10.0523 8.55228 10.5 8 10.5H7ZM1 10.5C0.447715 10.5 0 10.0523 0 9.5V1C0 0.447715 0.447715 0 1 0H2C2.55228 0 3 0.447715 3 1V9.5C3 10.0523 2.55228 10.5 2 10.5H1Z"
              fill="white"
            />
          </svg>
        )}
      </div>
      <div className="flex h-3.5 w-1 shrink-0 flex-col items-center justify-center">
        <div className="min-h-px w-px flex-1 bg-gray-0-20" aria-hidden="true" />
      </div>
      <p className="caption1 shrink-0 text-gray-0 tabular-nums">
        {currentPosition}/{total}
      </p>
    </div>
  </button>
);
