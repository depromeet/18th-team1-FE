import { Suspense } from "react";
import { UserProfileCard } from "@/entities/user";
import { CalendarDiarySection, CalendarHeader, CalendarWidget } from "@/widgets/calendar";

const CalendarPage = () => {
  return (
    <div className="flex flex-col h-full bg-gray-0">
      <CalendarHeader />
      <div className="flex-1 overflow-y-auto pb-24 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <UserProfileCard />
        <Suspense>
          <CalendarWidget />
          <CalendarDiarySection />
        </Suspense>
      </div>
    </div>
  );
};

export default CalendarPage;
