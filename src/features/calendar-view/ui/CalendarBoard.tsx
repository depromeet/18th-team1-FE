import { getDate, isSameDay, isSameMonth, isToday } from "date-fns";
import { cn } from "@/shared/lib/utils";
import type { CalendarMode } from "../model/calendar.types";

interface CalendarBoardProps {
  days: Date[];
  viewDate: Date;
  selectedDate: Date;
  mode: CalendarMode;
  onSelectDate: (date: Date) => void;
}

const DAY_NAMES = ["일", "월", "화", "수", "목", "금", "토"] as const;

export const CalendarBoard = ({
  days,
  viewDate,
  selectedDate,
  mode,
  onSelectDate,
}: CalendarBoardProps): React.ReactElement => {
  return (
    <div className="flex w-full flex-col gap-2.5">
      <div className="grid grid-cols-7 px-4">
        {DAY_NAMES.map((day, i) => (
          <div key={day} className="flex h-5 items-center justify-center">
            <span
              className={cn(
                "body2",
                i === 0 ? "text-calendar-sun" : i === 6 ? "text-calendar-sat" : "text-gray-400",
              )}
            >
              {day}
            </span>
          </div>
        ))}
      </div>
      <div className={cn("grid grid-cols-7 px-4", mode === "monthly" && "gap-y-2.5")}>
        {days.map((day) => {
          const isSelected = isSameDay(day, selectedDate);
          const isCurrentMonth = isSameMonth(day, viewDate);
          const isTodayDate = isToday(day);

          return (
            <div key={day.toISOString()} className="flex justify-center py-2">
              <button
                type="button"
                onClick={() => onSelectDate(day)}
                className={cn(
                  "flex size-11 items-center justify-center rounded-full transition-all",
                  !isCurrentMonth && "pointer-events-none opacity-0",
                  isSelected ? "bg-foreground text-gray-0" : "text-foreground",
                  !isSelected && isTodayDate && "border border-foreground",
                )}
              >
                <span className="subhead2">{getDate(day)}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
