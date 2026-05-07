import { httpClient } from "@/shared/api/http-client";

import type { EmotionTagsResponse, ToneTagsResponse } from "../model/emotionTag.types";

export const fetchEmotionTags = (value: number): Promise<EmotionTagsResponse> =>
  httpClient.get<EmotionTagsResponse>(`/emotions/emotion-tags?value=${value}`);

export const fetchToneTags = (): Promise<ToneTagsResponse> =>
  httpClient.get<ToneTagsResponse>("/emotions/tone-tags");
