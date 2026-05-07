"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchEmotionTags, fetchToneTags } from "./emotionTagApi";

export const emotionTagKeys = {
  all: ["emotionTags"] as const,
  byValue: (value: number) => [...emotionTagKeys.all, value] as const,
};

export const toneTagKeys = {
  all: ["toneTags"] as const,
};

export const useEmotionTagsQuery = (value: number) =>
  useQuery({
    queryKey: emotionTagKeys.byValue(value),
    queryFn: () => fetchEmotionTags(value),
    enabled: value >= 1 && value <= 100,
  });

export const useToneTagsQuery = () =>
  useQuery({
    queryKey: toneTagKeys.all,
    queryFn: fetchToneTags,
    staleTime: Number.POSITIVE_INFINITY,
  });
