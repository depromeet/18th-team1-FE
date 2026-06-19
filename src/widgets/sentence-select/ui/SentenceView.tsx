"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

import { diaryKeys } from "@/entities/diary";
import type { SentenceQuote } from "@/entities/sentence";
import {
  sentenceKeys,
  TodaysSentenceCard,
  useRecommendationQuotesQuery,
  useSelectQuoteMutation,
} from "@/entities/sentence";
import { homeKeys } from "@/features/home";
import { SentenceLoadingView } from "@/features/sentence-select";
import { NewButton } from "@/shared/ui/new-button";
import { Text } from "@/shared/ui/text";
import { useEmotionSelectStore } from "@/store/emotion-select/useEmotionSelectStore";

const today = new Date();
const date = `${today.toLocaleDateString("en-US", { weekday: "long" })} ${today.getDate()}`;

interface SentenceViewContentProps {
  quote: SentenceQuote;
  recommendationId: number;
}

const SentenceViewContent = ({
  quote,
  recommendationId,
}: SentenceViewContentProps): React.ReactElement => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutateAsync: selectQuote } = useSelectQuoteMutation();
  const { setSelectedQuote } = useEmotionSelectStore();

  const handleViewList = (): void => {
    router.push("/sentence/list");
  };

  const handleNext = async (): Promise<void> => {
    const result = await selectQuote({ recommendationId, quoteId: quote.quoteId });
    queryClient.invalidateQueries({ queryKey: homeKeys.summary() });
    queryClient.invalidateQueries({ queryKey: sentenceKeys.todayStatus() });
    queryClient.invalidateQueries({ queryKey: diaryKeys.lists() });
    setSelectedQuote({
      recommendationId: result.recommendationId,
      quoteId: result.quote.quoteId,
      content: result.quote.content,
      title: result.quote.title,
      author: result.quote.author,
      image: result.quote.image,
      tags: result.emotionTags.filter((tag) => tag.type === "EMOTION"),
    });
    router.push("/sentence/today");
  };

  return (
    <div className="flex h-full flex-col bg-muted">
      <div className="flex flex-1 flex-col items-center">
        <Text variant="point-eng" color="gray-500" className="text-center">
          Today<span className="font-pretendard font-semibold">&apos;</span>s Text
        </Text>
        <div className="flex flex-1 items-center justify-center">
          <TodaysSentenceCard
            date={date}
            quote={quote.content}
            bookTitle={quote.title}
            bookAuthor={quote.author}
            bookCoverImage={quote.image}
          />
        </div>
      </div>
      <section className="flex shrink-0 flex-col items-center gap-2">
        <NewButton variant="secondary" label="다른 문장 더보기" onClick={handleViewList} />
        <NewButton label="다음" onClick={handleNext} />
        <div className="bg-gray-700" style={{ height: "env(safe-area-inset-bottom, 0px)" }} />
      </section>
    </div>
  );
};

// 복구 플로우: GET /recommendations/{id}/quotes 에서 첫 번째 아이템 사용
const SentenceViewFetched = ({
  recommendationId,
}: {
  recommendationId: number;
}): React.ReactElement => {
  const { data: quotes } = useRecommendationQuotesQuery(recommendationId);
  const firstQuote = quotes[0];
  if (!firstQuote) return <SentenceLoadingView />;
  return <SentenceViewContent quote={firstQuote} recommendationId={recommendationId} />;
};

export const SentenceView = (): React.ReactElement => {
  const { currentRecommendationId, initialRecommendedQuote } = useEmotionSelectStore();

  if (!currentRecommendationId) return <SentenceLoadingView />;

  // 신규 플로우: startRecommendation 응답이 store에 있는 경우 바로 사용
  if (initialRecommendedQuote) {
    return (
      <SentenceViewContent
        quote={initialRecommendedQuote}
        recommendationId={currentRecommendationId}
      />
    );
  }

  // 복구 플로우: GET으로 후보 문장 조회 후 첫 번째 아이템 표시
  return (
    <Suspense fallback={<SentenceLoadingView />}>
      <SentenceViewFetched recommendationId={currentRecommendationId} />
    </Suspense>
  );
};
