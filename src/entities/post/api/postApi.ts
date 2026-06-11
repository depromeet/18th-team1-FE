import { httpClient } from "@/shared/api/http-client";
import type { Post, PostListResponse } from "../model/post.types";

export const fetchPosts = (genre?: string): Promise<PostListResponse> =>
  httpClient.get<PostListResponse>(`/posts${genre ? `?genre=${genre}` : ""}`);

export const fetchPost = (id: string): Promise<Post> => httpClient.get<Post>(`/posts/${id}`);
