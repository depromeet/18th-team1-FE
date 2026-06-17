import { httpClient } from "@/shared/api/http-client";
import type {
  DiscoveryQuoteListResponse,
  DiscoveryQuoteSearchListResponse,
  Post,
  PostListResponse,
} from "../model/post.types";

export const fetchPosts = (genre?: string): Promise<PostListResponse> =>
  httpClient.get<PostListResponse>(`/posts${genre ? `?genre=${genre}` : ""}`);

export const fetchPost = (id: string): Promise<Post> => httpClient.get<Post>(`/posts/${id}`);

// ── Discovery ────────────────────────────────────────────────────────────────

export interface FetchDiscoveryQuotesParams {
  cursor?: string;
  genre?: string;
}

export const fetchDiscoveryQuotes = (
  params: FetchDiscoveryQuotesParams,
): Promise<DiscoveryQuoteListResponse> => {
  const searchParams = new URLSearchParams();
  if (params.cursor) searchParams.set("cursor", params.cursor);
  if (params.genre && params.genre !== "모든 장르") searchParams.set("genre", params.genre);
  const query = searchParams.toString();
  return httpClient.get<DiscoveryQuoteListResponse>(`/discovery/quotes${query ? `?${query}` : ""}`);
};

export interface FetchDiscoveryQuotesSearchParams {
  query: string;
  sort?: "latest" | "scrap";
  cursor?: string;
  genre?: string;
}

export const fetchDiscoveryQuotesSearch = (
  params: FetchDiscoveryQuotesSearchParams,
): Promise<DiscoveryQuoteSearchListResponse> => {
  const searchParams = new URLSearchParams();
  searchParams.set("query", params.query);
  if (params.sort) searchParams.set("sort", params.sort);
  if (params.cursor) searchParams.set("cursor", params.cursor);
  if (params.genre && params.genre !== "모든 장르") searchParams.set("genre", params.genre);
  return httpClient.get<DiscoveryQuoteSearchListResponse>(
    `/discovery/quotes/search?${searchParams.toString()}`,
  );
};
