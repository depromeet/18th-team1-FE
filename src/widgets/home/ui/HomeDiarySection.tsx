"use client";

import type { Diary } from "@/entities/diary";
import { DiaryListSection } from "@/entities/diary";
import { MOCK_SENTENCES } from "@/mock";

import { HomeBanner } from "./HomeBanner";
import { RandomSentenceBanner } from "./RandomSentenceBanner";

interface HomeDiarySectionProps {
  diaries: Diary[];
}

export const HomeDiarySection = ({ diaries }: HomeDiarySectionProps): React.ReactElement => {
  const hasTodayDiary = false; // TODO: API 연동 후 hook으로 교체
  const handleDiaryItemPress = (day: number): void => {
    // TODO: 일기 상세 페이지 라우팅 구현 후 활성화
    // router.push(`/diary/${day}`);
    void day;
  };

  return (
    <>
      <HomeBanner hasTodayDiary={hasTodayDiary} />
      <RandomSentenceBanner sentences={MOCK_SENTENCES} />
      <DiaryListSection diaries={diaries} onPressItem={handleDiaryItemPress} />
    </>
  );
};
