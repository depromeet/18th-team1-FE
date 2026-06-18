import { httpClient } from "@/shared/api/http-client";
import type {
  RecommendationDetailResponse,
  RecommendationListResponse,
} from "../model/diary.types";

export interface TodayDiaryExistsResponse {
  exists: boolean;
  diaryId: number | null;
}

export const fetchTodayDiaryExists = (): Promise<TodayDiaryExistsResponse> =>
  httpClient.get<TodayDiaryExistsResponse>("/diaries/today/exists");

export const fetchDiaries = (start: string, end: string): Promise<RecommendationListResponse> =>
  httpClient.get<RecommendationListResponse>(`/recommendations?start=${start}&end=${end}`);

export const fetchDiaryDetail = (recommendationId: number): Promise<RecommendationDetailResponse> =>
  httpClient.get<RecommendationDetailResponse>(`/recommendations/${recommendationId}`);

export const deleteDiary = (recommendationId: number) =>
  httpClient.delete(`/recommendations/${recommendationId}`);
