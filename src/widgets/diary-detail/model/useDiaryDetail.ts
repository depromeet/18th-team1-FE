"use client";

import { useParams } from "next/navigation";
import { type DiaryDetail, useDiaryDetailQuery } from "@/entities/diary";

export const useDiaryDetail = (): DiaryDetail | undefined => {
  const params = useParams();
  const id = Number(params.id);
  const { data } = useDiaryDetailQuery(id);
  return data;
};
