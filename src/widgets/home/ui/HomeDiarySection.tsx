"use client";

import { useRouter } from "next/navigation";

import { type Diary, DiaryListSection } from "@/entities/diary";
import type { RecommendedSentence } from "@/entities/sentence";
import {
  HomeBanner,
  RandomSentenceBanner,
  useHomeRandomQuery,
  useHomeSummaryQuery,
} from "@/features/home";

export const HomeDiarySection = (): React.ReactElement => {
  const router = useRouter();
  const { data: summary } = useHomeSummaryQuery();
  const { data: randomQuote } = useHomeRandomQuery();

  const diaries: Diary[] = (summary?.monthlyDiaries ?? []).map((item) => ({
    diaryId: item.diaryId,
    day: new Date(item.createdAt).getDate(),
    sentence: item.quoteContent,
    temperature: 0,
    dotColor: "",
  }));

  const sentences: RecommendedSentence[] = (randomQuote ?? []).map((quote) => ({
    id: String(quote.quoteId),
    quote: quote.content,
    bookTitle: quote.title,
    bookAuthor: quote.author,
    date: "",
  }));

  const hasTodayDiary = summary?.todayDiary !== null && summary?.todayDiary !== undefined;
  const todayDiaryId = summary?.todayDiary?.diaryId;
  const bannerHref =
    hasTodayDiary && todayDiaryId !== undefined ? `/diary/${todayDiaryId}` : "/diary/emotion";

  const handleDiaryItemPress = (diaryId: number): void => {
    router.push(`/diary/${diaryId}`);
  };

  return (
    <>
      <HomeBanner
        hasTodayDiary={hasTodayDiary}
        sentenceCount={summary?.totalDiaryCount ?? 0}
        href={bannerHref}
      />
      <RandomSentenceBanner sentences={sentences} />
      <DiaryListSection diaries={diaries} onPressItem={handleDiaryItemPress} />
    </>
  );
};
