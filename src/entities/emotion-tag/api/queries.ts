"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchEmotionTags, fetchNeedTags, fetchToneTags } from "./emotionTagApi";

export const emotionTagKeys = {
  all: ["emotionTags"] as const,
  byValue: (value: number) => [...emotionTagKeys.all, value] as const,
};

export const toneTagKeys = {
  all: ["toneTags"] as const,
};

export const needTagKeys = {
  all: ["needTags"] as const,
};

// 감정 강도값(1~9)에 따른 감정 태그 목록 조회
export const useEmotionTagsQuery = (value: number) =>
  useQuery({
    queryKey: emotionTagKeys.byValue(value),
    queryFn: () => fetchEmotionTags(value),
    enabled: value >= 1 && value <= 9,
  });

// 톤 태그 목록 조회 — 변경 없는 정적 데이터이므로 staleTime 무한
export const useToneTagsQuery = () =>
  useQuery({
    queryKey: toneTagKeys.all,
    queryFn: fetchToneTags,
    staleTime: Number.POSITIVE_INFINITY,
  });

// 니드 태그 목록 조회 — 정적 데이터
export const useNeedTagsQuery = () =>
  useQuery({
    queryKey: needTagKeys.all,
    queryFn: fetchNeedTags,
    staleTime: Number.POSITIVE_INFINITY,
  });
