"use client";

import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface SentenceShareDrawerData {
  shareType: "today-sentence" | "sentence-pick";
  date?: string;
  sentencePickData?: { quote: string; title: string; author: string; coverImageUrl?: string };
}

type SentenceShareDrawerStore = {
  isOpen: boolean;
  data: SentenceShareDrawerData;
  open: (data: SentenceShareDrawerData) => void;
  close: () => void;
};

export const useSentenceShareDrawerStore = create<SentenceShareDrawerStore>()(
  devtools(
    (set) => ({
      isOpen: false,
      data: { shareType: "today-sentence" },
      open: (data): void => {
        set({ isOpen: true, data }, false, "sentenceShareDrawer/open");
      },
      close: (): void => {
        set({ isOpen: false }, false, "sentenceShareDrawer/close");
      },
    }),
    { name: "SentenceShareDrawerStore" },
  ),
);
