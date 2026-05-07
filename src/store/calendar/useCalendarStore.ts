import { create } from "zustand";
import { devtools } from "zustand/middleware";

type CalendarState = {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
};

export const useCalendarStore = create<CalendarState>()(
  devtools(
    (set) => ({
      selectedDate: new Date(),
      setSelectedDate: (date: Date): void => {
        set({ selectedDate: date }, false, "calendar/setSelectedDate");
      },
    }),
    { name: "CalendarStore" },
  ),
);
