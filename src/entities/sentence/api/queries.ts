"use client";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import type { SentenceQuotesRequest, SentenceQuotesResponse } from "../model/sentence.types";
import {
  createSentenceQuotes,
  fetchAdditionalSentenceQuotes,
  fetchTodaySentenceExists,
} from "./sentenceApi";

export const sentenceKeys = {
  all: ["sentences"] as const,
  todayExists: () => [...sentenceKeys.all, "todayExists"] as const,
  quote: (req: SentenceQuotesRequest) => [...sentenceKeys.all, "quote", req] as const,
  additionalQuotes: (dailyRecommendationId: number) =>
    [...sentenceKeys.all, "additionalQuotes", dailyRecommendationId] as const,
};

// 오늘 추천 문장 생성 여부 조회
export const useTodaySentenceExistsQuery = () =>
  useQuery({
    queryKey: sentenceKeys.todayExists(),
    queryFn: fetchTodaySentenceExists,
  });

// 감정/톤 태그 기반 추천 문장 조회 — Suspense 지원
export const useSentenceQuotesQuery = (
  req: SentenceQuotesRequest,
  initialData?: SentenceQuotesResponse,
) =>
  useSuspenseQuery({
    queryKey: sentenceKeys.quote(req),
    queryFn: () => createSentenceQuotes(req),
    staleTime: Number.POSITIVE_INFINITY,
    retry: false,
    initialData,
  });

// dailyRecommendationId 기준 추가 문장 목록 조회 — Suspense 지원
export const useAdditionalSentenceQuotesQuery = (dailyRecommendationId: number) =>
  useSuspenseQuery({
    queryKey: sentenceKeys.additionalQuotes(dailyRecommendationId),
    queryFn: () => fetchAdditionalSentenceQuotes(dailyRecommendationId),
    staleTime: Number.POSITIVE_INFINITY,
    retry: false,
  });
