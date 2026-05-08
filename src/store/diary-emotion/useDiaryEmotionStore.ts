"use client";

import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type SelectedQuote = {
  dailyRecommendationId: number;
  quoteId: number;
  content: string;
  title: string;
  author: string;
};

type DiaryEmotionFormState = {
  selectedEmotionId: string | null;
  selectedSituationIds: string[];
  situationDescription: string;
  selectedSentenceTypeIds: string[];
  selectedQuote: SelectedQuote | null;
  setSelectedEmotionId: (id: string | null) => void;
  setSelectedSituationIds: (ids: string[]) => void;
  setSituationDescription: (text: string) => void;
  setSelectedSentenceTypeIds: (ids: string[]) => void;
  setSelectedQuote: (quote: SelectedQuote | null) => void;
  reset: () => void;
};

const INITIAL_STATE = {
  selectedEmotionId: null,
  selectedSituationIds: [] as string[],
  situationDescription: "",
  selectedSentenceTypeIds: [] as string[],
  selectedQuote: null,
};

export const useDiaryEmotionStore = create<DiaryEmotionFormState>()(
  devtools(
    persist(
      (set) => ({
        ...INITIAL_STATE,
        setSelectedEmotionId: (id: string | null): void => {
          set({ selectedEmotionId: id }, false, "setSelectedEmotionId");
        },
        setSelectedSituationIds: (ids: string[]): void => {
          set({ selectedSituationIds: ids }, false, "setSelectedSituationIds");
        },
        setSituationDescription: (text: string): void => {
          set({ situationDescription: text }, false, "setSituationDescription");
        },
        setSelectedSentenceTypeIds: (ids: string[]): void => {
          set({ selectedSentenceTypeIds: ids }, false, "setSelectedSentenceTypeIds");
        },
        setSelectedQuote: (quote: SelectedQuote | null): void => {
          set({ selectedQuote: quote }, false, "setSelectedQuote");
        },
        reset: (): void => {
          set(INITIAL_STATE, false, "reset");
        },
      }),
      {
        name: "diary-emotion-form",
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
    { name: "DiaryEmotionStore" },
  ),
);
