import type { ReactNode } from "react";
import { CalendarHeader } from "@/widgets/calendar";

type CalendarLayoutProps = {
  children: ReactNode;
};

const CalendarLayout = ({ children }: CalendarLayoutProps): React.ReactElement => {
  return (
    <div className="flex flex-col h-full bg-gray-0">
      <CalendarHeader />
      <div className="flex-1 overflow-y-auto pb-24 mt-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {children}
      </div>
    </div>
  );
};

export default CalendarLayout;
