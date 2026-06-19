"use client";

import Image from "next/image";
import { useReportData } from "@/entities/report";

import { BookCategoryBanner } from "./BookCategoryBanner";
import { EmotionCloudBanner } from "./EmotionCloudBanner";
import { MonthlyBookSection } from "./MonthlyBookSection";
import { ReportMonthSelector } from "./ReportMonthSelector";

export const ReportView = () => {
  const { year, month, userId, isValidReportMonth, report, isLoading } = useReportData();

  if (isLoading) return null;

  if (
    !isValidReportMonth ||
    !report ||
    report.mostFrequentGenre === null ||
    report.recommendationMessage === null ||
    report.monthlyBook === null
  ) {
    return (
      <div className="flex flex-col h-full">
        <ReportMonthSelector year={year} month={month} userId={userId} />
        <div className="fixed inset-x-0 top-0 flex h-dvh flex-col items-center justify-center gap-2.25 bg-gray-0 md:left-1/2 md:right-auto md:w-93.75 md:-translate-x-1/2">
          <Image src="/images/error.png" alt="오류" width={151} height={56} />
          <p className="body3 text-center text-gray-500">{month}월에 함께한 문장이 없어요.</p>
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
