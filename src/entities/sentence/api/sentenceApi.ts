import { httpClient } from "@/shared/api/http-client";

import type {
  RecommendationDetailResponse,
  SentenceQuote,
  StartRecommendationRequest,
  StartRecommendationResponse,
  TodayStatusResponse,
} from "../model/sentence.types";

export const startRecommendation = (
  body: StartRecommendationRequest,
): Promise<StartRecommendationResponse> =>
  httpClient.post<StartRecommendationResponse>("/recommendations/quotes", body);

export const fetchRecommendationQuotes = (recommendationId: number): Promise<SentenceQuote[]> =>
  httpClient.get<SentenceQuote[]>(`/recommendations/${recommendationId}/quotes`);

export const selectRecommendationQuote = (
  recommendationId: number,
  quoteId: number,
): Promise<RecommendationDetailResponse> =>
  httpClient.post<RecommendationDetailResponse>(
    `/recommendations/${recommendationId}/quotes/${quoteId}/select`,
  );

export const fetchTodayStatus = (): Promise<TodayStatusResponse> =>
  httpClient.get<TodayStatusResponse>("/home/today/status");
