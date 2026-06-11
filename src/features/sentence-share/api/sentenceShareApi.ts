import { httpClient } from "@/shared/api/http-client";

export const fetchSentenceShareImage = (dailyRecommendationId: number): Promise<Blob> =>
  httpClient.getBlob(`/recommendations/${dailyRecommendationId}/share`);
