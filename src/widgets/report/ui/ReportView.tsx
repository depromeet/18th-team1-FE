"use client";

import { useReportData } from "@/entities/report";

import { BookCategoryBanner } from "./BookCategoryBanner";
import { EmotionCloudBanner } from "./EmotionCloudBanner";
import { MonthlyBookSection } from "./MonthlyBookSection";
import { ReportMonthSelector } from "./ReportMonthSelector";

export const ReportView = () => {
  const { year, month, userId, isValidReportMonth, report, isLoading } = useReportData();

  if (!isValidReportMonth) return null;

  if (isLoading) return null;

  if (
    !report ||
    report.mostFrequentGenre === null ||
    report.recommendationMessage === null ||
    report.monthlyBook === null
  ) {
    return (
      <div className="flex flex-col">
        <ReportMonthSelector year={year} month={month} userId={userId} />
        <div className="flex items-center justify-center py-25">
          <p className="body1 text-gray-400">월말결산이 생성되지 않은 달입니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <ReportMonthSelector year={year} month={month} userId={userId} />
      <div className="bg-key-secondary p-5">
        <p className="subhead4 text-gray-100">{month}월에 함께한 문장</p>
        <p className="title2 text-gray-100">{report.sharedQuoteCount}개</p>
      </div>
      <div className="h-1.5 bg-key-point-50" />
      <BookCategoryBanner
        month={month}
        genre={report.mostFrequentGenre}
        books={report.monthlyBooks}
      />
      <EmotionCloudBanner
        month={month}
        emotionTags={report.emotionTags}
        recommendationMessage={report.recommendationMessage}
      />
      <MonthlyBookSection month={month} book={report.monthlyBook} />
    </div>
  );
};
