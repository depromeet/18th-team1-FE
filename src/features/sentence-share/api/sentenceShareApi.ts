import { httpClient } from "@/shared/api/http-client";

export type SentenceCardVariant = 1 | 2 | 3;

export const fetchTodaySentenceCardImage = (
  dailyRecommendationId: number,
  variant: SentenceCardVariant,
): Promise<Blob> =>
  httpClient.getBlob(`/recommendations/${dailyRecommendationId}/share?variant=${variant}`);

export const fetchSentencePickCardImage = (
  date: string,
  variant: SentenceCardVariant,
): Promise<Blob> => httpClient.getBlob(`/daily-sentences/${date}/share?variant=${variant}`);
