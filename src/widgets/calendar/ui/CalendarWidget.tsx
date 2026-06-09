"use client";

import { endOfMonth, format, startOfMonth } from "date-fns";
import type { EmotionIntensity } from "@/entities/diary";
import { useDiariesQuery } from "@/entities/diary";
import { CalendarBoard, useCalendar } from "@/features/calendar-view";
import { IcCalBack, IcCalNext } from "@/shared/ui/icons";

const getEmotionIntensity = (emotionValue: number): EmotionIntensity => {
  if (emotionValue >= 4) return "HIGH";
  if (emotionValue >= 3) return "MID";
  return "LOW";
};

export const CalendarWidget = () => {
  const { viewDate, selectedDate, setSelectedDate, days, handlePrev, handleNext } = useCalendar();

  const start = format(startOfMonth(viewDate), "yyyy-MM-dd");
  const end = format(endOfMonth(viewDate), "yyyy-MM-dd");
  const { data } = useDiariesQuery(start, end);

  const diaryIntensityByDate: Record<string, EmotionIntensity> = Object.fromEntries(
    (data?.diaries ?? []).map((diary) => [
      diary.createdAt,
      getEmotionIntensity(diary.emotionValue),
    ]),
  );

  return (
    <div className="flex w-full flex-col gap-4 pt-6 pb-4 border-b-2 border-gray-100">
      <div className="flex items-center justify-between px-5">
        <span className="subhead1 text-gray-700">{format(viewDate, "yyyy년 M월")}</span>
        <div className="flex items-center gap-5 text-gray-400">
          <button type="button" onClick={handlePrev}>
            <IcCalBack size={24} />
          </button>
          <button type="button" onClick={handleNext}>
            <IcCalNext size={24} />
          </button>
        </div>
      </div>
      <CalendarBoard
        days={days}
        viewDate={viewDate}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        diaryIntensityByDate={diaryIntensityByDate}
      />
    </div>
  );
};
