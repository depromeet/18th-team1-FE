"use client";

import { useRouter } from "next/navigation";

import { useRecommendationQuotesQuery, useSelectQuoteMutation } from "@/entities/sentence";
import { SentenceSelectCard, useSentenceList } from "@/features/sentence-select";
import { NewDoubleButton } from "@/shared/ui/new-double-button";
import { useEmotionSelectStore } from "@/store/emotion-select/useEmotionSelectStore";

const PAGE_SIZE = 3;

export const SentenceListView = () => {
  const router = useRouter();
  const { currentRecommendationId, listVisibleCount, setListVisibleCount, setSelectedQuote } =
    useEmotionSelectStore();
  const recommendationId = currentRecommendationId ?? 0;

  const { data: quotes } = useRecommendationQuotesQuery(recommendationId);

  const visibleQuotes = quotes.slice(0, listVisibleCount);
  const hasMore = listVisibleCount < quotes.length;

  const { mutateAsync: selectQuote } = useSelectQuoteMutation();
  const { selectedId, handleSelect } = useSentenceList(visibleQuotes[0]?.quoteId ?? -1);

  const handleLoadMore = (): void => {
    if (!hasMore) return;
    setListVisibleCount(listVisibleCount + PAGE_SIZE);
  };

  const handleNext = async (): Promise<void> => {
    const selected = visibleQuotes.find((q) => q.quoteId === selectedId);
    if (!selected) return;
    const result = await selectQuote({ recommendationId, quoteId: selected.quoteId });
    setSelectedQuote({
      recommendationId: result.recommendationId,
      quoteId: result.quote.quoteId,
      content: result.quote.content,
      title: result.quote.title,
      author: result.quote.author,
      image: result.quote.image,
      tags: [...result.emotionTags, ...(result.needTag ? [result.needTag] : [])],
    });
    router.push("/sentence/today");
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto px-5 pt-4.5 pb-9 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex flex-col gap-3">
          {visibleQuotes.map((quote) => (
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
