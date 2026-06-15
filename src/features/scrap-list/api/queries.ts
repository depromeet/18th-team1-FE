"use client";

import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { bulkDeleteScraps, scrapQuote, unscrapQuote } from "@/entities/sentence";

import { fetchScrappedQuotes } from "./scrapApi";

export const scrapKeys = {
  all: ["scraps"] as const,
  list: () => [...scrapKeys.all, "list"] as const,
};

export const useScrappedQuotesQuery = () =>
  useInfiniteQuery({
    queryKey: scrapKeys.list(),
    queryFn: ({ pageParam }: { pageParam: string | undefined }) =>
      fetchScrappedQuotes({ cursor: pageParam }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? (lastPage.nextCursor ?? undefined) : undefined,
  });

export const useScrapMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (quoteId: number) => scrapQuote(quoteId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: scrapKeys.list() }),
  });
};

export const useUnscrapMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (quoteId: number) => unscrapQuote(quoteId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: scrapKeys.list() }),
  });
};

export const useBulkDeleteScrapsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (quoteIds: number[]) => bulkDeleteScraps(quoteIds),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: scrapKeys.list() }),
  });
};
