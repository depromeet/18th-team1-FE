"use client";

import { format, isToday } from "date-fns";
import { ko } from "date-fns/locale";
import Link from "next/link";
import { DiaryCard, useDiaryStore } from "@/entities/diary";
import { DiaryOptionMenu, useDiaryOptions } from "@/features/diary-actions";
import { IcOption } from "@/shared/ui/icons";
import { useCalendarDiary } from "../model/useCalendarDiary";
import { CalendarWritingTimer } from "./CalendarWritingTimer";

export const CalendarDiarySection = (): React.ReactElement => {
  const { diary, selectedDate, viewDate, isFutureView } = useCalendarDiary();
  const { setSelectedDiary } = useDiaryStore();
  const { handleEdit, handleShare, handleDelete } = useDiaryOptions();

  const renderDiaryContent = (): React.ReactElement => {
    if (isFutureView) {
      return <p className="body2 text-gray-400 text-center mt-21.25">작성된 일기가 없어요.</p>;
    }

    if (diary) {
      return (
        <Link href={`/diary/${diary.id}`} onClick={() => setSelectedDiary(diary)}>
          <DiaryCard
            diary={diary}
            action={
              <DiaryOptionMenu
                trigger={<IcOption size={24} className="text-gray-300" />}
                onEdit={handleEdit}
                onShare={handleShare}
                onDelete={handleDelete}
              />
            }
          />
        </Link>
      );
    }

    if (isToday(selectedDate)) {
      return <CalendarWritingTimer />;
    }

    return <p className="body2 text-gray-400 text-center mt-21.25">작성된 일기가 없어요.</p>;
  };

  return (
    <div className="px-5 pt-6">
      <p className="subhead5 mb-4 text-gray-700">
        {isFutureView
          ? format(viewDate, "M월", { locale: ko })
          : format(selectedDate, "M월 d일 EEEE", { locale: ko })}
      </p>
      {renderDiaryContent()}
    </div>
  );
};
