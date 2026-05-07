"use client";

import { DiaryDetailCard } from "@/entities/diary";
import { useDiaryDetail } from "../model/useDiaryDetail";

export const DiaryDetailView = (): React.ReactElement | null => {
  const diary = useDiaryDetail();

  if (!diary) return null;

  return (
    <div className="flex-1 overflow-y-auto px-5 py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <DiaryDetailCard diary={diary} />
    </div>
  );
};
