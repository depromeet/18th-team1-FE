"use client";

import { useRouter } from "next/navigation";

import { fetchTodayStatus, type RecommendedSentence } from "@/entities/sentence";
import {
  HomeBanner,
  HomeSentenceSection,
  RandomSentenceBanner,
  useHomeRandomQuery,
  useHomeSummaryQuery,
} from "@/features/home";
import { useToast } from "@/shared/hooks/useToast";
import { useEmotionSelectStore } from "@/store/emotion-select/useEmotionSelectStore";

export const HomeView = () => {
  const router = useRouter();
  const { data: summary } = useHomeSummaryQuery();
  const { data: randomQuote } = useHomeRandomQuery();
  const { setCurrentRecommendationId, setLoadingQuotes } = useEmotionSelectStore();
  const { toast } = useToast();

  const monthlyRecommendations = (summary?.monthlyRecommendations ?? []).slice().reverse();

  const sentences: RecommendedSentence[] = (randomQuote ?? []).map((quote) => ({
    id: String(quote.quoteId),
    quote: quote.content,
    bookTitle: quote.title,
    bookAuthor: quote.author,
    date: "",
  }));

  const handleBannerClick = async (): Promise<void> => {
    let status: Awaited<ReturnType<typeof fetchTodayStatus>>;
    try {
      status = await fetchTodayStatus();
    } catch {
      toast("일시적인 오류가 발생했어요. 잠시 후 다시 시도해주세요.");
      return;
    }

    if (!status.canCreateTodayRecommendation && !status.hasOngoingRecommendation) {
      toast("오늘의 문장 추천은 이미 완료되었어요.");
      return;
    }

    if (status.hasOngoingRecommendation && status.ongoingRecommendationId !== null) {
      setCurrentRecommendationId(status.ongoingRecommendationId);
      router.push("/sentence");
      return;
    }

    const shuffled = [...(randomQuote ?? [])].sort(() => Math.random() - 0.5);
    const picked = shuffled[0];
    setLoadingQuotes(
      picked ? [{ content: picked.content, title: picked.title, author: picked.author }] : [],
    );
    router.push("/emotion");
  };

  return (
    <>
      <RandomSentenceBanner sentences={sentences} />
      <HomeBanner onClick={handleBannerClick} />
      <HomeSentenceSection items={monthlyRecommendations} />
    </>
  );
};
