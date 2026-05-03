import { Suspense } from "react";
import { UserProfileCard } from "@/entities/user";
import { MOCK_USER_PROFILE } from "@/mock";
import { CalendarHeader, CalendarWidget } from "@/widgets/calendar";

const CalendarPage = (): React.ReactElement => {
  return (
    <>
      <CalendarHeader />
      <UserProfileCard {...MOCK_USER_PROFILE} />
      <Suspense>
        <CalendarWidget />
      </Suspense>
    </>
  );
};

export default CalendarPage;
