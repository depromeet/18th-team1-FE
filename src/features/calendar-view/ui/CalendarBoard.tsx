import { format, getDate, isFuture, isSameDay, isSameMonth, isToday } from "date-fns";
import type { EmotionIntensity } from "@/entities/diary";
import { cn } from "@/shared/lib/utils";
import type { CalendarMode } from "../model/calendar.types";

const INTENSITY_STYLE: Record<EmotionIntensity, string> = {
  HIGH: "bg-key-secondary-0 text-key-secondary-100",
  MID: "bg-key-primary-0 text-key-primary-100",
  LOW: "bg-key-secondary2-0 text-key-secondary2",
};

interface CalendarBoardProps {
  days: Date[];
  viewDate: Date;
  selectedDate: Date;
  mode: CalendarMode;
  onSelectDate: (date: Date) => void;
  diaryIntensityByDate?: Record<string, EmotionIntensity>;
}

const DAY_NAMES = ["일", "월", "화", "수", "목", "금", "토"] as const;

export const CalendarBoard = ({
  days,
  viewDate,
  selectedDate,
  mode,
  onSelectDate,
  diaryIntensityByDate,
}: CalendarBoardProps): React.ReactElement => {
  return (
    <div className="flex w-full flex-col gap-2.5">
      <div className="grid grid-cols-7 px-4">
        {DAY_NAMES.map((day, i) => (
          <div key={day} className="flex h-5 items-center justify-center">
            <span
              className={cn(
                "body2",
                i === 0 ? "text-sub-sunday" : i === 6 ? "text-sub-saturday" : "text-gray-400",
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
          const isFutureDate = isFuture(day);
          const intensity = diaryIntensityByDate?.[format(day, "yyyy-MM-dd")];

          return (
            <div key={day.toISOString()} className="flex justify-center py-2">
              <button
                type="button"
                onClick={() => onSelectDate(day)}
                disabled={isFutureDate}
                className={cn(
                  "relative flex size-11 items-center justify-center rounded transition-all",
                  !isCurrentMonth && "pointer-events-none opacity-0",
                  isSelected ? "bg-key-secondary2 text-key-secondary" : "text-foreground",
                  !isSelected && intensity && INTENSITY_STYLE[intensity],
                  !isSelected && isFutureDate && "cursor-default text-gray-200",
                )}
              >
                {isTodayDate && !isSelected && (
                  <span className="absolute text-key-secondary2 top-1.5 size-1 rounded-full bg-current" />
                )}
                <span
                  className={cn("subhead2", isTodayDate && !isSelected && "text-key-secondary2")}
                >
                  {getDate(day)}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
