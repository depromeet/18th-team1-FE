"use client";

import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
} from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useCalendarStore } from "@/store/calendar/useCalendarStore";
import type { CalendarMode } from "./calendar.types";

interface UseCalendarReturn {
  viewDate: Date;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  mode: CalendarMode;
  setMode: (newMode: CalendarMode) => void;
  days: Date[];
  handlePrev: () => void;
  handleNext: () => void;
}

export const useCalendar = (): UseCalendarReturn => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const modeFromParams = searchParams.get("mode");
  const mode: CalendarMode = modeFromParams === "monthly" ? "monthly" : "weekly";

  const [viewDate, setViewDate] = useState(new Date());
  const { selectedDate, setSelectedDate } = useCalendarStore();

  const setMode = (newMode: CalendarMode): void => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("mode", newMode);
    router.replace(`?${params.toString()}`);
  };

  const days = useMemo(() => {
    const start =
      mode === "monthly"
        ? startOfWeek(startOfMonth(viewDate), { weekStartsOn: 0 })
        : startOfWeek(viewDate, { weekStartsOn: 0 });

    const end =
      mode === "monthly"
        ? endOfWeek(endOfMonth(viewDate), { weekStartsOn: 0 })
        : endOfWeek(viewDate, { weekStartsOn: 0 });

    return eachDayOfInterval({ start, end });
  }, [viewDate, mode]);

  const handlePrev = (): void => {
    if (mode === "monthly") {
      setViewDate((prev) => subMonths(prev, 1));
      return;
    }
    setViewDate((prev) => {
      const prevDay = subDays(startOfWeek(prev, { weekStartsOn: 0 }), 1);
      return isSameMonth(prevDay, prev) ? prevDay : endOfMonth(prevDay);
    });
  };

  const handleNext = (): void => {
    if (mode === "monthly") {
      setViewDate((prev) => addMonths(prev, 1));
      return;
    }
    setViewDate((prev) => {
      const nextDay = addDays(endOfWeek(prev, { weekStartsOn: 0 }), 1);
      return isSameMonth(nextDay, prev) ? nextDay : startOfMonth(nextDay);
    });
  };

  return {
    viewDate,
    selectedDate,
    setSelectedDate,
    mode,
    setMode,
    days,
    handlePrev,
    handleNext,
  };
};
