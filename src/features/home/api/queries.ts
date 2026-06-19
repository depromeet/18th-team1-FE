"use client";

import { type UseQueryResult, useQuery } from "@tanstack/react-query";

import { useAuthStore } from "@/store/auth/useAuthStore";

import type { HomeSummaryResponse, QuoteResponse } from "../model/home.types";
import { fetchHomeRandom, fetchHomeSummary } from "./homeApi";

export const homeKeys = {
  all: ["home"] as const,
  random: () => [...homeKeys.all, "random"] as const,
  summary: () => [...homeKeys.all, "summary"] as const,
};

export const useHomeRandomQuery = (): UseQueryResult<QuoteResponse[]> =>
  useQuery({
    queryKey: homeKeys.random(),
    queryFn: fetchHomeRandom,
    retry: false,
  });

export const useHomeSummaryQuery = (): UseQueryResult<HomeSummaryResponse> => {
  const accessToken = useAuthStore((state) => state.accessToken);
  return useQuery({
    queryKey: homeKeys.summary(),
    queryFn: fetchHomeSummary,
    enabled: !!accessToken,
  });
};
