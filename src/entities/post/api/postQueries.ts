import { useQuery } from "@tanstack/react-query";
import { fetchPost, fetchPosts } from "./postApi";

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
