"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import type { Post } from "@/entities/post";
import { fetchTodayStatus, type RecommendedSentence } from "@/entities/sentence";
import {
  HomeBanner,
  HomeSentenceSection,
  RandomSentenceBanner,
  useHomeRandomQuery,
  useHomeSummaryQuery,
} from "@/features/home";
import { useScrapMutation } from "@/features/post-bookmark";
import { useToast } from "@/shared/hooks/useToast";
import { useEmotionSelectStore } from "@/store/emotion-select/useEmotionSelectStore";
import { PostShareModal } from "@/widgets/post-share-modal";

export const HomeView = () => {
  const router = useRouter();
  const { data: summary } = useHomeSummaryQuery();
  const { data: randomQuote } = useHomeRandomQuery();
  const { setCurrentRecommendationId, setLoadingQuotes } = useEmotionSelectStore();
  const { toast } = useToast();
  const { toggle } = useScrapMutation();
  const [selectedSentence, setSelectedSentence] = useState<RecommendedSentence | null>(null);

  const monthlyRecommendations = (summary?.monthlyRecommendations ?? []).slice().reverse();

  const sentences: RecommendedSentence[] = (randomQuote ?? []).map((quote) => ({
    id: String(quote.quoteId),
    quote: quote.content,
    bookTitle: quote.title,
    bookAuthor: quote.author,
    date: "",
  }));

  const selectedPost: Post | null = selectedSentence
    ? {
        id: selectedSentence.id,
        author: { id: "", nickname: "" },
        content: selectedSentence.quote,
        book: { title: selectedSentence.bookTitle, author: selectedSentence.bookAuthor },
        date: `${new Date().getDate()}, ${new Date().toLocaleDateString("en-US", { weekday: "long" })}`,
        mood: "good",
        emotionTag: "",
        toneTag: "",
        isBookmarked: false,
        createdAt: "",
      }
    : null;

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
      <RandomSentenceBanner sentences={sentences} onSlideClick={setSelectedSentence} />
      <HomeBanner onClick={handleBannerClick} />
      <HomeSentenceSection items={monthlyRecommendations} />
      {selectedPost && selectedSentence && (
        <PostShareModal
          post={selectedPost}
          isOpen={true}
          onClose={() => setSelectedSentence(null)}
          onToggleBookmark={(currentIsBookmarked) =>
            toggle(Number(selectedSentence.id), currentIsBookmarked)
          }
        />
      )}
    </>
  );
};
