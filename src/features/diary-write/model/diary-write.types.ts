export interface CreateDiaryRequest {
  emotionIntensity?: number;
  tagIds?: number[];
  dailyRecommendationId?: number;
  quoteId?: number;
  content?: string | null;
  imageIds?: number[];
}

export interface CreateDiaryResponse {
  diaryId: number;
  createdAt: string;
}
