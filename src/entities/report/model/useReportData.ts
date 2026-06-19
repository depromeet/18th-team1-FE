"use client";

import { useMonthlyReportQuery, useSharedMonthlyReportQuery } from "../api/reportQueries";
import { useReportRouteContext } from "./useReportRouteContext";

export const useReportData = () => {
  const { year, month, userId, isSharedView, isValidReportMonth } = useReportRouteContext();

  const ownReportQuery = useMonthlyReportQuery(year, month, isValidReportMonth && !isSharedView);
  const sharedReportQuery = useSharedMonthlyReportQuery(
    userId ?? 0,
    year,
    month,
    isValidReportMonth && isSharedView,
  );

  const { data: report, isLoading } = isSharedView ? sharedReportQuery : ownReportQuery;

  const hasReportContent =
    isValidReportMonth &&
    !!report &&
    report.mostFrequentGenre !== null &&
    report.recommendationMessage !== null &&
    report.monthlyBook !== null;

  return {
    year,
    month,
    userId,
    isSharedView,
    isValidReportMonth,
    report,
    isLoading,
    hasReportContent,
  };
};
