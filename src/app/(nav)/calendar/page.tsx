import { Suspense } from "react";
import { UserProfileCard } from "@/entities/user";
import { MOCK_USER_PROFILE } from "@/mock";
import { CalendarDiarySection, CalendarHeader, CalendarWidget } from "@/widgets/calendar";

const CalendarPage = (): React.ReactElement => {
  return (
    <div className="flex flex-col h-full bg-gray-0">
      <CalendarHeader />
      <div className="flex-1 overflow-y-auto pb-24 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <UserProfileCard {...MOCK_USER_PROFILE} />
        <Suspense>
          <CalendarWidget />
        </Suspense>
        <CalendarDiarySection />
      </div>
    </div>
  );
};

export default CalendarPage;
