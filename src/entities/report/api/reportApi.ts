import { httpClient } from "@/shared/api/http-client";

import type { MonthlyReport } from "../model/report.types";

export const fetchMonthlyReport = (year: number, month: number): Promise<MonthlyReport> =>
  httpClient.get<MonthlyReport>(`/monthly-settlements?year=${year}&month=${month}`);

export const fetchSharedMonthlyReport = (
  userId: number,
  year: number,
  month: number,
): Promise<MonthlyReport> =>
  httpClient.get<MonthlyReport>(
    `/monthly-settlements/shared?userId=${userId}&year=${year}&month=${month}`,
  );
