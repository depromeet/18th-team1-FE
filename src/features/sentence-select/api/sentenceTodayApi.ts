import { httpClient } from "@/shared/api/http-client";

export const fetchSentenceTodayImage = (dailyRecommendationId: number): Promise<Blob> =>
  httpClient.getBlob(`/recommendations/${dailyRecommendationId}/share`);
