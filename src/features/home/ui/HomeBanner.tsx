import { Text } from "@/shared/ui/text";

interface HomeBannerProps {
  hasTodayDiary: boolean;
  sentenceCount?: number;
  onClick: () => void;
}

export const HomeBanner = ({ hasTodayDiary, sentenceCount = 0, onClick }: HomeBannerProps) => (
  <button
    type="button"
    onClick={onClick}
    className="flex h-60 w-full shrink-0 flex-col justify-between bg-gray-100 px-5 py-5"
  >
    <div className="flex flex-col gap-1 items-start">
      <Text as="span" variant="title1" color="key-secondary2">
        {hasTodayDiary ? "오늘 작성한 일기 보기" : "오늘의 일기 작성하기"}
      </Text>
      <Text as="span" variant="subhead6" color="key-secondary2">
        지금까지 {sentenceCount}개의 문장을 모았어요
      </Text>
    </div>
    <div className="self-end">
      <div className="flex size-10.5 items-center justify-center rounded-lg bg-key-secondary2">
        <svg width="22" height="16" viewBox="0 0 25 18" fill="none" aria-hidden="true">
          <path
            d="M1.25 8.54975H22.9529M22.9529 8.54975L16.1708 1.76758M22.9529 8.54975L16.1708 15.3319"
            stroke="var(--color-key-secondary)"
            strokeWidth={2.5}
            strokeLinecap="square"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  </button>
);
