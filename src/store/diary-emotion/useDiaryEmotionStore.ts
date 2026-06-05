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

const RECOMMENDATION_PARAMS_KEY = "recommendation-params";
const QUOTES_RESPONSE_KEY = "quotes-response";

type RecommendationParams = {
  emotionTagIds: string[];
  toneTagIds: string[];
};

export const saveRecommendationParams = (params: RecommendationParams) => {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(RECOMMENDATION_PARAMS_KEY, JSON.stringify(params));
};

export const loadRecommendationParams = (): RecommendationParams | null => {
  if (typeof window === "undefined") return null;
  const stored = sessionStorage.getItem(RECOMMENDATION_PARAMS_KEY);
  return stored ? (JSON.parse(stored) as RecommendationParams) : null;
};

export const saveQuotesResponse = <T>(data: T) => {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(QUOTES_RESPONSE_KEY, JSON.stringify(data));
};

export const loadQuotesResponse = <T>(): T | null => {
  if (typeof window === "undefined") return null;
  const stored = sessionStorage.getItem(QUOTES_RESPONSE_KEY);
  return stored ? (JSON.parse(stored) as T) : null;
};

export const clearDiarySessionStorage = () => {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(RECOMMENDATION_PARAMS_KEY);
  sessionStorage.removeItem(QUOTES_RESPONSE_KEY);
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
      (set, get) => ({
        ...INITIAL_STATE,
        setSelectedEmotionId: (id: string | null) => {
          set({ selectedEmotionId: id }, false, "setSelectedEmotionId");
        },
        setSelectedSituationIds: (ids: string[]) => {
          set({ selectedSituationIds: ids }, false, "setSelectedSituationIds");
          saveRecommendationParams({
            emotionTagIds: ids,
            toneTagIds: get().selectedSentenceTypeIds,
          });
        },
        setSituationDescription: (text: string) => {
          set({ situationDescription: text }, false, "setSituationDescription");
        },
        setSelectedSentenceTypeIds: (ids: string[]) => {
          set({ selectedSentenceTypeIds: ids }, false, "setSelectedSentenceTypeIds");
          saveRecommendationParams({ emotionTagIds: get().selectedSituationIds, toneTagIds: ids });
        },
        setSelectedQuote: (quote: SelectedQuote | null) => {
          set({ selectedQuote: quote }, false, "setSelectedQuote");
        },
        reset: () => {
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
