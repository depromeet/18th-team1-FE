import { httpClient } from "@/shared/api/http-client";

import type {
  EmotionTagsResponse,
  NeedTagsResponse,
  ToneTagsResponse,
} from "../model/emotionTag.types";

export const fetchEmotionTags = (value: number): Promise<EmotionTagsResponse> =>
  httpClient.get<EmotionTagsResponse>(`/emotions/emotion-tags?value=${value}`);

export const fetchToneTags = (): Promise<ToneTagsResponse> =>
  httpClient.get<ToneTagsResponse>("/emotions/tone-tags");

export const fetchNeedTags = (): Promise<NeedTagsResponse> =>
  httpClient.get<NeedTagsResponse>("/emotions/need-tags");
