"use client";

import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { type MonthlyReport, useMonthlyReportQuery } from "@/entities/report";
import { Skeleton } from "@/shared/ui/skeleton";
import { CalendarDiarySection } from "./CalendarDiarySection";
import { CalendarWidget } from "./CalendarWidget";
import { MonthlyReportBanner } from "./MonthlyReportBanner";

const getCurrentMonth = () => {
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth() + 1 };
};

const getLastMonth = () => {
  const now = new Date();
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  return { year: lastMonth.getFullYear(), month: lastMonth.getMonth() + 1 };
};

const hasReportContent = (report: MonthlyReport) =>
  report.sharedQuoteCount > 0 &&
  report.monthlyBooks.length > 0 &&
  report.mostFrequentGenre !== null &&
  report.recommendationMessage !== null &&
  report.monthlyBook !== null;

export const CalendarView = () => {
  const router = useRouter();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const { year: currentYear, month: currentMonth } = getCurrentMonth();
  const { year: lastYear, month: lastMonth } = getLastMonth();

  const { data: currentMonthReport, isLoading: isCurrentMonthLoading } = useMonthlyReportQuery(
    currentYear,
    currentMonth,
    true,
    false,
  );
  const hasCurrentMonthReport = !!currentMonthReport && hasReportContent(currentMonthReport);

  const { data: lastMonthReport, isLoading: isLastMonthLoading } = useMonthlyReportQuery(
    lastYear,
    lastMonth,
    !isCurrentMonthLoading && !hasCurrentMonthReport,
    false,
  );
  const hasLastMonthReport = !!lastMonthReport && hasReportContent(lastMonthReport);

  const reportBanner = hasCurrentMonthReport
    ? { year: currentYear, month: currentMonth }
    : hasLastMonthReport
      ? { year: lastYear, month: lastMonth }
      : null;

  const isBannerLoading = isCurrentMonthLoading || (!hasCurrentMonthReport && isLastMonthLoading);

  return (
    <>
      {isBannerLoading ? (
        <div className="px-5 mb-5">
          <Skeleton className="h-16 w-full rounded-2xl" />
        </div>
      ) : reportBanner ? (
        <MonthlyReportBanner
          month={reportBanner.month}
          onClick={() =>
            router.push(`/report?year=${reportBanner.year}&month=${reportBanner.month}`)
          }
        />
      ) : null}
      <Suspense>
        <CalendarWidget onDateSelect={() => setIsSheetOpen(true)} />
      </Suspense>
      {isSheetOpen && (
        <>
          <button
            type="button"
            aria-label="닫기"
            className="fixed inset-0 z-40 w-full bg-gray-700-50"
            onClick={() => setIsSheetOpen(false)}
          />
          <div className="fixed bottom-0 inset-x-0 z-50 md:max-w-93.75 md:mx-auto animate-in slide-in-from-bottom duration-300">
            <CalendarDiarySection onClose={() => setIsSheetOpen(false)} />
          </div>
        </>
      )}
    </>
  );
};
