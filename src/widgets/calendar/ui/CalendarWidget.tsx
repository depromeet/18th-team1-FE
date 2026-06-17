"use client";

import { endOfMonth, format, startOfMonth } from "date-fns";
import { useState } from "react";
import type { EmotionIntensity } from "@/entities/diary";
import { useDiariesQuery } from "@/entities/diary";
import { CalendarBoard, useCalendar } from "@/features/calendar-view";
import { MonthPicker } from "@/features/month-picker";
import { IcMonthBack, IcMonthNext, IcShare } from "@/shared/ui/icons";
import { OptionTab } from "@/shared/ui/option-tab";

const getEmotionIntensity = (emotionValue: number): EmotionIntensity => {
  if (emotionValue >= 7) return "HIGH";
  if (emotionValue >= 4) return "MID";
  return "LOW";
};

interface CalendarWidgetProps {
  onDateSelect?: () => void;
}

export const CalendarWidget = ({ onDateSelect }: CalendarWidgetProps) => {
  const { viewDate, setSelectedDate, days, handlePrev, handleNext, navigateToMonth } =
    useCalendar();
  const [viewTab, setViewTab] = useState<"emotion" | "cover">("emotion");
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const start = format(startOfMonth(viewDate), "yyyy-MM-dd");
  const end = format(endOfMonth(viewDate), "yyyy-MM-dd");
  const { data } = useDiariesQuery(start, end);
  const diaries = data?.recommendations ?? [];

  const diaryIntensitiesByDate = diaries.reduce<Record<string, EmotionIntensity[]>>(
    (acc, diary) => {
      const key = diary.recommendationDate;
      acc[key] = [...(acc[key] ?? []), getEmotionIntensity(diary.emotionValue)];
      return acc;
    },
    {},
  );

  const diaryCoverByDate: Record<string, string[]> = [...diaries]
    .filter((diary) => diary.quote.image)
    .sort((a, b) => a.recommendationId - b.recommendationId)
    .reduce<Record<string, string[]>>((acc, diary) => {
      const key = diary.recommendationDate;
      acc[key] = [...(acc[key] ?? []), diary.quote.image];
      return acc;
    }, {});

  return (
    <>
      <div className="flex w-full flex-col gap-4">
        <div className="flex items-center gap-2 px-5">
          <button type="button" onClick={handlePrev}>
            <IcMonthBack size={24} className="text-gray-300" />
          </button>
          <button type="button" onClick={() => setIsPickerOpen(true)}>
            <span className="subhead1 text-gray-700">{format(viewDate, "yyyy년 M월")}</span>
          </button>
          <button type="button" onClick={handleNext}>
            <IcMonthNext size={24} className="text-gray-300" />
          </button>
        </div>
        <div className="flex items-center justify-between px-5">
          <OptionTab
            options={[
              { value: "emotion", label: "감정 색" },
              { value: "cover", label: "책 표지" },
            ]}
            value={viewTab}
            onChange={(v) => setViewTab(v as "emotion" | "cover")}
          />
          <button
            type="button"
            className="flex size-8.5 items-center justify-center rounded-full bg-muted"
          >
            <IcShare size={34} className="text-gray-500" />
          </button>
        </div>
        <CalendarBoard
          days={days}
          viewDate={viewDate}
          onSelectDate={(date) => {
            setSelectedDate(date);
            onDateSelect?.();
          }}
          diaryIntensitiesByDate={diaryIntensitiesByDate}
          diaryCoverByDate={diaryCoverByDate}
          viewTab={viewTab}
        />
      </div>
      <MonthPicker
        isOpen={isPickerOpen}
        selectedValue={format(viewDate, "yyyy-MM")}
        onClose={() => setIsPickerOpen(false)}
        onChange={(dateStr) => {
          const [year, month] = dateStr.split("-").map(Number) as [number, number];
          navigateToMonth(year, month);
        }}
      />
    </>
  );
};
