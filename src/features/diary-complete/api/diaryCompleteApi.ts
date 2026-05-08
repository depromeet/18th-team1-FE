import { httpClient } from "@/shared/api/http-client";

export const fetchDiaryShareImage = (diaryId: number): Promise<Blob> =>
  httpClient.getBlob(`/diaries/${diaryId}/share`);
