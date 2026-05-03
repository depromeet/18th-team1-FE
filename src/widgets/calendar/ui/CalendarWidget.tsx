"use client";

import { format } from "date-fns";
import { useState } from "react";
import type { CalendarMode } from "@/features/calendar-view";
import { CalendarBoard, CalendarModeModal, useCalendar } from "@/features/calendar-view";
import { IcCalBack, IcCalNext, IcFilter } from "@/shared/ui/icons";

export const CalendarWidget = (): React.ReactElement => {
  const { viewDate, selectedDate, setSelectedDate, mode, setMode, days, handlePrev, handleNext } =
    useCalendar();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModeSelect = (selectedMode: CalendarMode): void => {
    setMode(selectedMode);
    setIsModalOpen(false);
  };

  const handleFilterToggle = (): void => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className="flex w-full flex-col gap-4 pt-6 pb-4 border-b-2 border-gray-100">
      <div className="flex items-center justify-between px-5">
        <div className="relative flex items-center gap-1">
          <button type="button" onClick={handleFilterToggle}>
            <IcFilter size={30} className="text-gray-700" />
          </button>
          <span className="subhead1 text-gray-700">{format(viewDate, "yyyy년 M월")}</span>
          {isModalOpen && (
            <div className="absolute top-6 left-10 z-50">
              <CalendarModeModal mode={mode} onSelect={handleModeSelect} />
            </div>
          )}
        </div>
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
        mode={mode}
        onSelectDate={setSelectedDate}
      />
    </div>
  );
};
