import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { RecommendationListItem } from "./diary.types";

type DiaryState = {
  selectedDiary: RecommendationListItem | null;
  setSelectedDiary: (diary: RecommendationListItem | null) => void;
};

export const useDiaryStore = create<DiaryState>()(
  devtools(
    (set) => ({
      selectedDiary: null,
      setSelectedDiary: (diary: RecommendationListItem | null) => {
        set({ selectedDiary: diary }, false, "diary/setSelectedDiary");
      },
    }),
    { name: "DiaryStore" },
  ),
);
