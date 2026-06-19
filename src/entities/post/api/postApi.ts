import { httpClient } from "@/shared/api/http-client";
import type {
  DiscoveryQuoteListResponse,
  DiscoveryQuoteSearchListResponse,
  GenreDto,
  Post,
  PostListResponse,
} from "../model/post.types";

export const fetchPosts = (genre?: string): Promise<PostListResponse> =>
  httpClient.get<PostListResponse>(`/posts${genre ? `?genre=${genre}` : ""}`);

export const fetchPost = (id: string): Promise<Post> => httpClient.get<Post>(`/posts/${id}`);

// ── Genres ───────────────────────────────────────────────────────────────────

export const fetchGenres = async (): Promise<GenreDto[]> => {
  // biome-ignore lint/style/useNamingConvention: API response uses snake_case
  type RawGenre = { label: string; genre_id: number };
  const raw = await httpClient.get<RawGenre[]>("/genres");
  return raw.map((item) => ({ label: item.label, genreId: item.genre_id }));
};

// ── Discovery ────────────────────────────────────────────────────────────────

export interface FetchDiscoveryQuotesParams {
  cursor?: string;
  genreId?: number;
}

export const fetchDiscoveryQuotes = (
  params: FetchDiscoveryQuotesParams,
): Promise<DiscoveryQuoteListResponse> => {
  const searchParams = new URLSearchParams();
  if (params.cursor) searchParams.set("cursor", params.cursor);
  if (params.genreId !== undefined) searchParams.set("genre", String(params.genreId));
  const query = searchParams.toString();
  return httpClient.get<DiscoveryQuoteListResponse>(`/discovery/quotes${query ? `?${query}` : ""}`);
};

export interface FetchDiscoveryQuotesSearchParams {
  query: string;
  sort?: "latest" | "scrap";
  cursor?: string;
  genreId?: number;
}

export const fetchDiscoveryQuotesSearch = (
  params: FetchDiscoveryQuotesSearchParams,
): Promise<DiscoveryQuoteSearchListResponse> => {
  const searchParams = new URLSearchParams();
  searchParams.set("query", params.query);
  if (params.sort) searchParams.set("sort", params.sort);
  if (params.cursor) searchParams.set("cursor", params.cursor);
  if (params.genreId !== undefined) searchParams.set("genre", String(params.genreId));
  return httpClient.get<DiscoveryQuoteSearchListResponse>(
    `/discovery/quotes/search?${searchParams.toString()}`,
  );
};
