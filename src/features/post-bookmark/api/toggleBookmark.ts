import { httpClient } from "@/shared/api/http-client";

export const toggleBookmark = (postId: string): Promise<void> =>
  httpClient.post(`/posts/${postId}/bookmark`);
