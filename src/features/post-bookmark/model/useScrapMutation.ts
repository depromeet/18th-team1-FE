"use client";

import { useQueryClient } from "@tanstack/react-query";
import type {
  DiscoveryQuoteDto,
  DiscoveryQuoteListResponse,
  DiscoveryQuoteSearchDto,
  DiscoveryQuoteSearchListResponse,
} from "@/entities/post";
import { discoveryKeys } from "@/entities/post";
import { scrapQuote, unscrapQuote } from "../api/scrapApi";

type InfinitePage<T> = { pages: T[]; pageParams: unknown[] };

const patchIsScrapped = <T extends { quoteId: number; isScrapped: boolean }>(
  data: InfinitePage<{ quotes: T[]; nextCursor: string | null; hasNext: boolean }> | undefined,
  quoteId: number,
  isScrapped: boolean,
) => {
  if (!data) return data;
  return {
    ...data,
    pages: data.pages.map((page) => ({
      ...page,
      quotes: page.quotes.map((q) => (q.quoteId === quoteId ? { ...q, isScrapped } : q)),
    })),
  };
};

export const useScrapMutation = () => {
  const queryClient = useQueryClient();

  const toggle = async (quoteId: number, currentIsScrapped: boolean) => {
    const nextIsScrapped = !currentIsScrapped;

    await queryClient.cancelQueries({ queryKey: discoveryKeys.all });

    const previousFeed = queryClient.getQueriesData<InfinitePage<DiscoveryQuoteListResponse>>({
      queryKey: discoveryKeys.feeds(),
    });
    const previousSearch = queryClient.getQueriesData<
      InfinitePage<DiscoveryQuoteSearchListResponse>
    >({
      queryKey: discoveryKeys.searches(),
    });

    queryClient.setQueriesData<InfinitePage<DiscoveryQuoteListResponse>>(
      { queryKey: discoveryKeys.feeds() },
      (old) => patchIsScrapped<DiscoveryQuoteDto>(old, quoteId, nextIsScrapped),
    );
    queryClient.setQueriesData<InfinitePage<DiscoveryQuoteSearchListResponse>>(
      { queryKey: discoveryKeys.searches() },
      (old) => patchIsScrapped<DiscoveryQuoteSearchDto>(old, quoteId, nextIsScrapped),
    );

    try {
      if (currentIsScrapped) {
        await unscrapQuote(quoteId);
      } else {
        await scrapQuote(quoteId);
      }
    } catch (error) {
      for (const [key, value] of previousFeed) {
        queryClient.setQueryData(key, value);
      }
      for (const [key, value] of previousSearch) {
        queryClient.setQueryData(key, value);
      }
      console.error("스크랩 처리 실패, 롤백됨:", error);
    } finally {
      queryClient.invalidateQueries({ queryKey: discoveryKeys.all });
      queryClient.invalidateQueries({ queryKey: ["scraps"] });
    }
  };

  return { toggle };
};
