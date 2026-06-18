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
import { useHomeBannerModalStore } from "@/store/home-banner-modal/useHomeBannerModalStore";

export const HomeView = () => {
  const router = useRouter();
  const { data: summary } = useHomeSummaryQuery();
  const { data: randomQuote } = useHomeRandomQuery();
  const { setCurrentRecommendationId, setLoadingQuotes } = useEmotionSelectStore();
  const { toast } = useToast();
  const { openModal } = useHomeBannerModalStore();

  const monthlyRecommendations = (summary?.monthlyRecommendations ?? []).slice().reverse();

  const sentences: RecommendedSentence[] = (randomQuote ?? []).map((quote) => ({
    id: String(quote.quoteId),
    quote: quote.content,
    bookTitle: quote.title,
    bookAuthor: quote.author,
    date: "",
  }));

  const handleSlideClick = (sentence: RecommendedSentence): void => {
    openModal(sentence);
    router.push("/discover");
  };

  const handleBannerClick = async (): Promise<void> => {
    let status: Awaited<ReturnType<typeof fetchTodayStatus>>;
    try {
      status = await fetchTodayStatus();
    } catch {
      toast("일시적인 오류가 발생했어요. 잠시 후 다시 시도해주세요.");
      return;
    }

    if (!status.canCreateTodayRecommendation && !status.hasOngoingRecommendation) {
      toast("오늘은 더 이상 문장을 추천받을 수 없어요.");
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
      <RandomSentenceBanner sentences={sentences} onSlideClick={handleSlideClick} />
      <HomeBanner onClick={handleBannerClick} />
      <HomeSentenceSection items={monthlyRecommendations} />
    </>
  );
};
