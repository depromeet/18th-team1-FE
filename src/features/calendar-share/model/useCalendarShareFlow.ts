"use client";

import { useState } from "react";

import type { CalendarShareStep, ShareType } from "./calendar-share.types";

interface CalendarShareFlowReturn {
  step: CalendarShareStep;
  openTypeSheet: () => void;
  selectType: (shareType: ShareType) => void;
  selectDate: (date: string) => void;
  close: () => void;
}

export const useCalendarShareFlow = (): CalendarShareFlowReturn => {
  const [step, setStep] = useState<CalendarShareStep>({ type: "idle" });

  const openTypeSheet = (): void => setStep({ type: "type-sheet" });

  const selectType = (shareType: ShareType): void => {
    if (shareType === "sentence-pick") {
      setStep({ type: "date-drawer" });
      return;
    }
    setStep({ type: "card-drawer", shareType });
  };

  const selectDate = (date: string): void => {
    setStep({ type: "card-drawer", shareType: "sentence-pick", date });
  };

  const close = (): void => setStep({ type: "idle" });

  return { step, openTypeSheet, selectType, selectDate, close };
};
