import { Suspense } from "react";
import { CalendarDiarySection } from "./CalendarDiarySection";
import { CalendarWidget } from "./CalendarWidget";
import { MonthlyReportBanner } from "./MonthlyReportBanner";

export const CalendarView = () => {
  return (
    <>
      <MonthlyReportBanner month={6} />
      <Suspense>
        <CalendarWidget />
      </Suspense>
      <Suspense>
        <CalendarDiarySection />
      </Suspense>
    </>
  );
};
