"use client";

import { useParams } from "next/navigation";

import { useMonthlyReportQuery } from "@/entities/report";

import { BookCategoryBanner } from "./BookCategoryBanner";
import { EmotionCloudBanner } from "./EmotionCloudBanner";
import { MonthlyBookSection } from "./MonthlyBookSection";
import { ReportMonthSelector } from "./ReportMonthSelector";

export const ReportView = () => {
  const { year, month } = useParams<{ year: string; month: string }>();
  const parsedYear = Number.parseInt(year, 10);
  const parsedMonth = Number.parseInt(month, 10);
  const isValidReportMonth =
    Number.isInteger(parsedYear) &&
    Number.isInteger(parsedMonth) &&
    parsedMonth >= 1 &&
    parsedMonth <= 12;

  const { data: report, isLoading } = useMonthlyReportQuery(
    parsedYear,
    parsedMonth,
    isValidReportMonth,
  );

  if (!isValidReportMonth) return null;

  if (isLoading || !report) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <ReportMonthSelector year={parsedYear} month={parsedMonth} />
      <div className="bg-key-secondary p-5">
        <p className="subhead4 text-gray-100">{parsedMonth}월에 함께한 문장</p>
        <p className="title2 text-gray-100">{report.sharedQuoteCount}개</p>
      </div>
      <div className="h-1.5 bg-key-point-50" />
      <BookCategoryBanner
        month={parsedMonth}
        genre={report.mostFrequentGenre}
        books={report.monthlyBooks}
      />
      <EmotionCloudBanner
        month={parsedMonth}
        emotionTags={report.emotionTags}
        recommendationMessage={report.recommendationMessage}
      />
      <MonthlyBookSection month={parsedMonth} book={report.monthlyBook} />
    </div>
  );
};
