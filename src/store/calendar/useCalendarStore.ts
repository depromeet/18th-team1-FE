import { create } from "zustand";
import { devtools } from "zustand/middleware";

type CalendarState = {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  viewDate: Date;
  setViewDate: (date: Date) => void;
};

export const useCalendarStore = create<CalendarState>()(
  devtools(
    (set) => ({
      selectedDate: new Date(),
      setSelectedDate: (date: Date) => {
        set({ selectedDate: date }, false, "calendar/setSelectedDate");
      },
      viewDate: new Date(),
      setViewDate: (date: Date) => {
        set({ viewDate: date }, false, "calendar/setViewDate");
      },
    }),
    { name: "CalendarStore" },
  ),
);
