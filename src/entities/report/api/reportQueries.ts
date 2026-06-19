"use client";

import { type UseQueryResult, useQuery } from "@tanstack/react-query";

import type { MonthlyReport } from "../model/report.types";
import { fetchMonthlyReport, fetchSharedMonthlyReport } from "./reportApi";

export const reportKeys = {
  all: ["report"] as const,
  monthly: (year: number, month: number) => [...reportKeys.all, "monthly", year, month] as const,
  shared: (userId: number, year: number, month: number) =>
    [...reportKeys.all, "shared", userId, year, month] as const,
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

export const useSharedMonthlyReportQuery = (
  userId: number,
  year: number,
  month: number,
  enabled = true,
): UseQueryResult<MonthlyReport> =>
  useQuery({
    queryKey: reportKeys.shared(userId, year, month),
    queryFn: () => fetchSharedMonthlyReport(userId, year, month),
    enabled,
  });
