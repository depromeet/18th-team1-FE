interface HomeBannerProps {
  onClick: () => void;
}

export const HomeBanner = ({ onClick }: HomeBannerProps) => (
  <button
    type="button"
    onClick={onClick}
    className="relative flex h-19 w-full shrink-0 items-center bg-key-secondary p-5"
  >
    <span className="head1 text-gray-100">오늘의 문장 추천받기</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="20"
      viewBox="0 0 28 20"
      fill="none"
      aria-hidden="true"
      className="absolute right-[22.3px] top-1/2 -translate-y-1/2"
    >
      <path
        d="M27.3516 8.7959C27.9116 9.35598 27.9115 10.2641 27.3516 10.8242L18.5557 19.6211L16.5273 17.5928L22.874 11.2451H0V8.37598H22.875L16.5273 2.02832L18.5557 0L27.3516 8.7959Z"
        fill="#A4D4D6"
      />
    </svg>
  </button>
);
