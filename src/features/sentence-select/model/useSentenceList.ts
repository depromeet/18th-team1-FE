"use client";

import { useState } from "react";

import type { SentenceQuote } from "@/entities/sentence";

const BATCH_SIZE = 3;
const MAX_COUNT = 9;

interface UseSentenceListReturn {
  visibleQuotes: SentenceQuote[];
  selectedId: number;
  canLoadMore: boolean;
  handleSelect: (id: number) => void;
  handleLoadMore: () => void;
}

export const useSentenceList = (
  initialQuoteId: number,
  allQuotes: SentenceQuote[],
): UseSentenceListReturn => {
  const initialIndex = allQuotes.findIndex((quote) => quote.quoteId === initialQuoteId);
  const resolvedInitialQuoteId = initialIndex >= 0 ? initialQuoteId : (allQuotes[0]?.quoteId ?? -1);
  const initialVisibleCount = Math.max(BATCH_SIZE, initialIndex + 1);

  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);
  const [selectedId, setSelectedId] = useState(resolvedInitialQuoteId);

  const visibleQuotes = allQuotes.slice(0, visibleCount);
  const canLoadMore = visibleCount < MAX_COUNT && visibleCount < allQuotes.length;

  const handleSelect = (id: number): void => {
    setSelectedId(id);
  };

  const handleLoadMore = (): void => {
    setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, MAX_COUNT));
  };

  return { visibleQuotes, selectedId, canLoadMore, handleSelect, handleLoadMore };
};
