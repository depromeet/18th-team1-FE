"use client";

import { format, isToday } from "date-fns";
import { ko } from "date-fns/locale";
import { DiaryCard } from "@/entities/diary";
import { MOCK_CALENDAR_DIARIES } from "@/mock";
import { IcEdit, IcShare, IcTrash } from "@/shared/ui/icons";
import type { OptionMenuItem } from "@/shared/ui/option-menu";
import { useCalendarStore } from "@/store/calendar/useCalendarStore";
import { CalendarWritingTimer } from "./CalendarWritingTimer";

const DIARY_MENU_ITEMS: OptionMenuItem[] = [
  { icon: <IcEdit />, label: "수정하기" },
  { icon: <IcShare />, label: "공유하기" },
  { icon: <IcTrash />, label: "삭제", isDestructive: true },
];

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
          menuItems={DIARY_MENU_ITEMS}
        />
      ) : isToday(selectedDate) ? (
        <CalendarWritingTimer />
      ) : (
        <p className="body2 text-gray-400 text-center mt-21.25">작성된 일기가 없어요.</p>
      )}
    </div>
  );
};
