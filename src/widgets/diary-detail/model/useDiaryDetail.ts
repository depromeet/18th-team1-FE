"use client";

import { useParams } from "next/navigation";
import { type DiaryDetail, useDiaryStore } from "@/entities/diary";
import { MOCK_CALENDAR_DIARIES } from "@/mock";

export const useDiaryDetail = (): DiaryDetail | undefined => {
  const { selectedDiary } = useDiaryStore();
  const params = useParams();
  const id = Number(params.id);

  return (
    selectedDiary ??
    MOCK_CALENDAR_DIARIES.diaries.find((d) => d.id === id) ??
    MOCK_CALENDAR_DIARIES.diaries.at(0)
  );
};
