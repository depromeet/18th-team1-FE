"use client";

import { format, isToday } from "date-fns";
import { ko } from "date-fns/locale";
import { DiaryCard } from "@/entities/diary";
import { MOCK_CALENDAR_DIARIES } from "@/mock";
import { useCalendarStore } from "@/store/calendar/useCalendarStore";
import { CalendarWritingTimer } from "./CalendarWritingTimer";

export const CalendarDiarySection = (): React.ReactElement => {
  const { selectedDate } = useCalendarStore();
  const selectedDateStr = format(selectedDate, "yyyy-MM-dd");

  const diary = MOCK_CALENDAR_DIARIES.diaries.find((entry) => entry.createdAt === selectedDateStr);

  const renderDiaryContent = (): React.ReactElement => {
    if (diary) {
      return <DiaryCard diary={diary} />;
    }

    if (isToday(selectedDate)) {
      return <CalendarWritingTimer />;
    }

    return <p className="body2 text-gray-400 text-center mt-21.25">작성된 일기가 없어요.</p>;
  };

  return (
    <div className="px-5 pt-6">
      <p className="subhead5 mb-4 text-gray-700">
        {format(selectedDate, "M월 d일 EEEE", { locale: ko })}
      </p>
      {renderDiaryContent()}
    </div>
  );
};
