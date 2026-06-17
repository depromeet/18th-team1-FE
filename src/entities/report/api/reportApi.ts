import { httpClient } from "@/shared/api/http-client";

import type { MonthlyReport } from "../model/report.types";

export const fetchMonthlyReport = (year: number, month: number): Promise<MonthlyReport> =>
  httpClient.get<MonthlyReport>(`/monthly-settlements?year=${year}&month=${month}`);
