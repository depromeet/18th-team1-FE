"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { SentenceQuotesRequest } from "../model/sentence.types";
import { sentenceKeys } from "./queries";
import { createSentenceQuotes, fetchAdditionalSentenceQuotes } from "./sentenceApi";

// 감정/톤 태그 기반 추천 문장 생성 — 성공 시 오늘 추천 존재 여부 캐시 무효화
export const useCreateSentenceQuotesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: SentenceQuotesRequest) => createSentenceQuotes(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sentenceKeys.todayExists() });
    },
  });
};

// 동일 추천 ID 기준 추가 문장 요청 (3개)
export const useAdditionalSentenceQuotesMutation = () =>
  useMutation({
    mutationFn: (dailyRecommendationId: number) =>
      fetchAdditionalSentenceQuotes(dailyRecommendationId),
  });
