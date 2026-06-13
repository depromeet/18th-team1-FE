"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import type { SentenceQuote } from "@/entities/sentence";
import {
  fetchAdditionalSentenceQuotes,
  useAdditionalSentenceQuotesQuery,
} from "@/entities/sentence";
import { SentenceSelectCard, useSentenceList } from "@/features/sentence-select";
import { NewDoubleButton } from "@/shared/ui/new-double-button";
import { useEmotionSelectStore } from "@/store/emotion-select/useEmotionSelectStore";

const MAX_LOAD_COUNT = 3;

export const SentenceListView = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dailyRecommendationId = Number(searchParams.get("dailyRecommendationId"));
  const { data: initialData } = useAdditionalSentenceQuotesQuery(dailyRecommendationId);
  const [quotes, setQuotes] = useState<SentenceQuote[]>(initialData);
  const [loadCount, setLoadCount] = useState(0);

  const { setSelectedQuote } = useEmotionSelectStore();
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
    router.push("/sentence/today");
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto px-5 pt-4.5 pb-9 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex flex-col gap-3">
          {quotes.map((quote) => (
            <SentenceSelectCard
              key={quote.quoteId}
              quote={quote.content}
              bookTitle={quote.title}
              bookAuthor={quote.author}
              isSelected={quote.quoteId === selectedId}
              onClick={() => handleSelect(quote.quoteId)}
            />
          ))}
        </div>
      </div>
      <section className="relative shrink-0">
        <div className="relative z-10">
          <NewDoubleButton
            left={{ label: "문장 더 불러오기", isMuted: true, onClick: handleLoadMore }}
            right={{ label: "다음", onClick: handleNext }}
          />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-[rgba(255,255,255,0)] to-white" />
      </section>
    </div>
  );
};
