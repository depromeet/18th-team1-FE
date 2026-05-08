"use client";

import { format, isAfter, startOfDay, startOfMonth, startOfWeek } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import type { DiaryDetail } from "@/entities/diary";
import type { CalendarMode } from "@/features/calendar-view";
import { MOCK_CALENDAR_DIARIES } from "@/mock";
import { useCalendarStore } from "@/store/calendar/useCalendarStore";

interface UseCalendarDiaryReturn {
  diary: DiaryDetail | undefined;
  selectedDate: Date;
  viewDate: Date;
  isFutureView: boolean;
}

export const useCalendarDiary = (): UseCalendarDiaryReturn => {
  const { selectedDate, viewDate } = useCalendarStore();
  const searchParams = useSearchParams();
  const mode: CalendarMode = searchParams.get("mode") === "monthly" ? "monthly" : "weekly";

  const selectedDateStr = format(selectedDate, "yyyy-MM-dd");
  const diary = MOCK_CALENDAR_DIARIES.diaries.find((entry) => entry.createdAt === selectedDateStr);

  const isFutureView = useMemo(() => {
    const today = startOfDay(new Date());
    if (mode === "monthly") {
      return isAfter(startOfMonth(viewDate), today);
    }
    return isAfter(startOfDay(startOfWeek(viewDate, { weekStartsOn: 0 })), today);
  }, [viewDate, mode]);

  return { diary, selectedDate, viewDate, isFutureView };
};
