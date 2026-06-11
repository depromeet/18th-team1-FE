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

type EmotionSelectFormState = {
  selectedEmotionId: string | null;
  selectedSituationIds: string[];
  situationDescription: string;
  selectedSentenceTypeIds: string[];
  directSentenceInput: string;
  selectedQuote: SelectedQuote | null;
  setSelectedEmotionId: (id: string | null) => void;
  setSelectedSituationIds: (ids: string[]) => void;
  setSituationDescription: (text: string) => void;
  setSelectedSentenceTypeIds: (ids: string[]) => void;
  setDirectSentenceInput: (text: string) => void;
  setSelectedQuote: (quote: SelectedQuote | null) => void;
  reset: () => void;
};

const INITIAL_STATE = {
  selectedEmotionId: null,
  selectedSituationIds: [] as string[],
  situationDescription: "",
  selectedSentenceTypeIds: [] as string[],
  directSentenceInput: "",
  selectedQuote: null,
};

export const useEmotionSelectStore = create<EmotionSelectFormState>()(
  devtools(
    persist(
      (set) => ({
        ...INITIAL_STATE,
        setSelectedEmotionId: (id: string | null): void => {
          set({ selectedEmotionId: id, selectedSituationIds: [] }, false, "setSelectedEmotionId");
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
        setDirectSentenceInput: (text: string): void => {
          set({ directSentenceInput: text }, false, "setDirectSentenceInput");
        },
        setSelectedQuote: (quote: SelectedQuote | null): void => {
          set({ selectedQuote: quote }, false, "setSelectedQuote");
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
