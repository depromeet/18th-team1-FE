import { httpClient } from "@/shared/api/http-client";

import type { ScrappedQuotesResponse } from "../model/scrap.types";

export const fetchScrappedQuotes = (params?: {
  cursor?: string;
  limit?: number;
}): Promise<ScrappedQuotesResponse> => {
  const searchParams = new URLSearchParams();
  if (params?.cursor) searchParams.set("cursor", params.cursor);
  if (params?.limit) searchParams.set("limit", String(params.limit));
  const query = searchParams.toString();
  return httpClient.get<ScrappedQuotesResponse>(
    `/my-page/scrapped-quotes${query ? `?${query}` : ""}`,
  );
};
