"use client";

import { useRouter } from "next/navigation";

import { SentenceCard, useSentenceQuotesQuery } from "@/entities/sentence";
import { Button } from "@/shared/ui/button";
import { useDiaryEmotionStore } from "@/store/diary-emotion/useDiaryEmotionStore";

export const SentenceDetailView = (): React.ReactElement => {
  const router = useRouter();
  const { selectedSituationIds, selectedSentenceTypeIds, situationDescription } =
    useDiaryEmotionStore();

  const { data } = useSentenceQuotesQuery({
    emotionTagIds: selectedSituationIds.map(Number),
    toneTagIds: selectedSentenceTypeIds.map(Number),
    userContext: situationDescription || undefined,
  });

  const { dailyRecommendationId, quote } = data;

  const handleNext = (): void => {
    router.push(`/diary/write?sentenceId=${quote.quoteId}`);
  };

  const handleViewList = (): void => {
    router.push(`/diary/sentence/list?dailyRecommendationId=${dailyRecommendationId}`);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1">
        <SentenceCard bookTitle={quote.title} bookAuthor={quote.author} quote={quote.content} />
      </div>
      <section className="flex shrink-0 flex-col items-center gap-2 px-5 pb-8 pt-2">
        <Button label="다음" onClick={handleNext} />
        <Button
          label="다른 문장 더보기"
          className="body3 rounded-lg bg-transparent text-gray-600"
          onClick={handleViewList}
        />
      </section>
    </div>
  );
};
