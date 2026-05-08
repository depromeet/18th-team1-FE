import { httpClient } from "@/shared/api/http-client";

import type { HomeSummaryResponse, QuoteResponse } from "../model/home.types";

export const fetchHomeRandom = (): Promise<QuoteResponse> =>
  httpClient.get<QuoteResponse>("/home/random");

export const fetchHomeSummary = (): Promise<HomeSummaryResponse> =>
  httpClient.get<HomeSummaryResponse>("/home/summary");
