interface HomeBannerProps {
  onClick: () => void;
}

export const HomeBanner = ({ onClick }: HomeBannerProps) => (
  <button
    type="button"
    onClick={onClick}
    className="relative flex h-31.5 w-full shrink-0 items-start bg-key-secondary p-5"
  >
    <div className="flex flex-col items-start gap-1 text-left">
      <span className="head1 text-gray-100">나의 문장 찾기</span>
      <span className="body3 text-gray-100">
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
      className="absolute right-[22.3px] top-[calc(50%+20.78px)] -translate-y-1/2"
    >
      <path
        d="M27.3516 8.7959C27.9116 9.35598 27.9115 10.2641 27.3516 10.8242L18.5557 19.6211L16.5273 17.5928L22.874 11.2451H0V8.37598H22.875L16.5273 2.02832L18.5557 0L27.3516 8.7959Z"
        fill="#A4D4D6"
      />
    </svg>
  </button>
);
