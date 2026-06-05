import { Suspense } from "react";
import { UserProfileCard } from "@/entities/user";
import { CalendarDiarySection } from "./CalendarDiarySection";
import { CalendarWidget } from "./CalendarWidget";

export const CalendarView = (): React.ReactElement => {
  return (
    <>
      <UserProfileCard />
      <Suspense>
        <CalendarWidget />
        <CalendarDiarySection />
      </Suspense>
    </>
  );
};
