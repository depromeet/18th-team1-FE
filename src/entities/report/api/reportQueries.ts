"use client";

import { type UseQueryResult, useQuery } from "@tanstack/react-query";

import type { MonthlyReport } from "../model/report.types";
import { fetchMonthlyReport } from "./reportApi";

export const reportKeys = {
  all: ["report"] as const,
  monthly: (year: number, month: number) => [...reportKeys.all, "monthly", year, month] as const,
};

export const useMonthlyReportQuery = (
  year: number,
  month: number,
  enabled = true,
  shouldThrowOnError?: boolean,
): UseQueryResult<MonthlyReport> =>
  useQuery({
    queryKey: reportKeys.monthly(year, month),
    queryFn: () => fetchMonthlyReport(year, month),
    enabled,
    ...(shouldThrowOnError === undefined ? {} : { throwOnError: shouldThrowOnError }),
  });
