"use client";

import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type DiaryEmotionFormState = {
  selectedEmotionId: string | null;
  selectedSituationIds: string[];
  situationDescription: string;
  selectedSentenceTypeIds: string[];
  setSelectedEmotionId: (id: string | null) => void;
  setSelectedSituationIds: (ids: string[]) => void;
  setSituationDescription: (text: string) => void;
  setSelectedSentenceTypeIds: (ids: string[]) => void;
  reset: () => void;
};

const INITIAL_STATE = {
  selectedEmotionId: null,
  selectedSituationIds: [] as string[],
  situationDescription: "",
  selectedSentenceTypeIds: [] as string[],
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
