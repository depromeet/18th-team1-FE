"use client";

import { useRouter } from "next/navigation";

import { type Diary, DiaryListSection, fetchTodayDiaryExists } from "@/entities/diary";
import { fetchTodaySentenceExists, type RecommendedSentence } from "@/entities/sentence";
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

  const handleBannerClick = async (): Promise<void> => {
    const diaryExists = await fetchTodayDiaryExists();
    if (diaryExists.exists && diaryExists.diaryId !== null) {
      // 오늘 작성한 일기가 있으면 해당 일기로 이동
      //router.push(`/diary/${diaryExists.diaryId}`);
      return;
    }

    const sentenceExists = await fetchTodaySentenceExists();
    if (sentenceExists.exists) {
      // 오늘 작성한 일기는 없지만 추천 문장이 있으면 추천 문장으로 이동
      router.push("/diary/sentence");
      return;
    }

    // 오늘 작성한 일기도 추천 문장도 없으면 감정 선택 화면으로 이동
    router.push("/diary/emotion");
  };

  const handleDiaryItemPress = (diaryId: number): void => {
    router.push(`/diary/${diaryId}`);
  };

  return (
    <>
      <HomeBanner
        hasTodayDiary={hasTodayDiary}
        sentenceCount={summary?.totalDiaryCount ?? 0}
        onClick={handleBannerClick}
      />
      <RandomSentenceBanner sentences={sentences} />
      <DiaryListSection diaries={diaries} onPressItem={handleDiaryItemPress} />
    </>
  );
};
