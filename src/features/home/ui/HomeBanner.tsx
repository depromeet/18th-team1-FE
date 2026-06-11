interface HomeBannerProps {
  onClick: () => void;
}

export const HomeBanner = ({ onClick }: HomeBannerProps) => (
  <button
    type="button"
    onClick={onClick}
    className="flex h-31.5 w-full shrink-0 items-start justify-between bg-key-secondary p-5"
  >
    <div className="flex flex-col items-start gap-1 text-left">
      <span className="head1-2 text-gray-100">나의 문장 찾기</span>
      <span className="body2 text-gray-100">
        오늘 하루를 나타내는 문장을
        <br />
        추천받으세요
      </span>
    </div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="20"
      viewBox="0 0 28 20"
      fill="none"
      aria-hidden="true"
      className="translate-y-5 self-center"
    >
      <path
        d="M1.43408 9.81061H26.337M18.5549 17.5928L26.337 9.81061L18.5549 2.02844"
        stroke="var(--color-key-secondary)"
        strokeWidth={2.86861}
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  </button>
);
