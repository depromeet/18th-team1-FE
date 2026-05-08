import { httpClient } from "@/shared/api/http-client";

import type {
  SentenceQuote,
  SentenceQuotesRequest,
  SentenceQuotesResponse,
  TodaySentenceExistsResponse,
} from "../model/sentence.types";

export const fetchTodaySentenceExists = (): Promise<TodaySentenceExistsResponse> =>
  httpClient.get<TodaySentenceExistsResponse>("/recommendations/today/exists");

export const createSentenceQuotes = (
  body: SentenceQuotesRequest,
): Promise<SentenceQuotesResponse> =>
  httpClient.post<SentenceQuotesResponse>("/recommendations/quotes", body);

export const fetchAdditionalSentenceQuotes = (
  dailyRecommendationId: number,
): Promise<SentenceQuote[]> =>
  httpClient.post<SentenceQuote[]>(`/recommendations/${dailyRecommendationId}/quotes`);
