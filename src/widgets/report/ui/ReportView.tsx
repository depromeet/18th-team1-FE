"use client";

import { useParams } from "next/navigation";

import { useMonthlyReportQuery } from "@/entities/report";

import { BookCategoryBanner } from "./BookCategoryBanner";
import { EmotionCloudBanner } from "./EmotionCloudBanner";
import { MonthlyBookSection } from "./MonthlyBookSection";
import { ReportMonthSelector } from "./ReportMonthSelector";

export const ReportView = () => {
  const { year, month } = useParams<{ year: string; month: string }>();
  const yearNum = Number(year);
  const monthNum = Number(month);

  const { data: report, isLoading } = useMonthlyReportQuery(yearNum, monthNum);

  if (isLoading || !report) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <ReportMonthSelector year={yearNum} month={monthNum} />
      <div className="bg-key-secondary p-5">
        <p className="subhead4 text-gray-100">{monthNum}월에 함께한 문장</p>
        <p className="title2 text-gray-100">{report.sharedQuoteCount}개</p>
      </div>
      <div className="h-1.5 bg-key-point-50" />
      <BookCategoryBanner
        month={monthNum}
        genre={report.mostFrequentGenre}
        books={report.monthlyBooks}
      />
      <EmotionCloudBanner
        month={monthNum}
        emotionTags={report.emotionTags}
        recommendationMessage={report.recommendationMessage}
      />
      <MonthlyBookSection month={monthNum} book={report.monthlyBook} />
    </div>
  );
};
