import { httpClient } from "@/shared/api/http-client";

import type { CreateDiaryRequest, CreateDiaryResponse } from "../model/diary-write.types";

export const fetchCreateDiary = (body: CreateDiaryRequest): Promise<CreateDiaryResponse> =>
  httpClient.post<CreateDiaryResponse>("/diaries", body);
