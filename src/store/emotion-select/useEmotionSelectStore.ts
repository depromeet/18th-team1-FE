"use client";

import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import type { SentenceQuote, TagDto } from "@/entities/sentence";

type SelectedQuote = {
  recommendationId: number;
  quoteId: number;
  content: string;
  title: string;
  author: string;
  image?: string;
  tags: TagDto[];
};

export type LoadingQuote = { content: string; title: string; author: string };

type EmotionSelectFormState = {
  selectedEmotionId: string | null;
  selectedEmotionRangeId: number | null;
  selectedSituationIds: string[];
  situationDescription: string;
  selectedNeedTagId: number | null;
  directSentenceInput: string;
  isAppleVisible: boolean;
  currentRecommendationId: number | null;
  initialRecommendedQuote: SentenceQuote | null;
  listVisibleCount: number;
  selectedQuote: SelectedQuote | null;
  loadingQuotes: LoadingQuote[];
  setSelectedEmotionId: (id: string | null) => void;
  setIsAppleVisible: (visible: boolean) => void;
  setSelectedEmotionRangeId: (id: number | null) => void;
  setSelectedSituationIds: (ids: string[]) => void;
  setSituationDescription: (text: string) => void;
  setSelectedNeedTagId: (id: number | null) => void;
  setDirectSentenceInput: (text: string) => void;
  setCurrentRecommendationId: (id: number | null) => void;
  setInitialRecommendedQuote: (quote: SentenceQuote | null) => void;
  setListVisibleCount: (count: number) => void;
  setSelectedQuote: (quote: SelectedQuote | null) => void;
  setLoadingQuotes: (quotes: LoadingQuote[]) => void;
  reset: () => void;
};

const INITIAL_STATE = {
  selectedEmotionId: null,
  selectedEmotionRangeId: null,
  selectedSituationIds: [] as string[],
  situationDescription: "",
  selectedNeedTagId: null,
  directSentenceInput: "",
  isAppleVisible: false,
  currentRecommendationId: null,
  initialRecommendedQuote: null,
  listVisibleCount: 4,
  selectedQuote: null,
  loadingQuotes: [] as LoadingQuote[],
};

export const useEmotionSelectStore = create<EmotionSelectFormState>()(
  devtools(
    persist(
      (set) => ({
        ...INITIAL_STATE,
        setSelectedEmotionId: (id: string | null): void => {
          set({ selectedEmotionId: id, selectedSituationIds: [] }, false, "setSelectedEmotionId");
        },
        setIsAppleVisible: (visible: boolean): void => {
          set({ isAppleVisible: visible }, false, "setIsAppleVisible");
        },
        setSelectedEmotionRangeId: (id: number | null): void => {
          set({ selectedEmotionRangeId: id }, false, "setSelectedEmotionRangeId");
        },
        setSelectedSituationIds: (ids: string[]): void => {
          set({ selectedSituationIds: ids }, false, "setSelectedSituationIds");
        },
        setSituationDescription: (text: string): void => {
          set({ situationDescription: text }, false, "setSituationDescription");
        },
        setSelectedNeedTagId: (id: number | null): void => {
          set({ selectedNeedTagId: id }, false, "setSelectedNeedTagId");
        },
        setDirectSentenceInput: (text: string): void => {
          set({ directSentenceInput: text }, false, "setDirectSentenceInput");
        },
        setCurrentRecommendationId: (id: number | null): void => {
          set({ currentRecommendationId: id }, false, "setCurrentRecommendationId");
        },
        setInitialRecommendedQuote: (quote: SentenceQuote | null): void => {
          set({ initialRecommendedQuote: quote }, false, "setInitialRecommendedQuote");
        },
        setListVisibleCount: (count: number): void => {
          set({ listVisibleCount: count }, false, "setListVisibleCount");
        },
        setSelectedQuote: (quote: SelectedQuote | null): void => {
          set({ selectedQuote: quote }, false, "setSelectedQuote");
        },
        setLoadingQuotes: (quotes: LoadingQuote[]): void => {
          set({ loadingQuotes: quotes }, false, "setLoadingQuotes");
        },
        reset: (): void => {
          set(INITIAL_STATE, false, "reset");
        },
      }),
      { name: "emotion-select", storage: createJSONStorage(() => sessionStorage) },
    ),
    { name: "EmotionSelectStore" },
  ),
);
