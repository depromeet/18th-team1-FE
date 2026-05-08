"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { SentenceListCard, useAdditionalSentenceQuotesQuery } from "@/entities/sentence";
import { Button } from "@/shared/ui/button";
import { DoubleButton } from "@/shared/ui/double-button";
import { useDiaryEmotionStore } from "@/store/diary-emotion/useDiaryEmotionStore";

import { useSentenceList } from "../model/useSentenceList";

export const SentenceListView = (): React.ReactElement => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dailyRecommendationId = Number(searchParams.get("dailyRecommendationId"));

  const { data } = useAdditionalSentenceQuotesQuery(dailyRecommendationId);
  const { setSelectedQuote } = useDiaryEmotionStore();
  const { visibleQuotes, selectedId, canLoadMore, handleSelect, handleLoadMore } = useSentenceList(
    data[0]?.quoteId ?? 0,
    data,
  );

  const handleNext = (): void => {
    const selected = data.find((q) => q.quoteId === selectedId);
    if (selected) {
      setSelectedQuote({
        dailyRecommendationId,
        quoteId: selected.quoteId,
        content: selected.content,
        title: selected.title,
        author: selected.author,
      });
    }
    router.push(`/diary/write?sentenceId=${selectedId}`);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto px-5 pt-4.5 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex flex-col gap-3.5">
          {visibleQuotes.map((quote) => (
            <SentenceListCard
              key={quote.quoteId}
              sentence={{
                id: String(quote.quoteId),
                quote: quote.content,
                bookTitle: quote.title,
                bookAuthor: quote.author,
              }}
              isSelected={quote.quoteId === selectedId}
              onClick={() => handleSelect(quote.quoteId)}
            />
          ))}
        </div>
      </div>
      <section className="shrink-0 bg-gray-0 px-5 pb-8">
        {canLoadMore ? (
          <DoubleButton
            secondaryLabel="문장 더 불러오기"
            primaryLabel="다음"
            onSecondaryClick={handleLoadMore}
            onPrimaryClick={handleNext}
          />
        ) : (
          <Button label="이 문장으로 일기 쓰기" onClick={handleNext} />
        )}
      </section>
    </div>
  );
};
