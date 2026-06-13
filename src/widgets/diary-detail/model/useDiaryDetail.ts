"use client";

import { useParams } from "next/navigation";
import type { DiaryDetail } from "@/entities/diary";
// import { useDiaryDetailQuery } from "@/entities/diary";
import { MOCK_CALENDAR_DIARIES } from "@/mock";

export const useDiaryDetail = (): DiaryDetail | undefined => {
  const params = useParams();
  const id = Number(params.id);

  // const { data } = useDiaryDetailQuery(id);
  // return data;

  const found = MOCK_CALENDAR_DIARIES.diaries.find((d) => d.id === id);
  if (!found) return undefined;
  return { ...found, emotions: found.tags };
};
