import { httpClient } from "@/shared/api/http-client";

export const scrapQuote = (quoteId: number): Promise<void> =>
  httpClient.put(`/quotes/${quoteId}/scrap`);

export const unscrapQuote = (quoteId: number): Promise<void> =>
  httpClient.delete(`/quotes/${quoteId}/scrap`);
