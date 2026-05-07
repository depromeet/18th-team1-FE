import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { DiaryDetail } from "./diary.types";

type DiaryState = {
  selectedDiary: DiaryDetail | null;
  setSelectedDiary: (diary: DiaryDetail | null) => void;
};

export const useDiaryStore = create<DiaryState>()(
  devtools(
    (set) => ({
      selectedDiary: null,
      setSelectedDiary: (diary: DiaryDetail | null): void => {
        set({ selectedDiary: diary }, false, "diary/setSelectedDiary");
      },
    }),
    { name: "DiaryStore" },
  ),
);
