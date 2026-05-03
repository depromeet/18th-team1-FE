"use client";

import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { DiaryCard } from "@/entities/diary";
import { MOCK_CALENDAR_DIARIES } from "@/mock";
import { useCalendarStore } from "@/store/calendar/useCalendarStore";

export const CalendarDiarySection = (): React.ReactElement | null => {
  const { selectedDate } = useCalendarStore();
  const selectedDateStr = format(selectedDate, "yyyy-MM-dd");

  const diary = MOCK_CALENDAR_DIARIES.diaries.find((entry) => entry.createdAt === selectedDateStr);

  return (
    <div className="px-5 pt-6">
      <p className="subhead5 mb-4 text-gray-700">
        {format(selectedDate, "M월 d일 EEEE", { locale: ko })}
      </p>
      {diary ? (
        <DiaryCard
          quoteContent={diary.quoteContent}
          title={diary.title}
          author={diary.author}
          emotions={diary.emotions}
          content={diary.content}
          coverImageUrl={diary.coverImageUrl}
          diaryImageUrl={diary.diaryImageUrl}
        />
      ) : (
        <p className="body2 text-gray-400 text-center mt-21.25">작성된 일기가 없어요.</p>
      )}
    </div>
  );
};
