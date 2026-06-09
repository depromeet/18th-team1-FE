"use client";

import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  isAfter,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { useMemo } from "react";
import { useCalendarStore } from "@/store/calendar/useCalendarStore";

interface UseCalendarReturn {
  viewDate: Date;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  days: Date[];
  handlePrev: () => void;
  handleNext: () => void;
}

export const useCalendar = (): UseCalendarReturn => {
  const { selectedDate, setSelectedDate, viewDate, setViewDate } = useCalendarStore();

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(viewDate), { weekStartsOn: 0 });
    const end = endOfWeek(endOfMonth(viewDate), { weekStartsOn: 0 });
    return eachDayOfInterval({ start, end });
  }, [viewDate]);

  const getMostRecentSelectableDate = (lastDay: Date): Date => {
    const today = startOfDay(new Date());
    return isAfter(startOfDay(lastDay), today) ? today : lastDay;
  };

  const handlePrev = () => {
    const today = startOfDay(new Date());
    const newViewDate = subMonths(viewDate, 1);
    setViewDate(newViewDate);
    if (!isAfter(startOfMonth(newViewDate), today)) {
      setSelectedDate(getMostRecentSelectableDate(endOfMonth(newViewDate)));
    }
  };

  const handleNext = () => {
    const today = startOfDay(new Date());
    const newViewDate = addMonths(viewDate, 1);
    setViewDate(newViewDate);
    if (!isAfter(startOfMonth(newViewDate), today)) {
      setSelectedDate(getMostRecentSelectableDate(endOfMonth(newViewDate)));
    }
  };

  return {
    viewDate,
    selectedDate,
    setSelectedDate,
    days,
    handlePrev,
    handleNext,
  };
};
