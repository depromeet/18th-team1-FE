"use client";

import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";

import {
  fetchRecommendationQuotes,
  fetchTodayStatus,
  selectRecommendationQuote,
} from "./sentenceApi";

export const sentenceKeys = {
  all: ["sentences"] as const,
  todayStatus: () => [...sentenceKeys.all, "todayStatus"] as const,
  quotes: (recommendationId: number) => [...sentenceKeys.all, "quotes", recommendationId] as const,
};

// 오늘 진행 상태 조회
export const useTodayStatusQuery = () =>
  useQuery({
    queryKey: sentenceKeys.todayStatus(),
    queryFn: fetchTodayStatus,
  });

// 추천 후보 문장 목록 조회 — Suspense 지원
export const useRecommendationQuotesQuery = (recommendationId: number) =>
  useSuspenseQuery({
    queryKey: sentenceKeys.quotes(recommendationId),
    queryFn: () => fetchRecommendationQuotes(recommendationId),
    staleTime: Number.POSITIVE_INFINITY,
    retry: false,
  });

// 최종 문장 선택 뮤테이션
export const useSelectQuoteMutation = () =>
  useMutation({
    mutationFn: ({ recommendationId, quoteId }: { recommendationId: number; quoteId: number }) =>
      selectRecommendationQuote(recommendationId, quoteId),
  });
