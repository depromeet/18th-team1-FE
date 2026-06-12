"use client";

import { endOfMonth, format, isAfter, startOfDay, startOfMonth } from "date-fns";
import { useMemo } from "react";
import type { DiaryListItem } from "@/entities/diary";
import { useDiariesQuery } from "@/entities/diary";
import { useCalendarStore } from "@/store/calendar/useCalendarStore";

interface UseCalendarDiaryReturn {
  diary: DiaryListItem | undefined;
  selectedDate: Date;
  viewDate: Date;
  isFutureView: boolean;
}

export const useCalendarDiary = (): UseCalendarDiaryReturn => {
  const { selectedDate, viewDate } = useCalendarStore();

  const start = format(startOfMonth(viewDate), "yyyy-MM-dd");
  const end = format(endOfMonth(viewDate), "yyyy-MM-dd");
  const { data } = useDiariesQuery(start, end);

  const selectedDateStr = format(selectedDate, "yyyy-MM-dd");
  const diary = data?.diaries.find((entry) => entry.createdAt === selectedDateStr);

  const isFutureView = useMemo(() => {
    const today = startOfDay(new Date());
    return isAfter(startOfMonth(viewDate), today);
  }, [viewDate]);

  return { diary, selectedDate, viewDate, isFutureView };
};
