"use client";

import { format } from "date-fns";
import type { DiaryDetail } from "@/entities/diary";
import { MOCK_CALENDAR_DIARIES } from "@/mock";
import { useCalendarStore } from "@/store/calendar/useCalendarStore";

interface UseCalendarDiaryReturn {
  diary: DiaryDetail | undefined;
  selectedDate: Date;
}

export const useCalendarDiary = (): UseCalendarDiaryReturn => {
  const { selectedDate } = useCalendarStore();
  const selectedDateStr = format(selectedDate, "yyyy-MM-dd");
  const diary = MOCK_CALENDAR_DIARIES.diaries.find((entry) => entry.createdAt === selectedDateStr);

  return { diary, selectedDate };
};
