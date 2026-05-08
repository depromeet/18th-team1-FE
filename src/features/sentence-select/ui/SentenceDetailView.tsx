"use client";

import { useRouter } from "next/navigation";

import {
  SentenceCard,
  type SentenceQuotesResponse,
  useSentenceQuotesQuery,
} from "@/entities/sentence";
import { Button } from "@/shared/ui/button";
import {
  loadQuotesResponse,
  loadRecommendationParams,
  saveQuotesResponse,
  useDiaryEmotionStore,
} from "@/store/diary-emotion/useDiaryEmotionStore";

export const SentenceDetailView = (): React.ReactElement => {
  const router = useRouter();
  const { selectedSituationIds, selectedSentenceTypeIds, situationDescription, setSelectedQuote } =
    useDiaryEmotionStore();

  const savedParams = loadRecommendationParams();
  const emotionTagIds =
    selectedSituationIds.length > 0 ? selectedSituationIds : (savedParams?.emotionTagIds ?? []);
  const toneTagIds =
    selectedSentenceTypeIds.length > 0 ? selectedSentenceTypeIds : (savedParams?.toneTagIds ?? []);

  const cachedResponse = loadQuotesResponse<SentenceQuotesResponse>();

  const { data } = useSentenceQuotesQuery(
    {
      emotionTagIds: emotionTagIds.map(Number),
      toneTagIds: toneTagIds.map(Number),
      userContext: situationDescription,
    },
    cachedResponse ?? undefined,
  );
  const { dailyRecommendationId, quote } = data;
  saveQuotesResponse(data);

  const handleNext = (): void => {
    setSelectedQuote({
      dailyRecommendationId,
      quoteId: quote.quoteId,
      content: quote.content,
      title: quote.title,
      author: quote.author,
    });
    router.push("/diary/write");
  };

  const handleViewList = (): void => {
    router.push(`/diary/sentence/list?dailyRecommendationId=${dailyRecommendationId}`);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1">
        <SentenceCard bookTitle={quote.title} bookAuthor={quote.author} quote={quote.content} />
      </div>
      <section className="flex shrink-0 flex-col items-center gap-2 p-5">
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
