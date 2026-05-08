"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import type { SentenceQuote } from "@/entities/sentence";
import {
  fetchAdditionalSentenceQuotes,
  SentenceListCard,
  useAdditionalSentenceQuotesQuery,
} from "@/entities/sentence";
import { DoubleButton } from "@/shared/ui/double-button";
import { useDiaryEmotionStore } from "@/store/diary-emotion/useDiaryEmotionStore";

import { useSentenceList } from "../model/useSentenceList";

const MAX_LOAD_COUNT = 3;

export const SentenceListView = (): React.ReactElement => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dailyRecommendationId = Number(searchParams.get("dailyRecommendationId"));

  const { data: initialData } = useAdditionalSentenceQuotesQuery(dailyRecommendationId);
  const [quotes, setQuotes] = useState<SentenceQuote[]>(initialData);
  const [loadCount, setLoadCount] = useState(0);

  const { setSelectedQuote } = useDiaryEmotionStore();
  const { selectedId, handleSelect } = useSentenceList(quotes[0]?.quoteId ?? -1);

  const handleLoadMore = async (): Promise<void> => {
    if (loadCount >= MAX_LOAD_COUNT) {
      alert("추천 문장은 최대 3번까지 더 불러올 수 있어요.");
      return;
    }
    const newQuotes = await fetchAdditionalSentenceQuotes(dailyRecommendationId);
    setQuotes((prev) => [...prev, ...newQuotes]);
    setLoadCount((prev) => prev + 1);
  };

  const handleNext = (): void => {
    const selected = quotes.find((q) => q.quoteId === selectedId);
    if (!selected) return;
    setSelectedQuote({
      dailyRecommendationId,
      quoteId: selected.quoteId,
      content: selected.content,
      title: selected.title,
      author: selected.author,
    });
    router.push("/diary/write");
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto px-5 pt-4.5 pb-9 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex flex-col gap-3.5">
          {quotes.map((quote) => (
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
      <section className="relative shrink-0 bg-gray-0 px-5 pb-8">
        <div className="pointer-events-none absolute inset-x-0 -top-16 h-16 bg-linear-to-b from-transparent to-gray-0" />
        <DoubleButton
          secondaryLabel="문장 더 불러오기"
          primaryLabel="다음"
          onSecondaryClick={handleLoadMore}
          onPrimaryClick={handleNext}
        />
      </section>
    </div>
  );
};
