"use client";

import { endOfMonth, format, isAfter, startOfDay, startOfMonth, startOfWeek } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import type { DiaryListItem } from "@/entities/diary";
import { useDiariesQuery } from "@/entities/diary";
import type { CalendarMode } from "@/features/calendar-view";
import { useCalendarStore } from "@/store/calendar/useCalendarStore";

interface UseCalendarDiaryReturn {
  diary: DiaryListItem | undefined;
  selectedDate: Date;
  viewDate: Date;
  isFutureView: boolean;
}

export const useCalendarDiary = (): UseCalendarDiaryReturn => {
  const { selectedDate, viewDate } = useCalendarStore();
  const searchParams = useSearchParams();
  const mode: CalendarMode = searchParams.get("mode") === "monthly" ? "monthly" : "weekly";

  const start = format(startOfMonth(viewDate), "yyyy-MM-dd");
  const end = format(endOfMonth(viewDate), "yyyy-MM-dd");
  const { data } = useDiariesQuery(start, end);

  const selectedDateStr = format(selectedDate, "yyyy-MM-dd");
  const diary = data?.diaries.find((entry) => entry.createdAt === selectedDateStr);

  const isFutureView = useMemo(() => {
    const today = startOfDay(new Date());
    if (mode === "monthly") {
      return isAfter(startOfMonth(viewDate), today);
    }
    return isAfter(startOfDay(startOfWeek(viewDate, { weekStartsOn: 0 })), today);
  }, [viewDate, mode]);

  return { diary, selectedDate, viewDate, isFutureView };
};
