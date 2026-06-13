import { format, isFuture, isSameMonth, isToday } from "date-fns";
import Link from "next/link";
import type { EmotionIntensity } from "@/entities/diary";
import { cn } from "@/shared/lib/utils";
import { CalendarDay } from "./CalendarDay";

interface CalendarBoardProps {
  days: Date[];
  viewDate: Date;
  onSelectDate: (date: Date) => void;
  diaryIntensitiesByDate?: Record<string, EmotionIntensity[]>;
  diaryCoverByDate?: Record<string, string[]>;
  viewTab?: "emotion" | "cover";
}

const DAY_NAMES = ["일", "월", "화", "수", "목", "금", "토"] as const;

export const CalendarBoard = ({
  days,
  viewDate,
  onSelectDate,
  diaryIntensitiesByDate,
  diaryCoverByDate,
  viewTab = "emotion",
}: CalendarBoardProps) => {
  return (
    <div className="flex w-full flex-col gap-2.5">
      <div className="grid grid-cols-7 px-4">
        {DAY_NAMES.map((day, i) => (
          <div key={day} className="flex h-5 items-center justify-center">
            <span
              className={cn(
                "caption2",
                i === 0 ? "text-sub-sunday" : i === 6 ? "text-sub-saturday" : "text-gray-400",
              )}
            >
              {day}
            </span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 items-center gap-y-4 px-4">
        {days.map((day) => {
          const dateKey = format(day, "yyyy-MM-dd");
          const isCurrentMonth = isSameMonth(day, viewDate);
          const isTodayDate = isToday(day);
          const isFutureDate = isFuture(day);
          const intensities = diaryIntensitiesByDate?.[dateKey];
          const hasDiary = !!intensities?.length;
          const coverUrls = diaryCoverByDate?.[dateKey] ?? [];
          const isCoverView = viewTab === "cover";

          const dayContent = (
            <CalendarDay
              isCoverView={isCoverView}
              coverUrls={coverUrls}
              hasDiary={hasDiary}
              intensities={intensities}
              isTodayDate={isTodayDate}
              isFutureDate={isFutureDate}
              date={day}
            />
          );

          return (
            <div
              key={day.toISOString()}
              className={cn(
                "flex justify-center",
                !isCurrentMonth && "pointer-events-none opacity-0",
              )}
            >
              {isTodayDate && !hasDiary ? (
                <Link href="/emotion" className="relative flex size-11 items-center justify-center">
                  {dayContent}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => onSelectDate(day)}
                  disabled={isFutureDate}
                  className={cn(
                    "relative flex items-center justify-center disabled:cursor-default",
                    isCoverView && coverUrls.length > 0 ? "h-19.25 w-11.5" : "size-11",
                  )}
                >
                  {dayContent}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
