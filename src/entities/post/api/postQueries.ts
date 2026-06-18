import { keepPreviousData, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchDiscoveryQuotes, fetchDiscoveryQuotesSearch, fetchPost, fetchPosts } from "./postApi";

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

// ── Discovery ────────────────────────────────────────────────────────────────

export const discoveryKeys = {
  all: ["discovery"] as const,
  feeds: () => [...discoveryKeys.all, "feed"] as const,
  feed: (genre?: string) => [...discoveryKeys.feeds(), { genre }] as const,
  searches: () => [...discoveryKeys.all, "search"] as const,
  search: (query: string, sort: string, genre?: string) =>
    [...discoveryKeys.searches(), { query, sort, genre }] as const,
};

export const useDiscoveryFeedQuery = (genre?: string) =>
  useInfiniteQuery({
    queryKey: discoveryKeys.feed(genre),
    queryFn: ({ pageParam }) =>
      fetchDiscoveryQuotes({ cursor: pageParam as string | undefined, genre }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? (lastPage.nextCursor ?? undefined) : undefined,
    staleTime: 60 * 1000,
  });

export const useDiscoverySearchQuery = (
  query: string,
  sort: "latest" | "scrap" = "latest",
  genre?: string,
) =>
  useInfiniteQuery({
    queryKey: discoveryKeys.search(query, sort, genre),
    queryFn: ({ pageParam }) =>
      fetchDiscoveryQuotesSearch({
        query,
        sort,
        cursor: pageParam as string | undefined,
        genre,
      }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? (lastPage.nextCursor ?? undefined) : undefined,
    enabled: query.length > 0,
    staleTime: 30 * 1000,
    placeholderData: keepPreviousData,
  });
