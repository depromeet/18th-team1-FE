import { httpClient } from "@/shared/api/http-client";

export interface TodayDiaryExistsResponse {
  exists: boolean;
  diaryId: number | null;
}

export const fetchTodayDiaryExists = (): Promise<TodayDiaryExistsResponse> =>
  httpClient.get<TodayDiaryExistsResponse>("/diaries/today/exists");
