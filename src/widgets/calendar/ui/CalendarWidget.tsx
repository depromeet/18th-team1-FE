"use client";

import { format } from "date-fns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  CalendarShareCardDrawer,
  CalendarShareDateDrawer,
  CalendarShareTypeSheet,
  useCalendarShareFlow,
} from "@/features/calendar-share";
import { CalendarBoard, useCalendar, useMonthSwipe } from "@/features/calendar-view";
import { MonthPicker } from "@/features/month-picker";
import { SentenceShareCardDrawer } from "@/features/sentence-share";
import { IcMonthBack, IcMonthNext, IcShare } from "@/shared/ui/icons";
import { OptionTab } from "@/shared/ui/option-tab";
import { useCalendarWidget } from "../model/useCalendarWidget";

interface CalendarWidgetProps {
  onDateSelect?: () => void;
}

export const CalendarWidget = ({ onDateSelect }: CalendarWidgetProps) => {
  const { viewDate, setSelectedDate, days, handlePrev, handleNext, navigateToMonth } =
    useCalendar();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const viewTab = searchParams.get("tab") === "cover" ? "cover" : "emotion";
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const { step, openTypeSheet, selectType, selectDate, close } = useCalendarShareFlow();

  const {
    diaryIntensitiesByDate,
    diaryCoverByDate,
    isPrevDisabled,
    isNextDisabled,
    minYear,
    minMonth,
  } = useCalendarWidget(viewDate);

  const { handlePointerDown, handlePointerUp } = useMonthSwipe({
    onSwipeLeft: handleNext,
    onSwipeRight: handlePrev,
    isPrevDisabled,
    isNextDisabled,
  });

  return (
    <>
      <div className="flex w-full flex-col gap-4">
        <div className="flex items-center gap-2 px-5">
          <button
            type="button"
            onClick={handlePrev}
            disabled={isPrevDisabled}
            className="disabled:cursor-default"
          >
            <IcMonthBack size={24} className={isPrevDisabled ? "text-gray-200" : "text-gray-300"} />
          </button>
          <button type="button" onClick={() => setIsPickerOpen(true)}>
            <span className="subhead1 text-gray-700">{format(viewDate, "yyyy년 M월")}</span>
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={isNextDisabled}
            className="disabled:cursor-default"
          >
            <IcMonthNext size={24} className={isNextDisabled ? "text-gray-200" : "text-gray-300"} />
          </button>
        </div>
        <div className="flex items-center justify-between px-5">
          <OptionTab
            options={[
              { value: "emotion", label: "감정 색" },
              { value: "cover", label: "책 표지" },
            ]}
            value={viewTab}
            onChange={(v) => {
              const nextSearchParams = new URLSearchParams(searchParams.toString());
              nextSearchParams.set("tab", v);
              router.replace(`${pathname}?${nextSearchParams.toString()}`);
            }}
          />
          <button
            type="button"
            className="flex size-8.5 items-center justify-center rounded-full bg-muted"
            onClick={openTypeSheet}
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
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        />
      </div>

      <MonthPicker
        isOpen={isPickerOpen}
        selectedValue={format(viewDate, "yyyy-MM")}
        minYear={minYear}
        minMonth={minMonth}
        onClose={() => setIsPickerOpen(false)}
        onChange={(dateStr) => {
          const [year, month] = dateStr.split("-").map(Number) as [number, number];
          navigateToMonth(year, month);
        }}
      />

      <CalendarShareTypeSheet
        isOpen={step.type === "type-sheet"}
        onSelect={selectType}
        onClose={close}
      />
      <CalendarShareDateDrawer
        isOpen={step.type === "date-drawer"}
        onSelectDate={selectDate}
        onClose={close}
      />
      <SentenceShareCardDrawer
        isOpen={step.type === "card-drawer" && step.shareType !== "calendar"}
        shareType={
          step.type === "card-drawer"
            ? (step.shareType as "today-sentence" | "sentence-pick")
            : undefined
        }
        date={step.type === "card-drawer" ? step.date : undefined}
        onClose={close}
      />
      <CalendarShareCardDrawer
        isOpen={step.type === "card-drawer" && step.shareType === "calendar"}
        year={viewDate.getFullYear()}
        month={viewDate.getMonth() + 1}
        onClose={close}
      />
    </>
  );
};
