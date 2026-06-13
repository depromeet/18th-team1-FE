"use client";

import { Suspense, useState } from "react";
import { CalendarDiarySection } from "./CalendarDiarySection";
import { CalendarWidget } from "./CalendarWidget";
import { MonthlyReportBanner } from "./MonthlyReportBanner";

export const CalendarView = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <>
      <MonthlyReportBanner month={6} />
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
