import { keepPreviousData, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  fetchDiscoveryQuotes,
  fetchDiscoveryQuotesSearch,
  fetchGenres,
  fetchPost,
  fetchPosts,
} from "./postApi";

export const postKeys = {
  all: ["posts"] as const,
  lists: () => [...postKeys.all, "list"] as const,
  list: (genre?: string) => [...postKeys.lists(), { genre }] as const,
  details: () => [...postKeys.all, "detail"] as const,
  detail: (id: string) => [...postKeys.details(), id] as const,
};

export const usePostsQuery = (genre?: string) =>
  useQuery({
    queryKey: postKeys.list(genre),
    queryFn: () => fetchPosts(genre),
  });

export const usePostQuery = (id: string) =>
  useQuery({
    queryKey: postKeys.detail(id),
    queryFn: () => fetchPost(id),
    enabled: !!id,
  });

// ── Genres ───────────────────────────────────────────────────────────────────

export const genreKeys = {
  all: ["genres"] as const,
};

export const useGenresQuery = () =>
  useQuery({
    queryKey: genreKeys.all,
    queryFn: fetchGenres,
    staleTime: Infinity,
  });

// ── Discovery ────────────────────────────────────────────────────────────────

export const discoveryKeys = {
  all: ["discovery"] as const,
  feeds: () => [...discoveryKeys.all, "feed"] as const,
  feed: (genreId?: number) => [...discoveryKeys.feeds(), { genreId }] as const,
  searches: () => [...discoveryKeys.all, "search"] as const,
  search: (query: string, sort: string, genreId?: number) =>
    [...discoveryKeys.searches(), { query, sort, genreId }] as const,
};

export const useDiscoveryFeedQuery = (genreId?: number) =>
  useInfiniteQuery({
    queryKey: discoveryKeys.feed(genreId),
    queryFn: ({ pageParam }) =>
      fetchDiscoveryQuotes({ cursor: pageParam as string | undefined, genreId }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? (lastPage.nextCursor ?? undefined) : undefined,
    staleTime: 60 * 1000,
  });

export const useDiscoverySearchQuery = (
  query: string,
  sort: "latest" | "scrap" = "latest",
  genreId?: number,
) =>
  useInfiniteQuery({
    queryKey: discoveryKeys.search(query, sort, genreId),
    queryFn: ({ pageParam }) =>
      fetchDiscoveryQuotesSearch({
        query,
        sort,
        cursor: pageParam as string | undefined,
        genreId,
      }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? (lastPage.nextCursor ?? undefined) : undefined,
    enabled: query.length > 0,
    staleTime: 30 * 1000,
    placeholderData: keepPreviousData,
  });
