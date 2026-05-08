"use client";

import { useRouter } from "next/navigation";

interface DiaryWriteButtonProps {
  hasTodayDiary: boolean;
  todayDiaryId?: number;
}

export const DiaryWriteButton = ({
  hasTodayDiary,
  todayDiaryId,
}: DiaryWriteButtonProps): React.ReactElement => {
  const router = useRouter();

  const handleClick = (): void => {
    if (hasTodayDiary && todayDiaryId !== undefined) {
      router.push(`/diary/${todayDiaryId}`);
      return;
    }
    router.push("/diary/emotion");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex size-10.5 items-center justify-center rounded-lg bg-key-secondary2"
      aria-label={hasTodayDiary ? "오늘 작성한 일기 보기" : "오늘의 일기 작성하기"}
    >
      <svg width="22" height="16" viewBox="0 0 25 18" fill="none" aria-hidden="true">
        <path
          d="M1.25 8.54975H22.9529M22.9529 8.54975L16.1708 1.76758M22.9529 8.54975L16.1708 15.3319"
          stroke="var(--color-key-secondary)"
          strokeWidth={2.5}
          strokeLinecap="square"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};
