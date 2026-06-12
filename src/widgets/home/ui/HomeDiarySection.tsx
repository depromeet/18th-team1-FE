"use client";

import { useRouter } from "next/navigation";

import type { Diary } from "@/entities/diary";
import type { RecommendedSentence } from "@/entities/sentence";
import {
  HomeBanner,
  HomeSentenceSection,
  RandomSentenceBanner,
  useHomeRandomQuery,
  useHomeSummaryQuery,
} from "@/features/home";

export const HomeDiarySection = () => {
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

  const handleBannerClick = () => {
    router.push("/emotion");
    // TODO: 분기 로직 복구 필요
    // const diaryExists = await fetchTodayDiaryExists();
    // if (diaryExists.exists && diaryExists.diaryId !== null) {
    //   router.push(`/diary/${diaryExists.diaryId}`);
    //   return;
    // }
    // const sentenceExists = await fetchTodaySentenceExists();
    // if (sentenceExists.exists) {
    //   router.push("/diary/sentence");
    //   return;
    // }
    // router.push("/emotion");
  };

  return (
    <>
      <RandomSentenceBanner sentences={sentences} />
      <HomeBanner onClick={handleBannerClick} />
      <HomeSentenceSection diaries={diaries} />
    </>
  );
};
