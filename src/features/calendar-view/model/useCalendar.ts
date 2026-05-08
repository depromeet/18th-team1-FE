"use client";

import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  isAfter,
  isSameMonth,
  min,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
} from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
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

  const { selectedDate, setSelectedDate, viewDate, setViewDate } = useCalendarStore();

  const setMode = (newMode: CalendarMode): void => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("mode", newMode);
    router.replace(`?${params.toString()}`);

    const today = startOfDay(new Date());
    const isCurrentFutureView =
      mode === "monthly"
        ? isAfter(startOfMonth(viewDate), today)
        : isAfter(startOfDay(startOfWeek(viewDate, { weekStartsOn: 0 })), today);

    if (!isCurrentFutureView) {
      setViewDate(selectedDate);
    }
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

  const getMostRecentSelectableDate = (lastDay: Date): Date => {
    const today = startOfDay(new Date());
    return isAfter(startOfDay(lastDay), today) ? today : lastDay;
  };

  const handlePrev = (): void => {
    const today = startOfDay(new Date());
    if (mode === "monthly") {
      const newViewDate = subMonths(viewDate, 1);
      setViewDate(newViewDate);
      if (!isAfter(startOfMonth(newViewDate), today)) {
        setSelectedDate(getMostRecentSelectableDate(endOfMonth(newViewDate)));
      }
      return;
    }
    const prevDay = subDays(startOfWeek(viewDate, { weekStartsOn: 0 }), 1);
    const newViewDate = isSameMonth(prevDay, viewDate) ? prevDay : endOfMonth(prevDay);
    setViewDate(newViewDate);
    const weekStart = startOfWeek(newViewDate, { weekStartsOn: 0 });
    if (!isAfter(startOfDay(weekStart), today)) {
      setSelectedDate(
        min([endOfWeek(newViewDate, { weekStartsOn: 0 }), endOfMonth(newViewDate), today]),
      );
    }
  };

  const handleNext = (): void => {
    const today = startOfDay(new Date());
    if (mode === "monthly") {
      const newViewDate = addMonths(viewDate, 1);
      setViewDate(newViewDate);
      if (!isAfter(startOfMonth(newViewDate), today)) {
        setSelectedDate(getMostRecentSelectableDate(endOfMonth(newViewDate)));
      }
      return;
    }
    const nextDay = addDays(endOfWeek(viewDate, { weekStartsOn: 0 }), 1);
    const newViewDate = isSameMonth(nextDay, viewDate) ? nextDay : startOfMonth(nextDay);
    setViewDate(newViewDate);
    const weekStart = startOfWeek(newViewDate, { weekStartsOn: 0 });
    if (!isAfter(startOfDay(weekStart), today)) {
      setSelectedDate(
        min([endOfWeek(newViewDate, { weekStartsOn: 0 }), endOfMonth(newViewDate), today]),
      );
    }
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
