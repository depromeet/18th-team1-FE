"use client";

import { useParams } from "next/navigation";
import { type RecommendationDetailResponse, useDiaryDetailQuery } from "@/entities/diary";

export const useDiaryDetail = (): RecommendationDetailResponse | undefined => {
  const params = useParams();
  const id = Number(params.id);

  const { data } = useDiaryDetailQuery(id);
  return data;
};
