"use client";

import { create } from "zustand";
import { devtools } from "zustand/middleware";

import type { RecommendedSentence } from "@/entities/sentence";

type HomeBannerModalState = {
  selectedSentence: RecommendedSentence | null;
  openModal: (sentence: RecommendedSentence) => void;
  closeModal: () => void;
};

export const useHomeBannerModalStore = create<HomeBannerModalState>()(
  devtools(
    (set) => ({
      selectedSentence: null,
      openModal: (sentence) => set({ selectedSentence: sentence }, false, "openModal"),
      closeModal: () => set({ selectedSentence: null }, false, "closeModal"),
    }),
    { name: "HomeBannerModalStore" },
  ),
);
