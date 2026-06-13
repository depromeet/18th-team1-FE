"use client";

import { format, isAfter, startOfDay, startOfMonth } from "date-fns";
import { useMemo } from "react";
import type { DiaryListItem } from "@/entities/diary";
import { MOCK_CALENDAR_DIARIES } from "@/mock";
import { useCalendarStore } from "@/store/calendar/useCalendarStore";

interface UseCalendarDiaryReturn {
  diaries: DiaryListItem[];
  selectedDate: Date;
  viewDate: Date;
  isFutureView: boolean;
}

export const useCalendarDiary = (): UseCalendarDiaryReturn => {
  const { selectedDate, viewDate } = useCalendarStore();

  const selectedDateStr = format(selectedDate, "yyyy-MM-dd");
  const diaries = useMemo(
    () =>
      MOCK_CALENDAR_DIARIES.diaries.filter(
        (entry) => entry.createdAt === selectedDateStr,
      ) as DiaryListItem[],
    [selectedDateStr],
  );

  const isFutureView = useMemo(() => {
    const today = startOfDay(new Date());
    return isAfter(startOfMonth(viewDate), today);
  }, [viewDate]);

  return { diaries, selectedDate, viewDate, isFutureView };
};
