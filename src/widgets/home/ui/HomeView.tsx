"use client";

import { useRouter } from "next/navigation";

import type { RecommendedSentence } from "@/entities/sentence";
import { useEmotionNavigation } from "@/features/emotion-select";
import {
  HomeBanner,
  HomeSentenceSection,
  RandomSentenceBanner,
  useHomeRandomQuery,
  useHomeSummaryQuery,
} from "@/features/home";
import { useHomeBannerModalStore } from "@/store/home-banner-modal/useHomeBannerModalStore";

export const HomeView = () => {
  const router = useRouter();
  const { data: summary } = useHomeSummaryQuery();
  const { data: randomQuote } = useHomeRandomQuery();
  const { navigateToEmotion } = useEmotionNavigation();
  const { openModal } = useHomeBannerModalStore();

  const monthlyRecommendations = (summary?.monthlyRecommendations ?? []).slice().reverse();

  const sentences: RecommendedSentence[] = (randomQuote ?? []).map((quote) => ({
    id: String(quote.quoteId),
    quote: quote.content,
    bookTitle: quote.title,
    bookAuthor: quote.author,
    coverImageUrl: quote.image,
    date: "",
  }));

  const handleSlideClick = (sentence: RecommendedSentence): void => {
    openModal(sentence);
    router.push("/discover");
  };

  const handleBannerClick = async (): Promise<void> => {
    const shuffled = [...(randomQuote ?? [])].sort(() => Math.random() - 0.5);
    const picked = shuffled[0];
    const loadingQuotes = picked
      ? [{ content: picked.content, title: picked.title, author: picked.author }]
      : [];
    await navigateToEmotion(loadingQuotes);
  };

  return (
    <>
      <RandomSentenceBanner sentences={sentences} onSlideClick={handleSlideClick} />
      <HomeBanner onClick={handleBannerClick} />
      <HomeSentenceSection items={monthlyRecommendations} />
    </>
  );
};
