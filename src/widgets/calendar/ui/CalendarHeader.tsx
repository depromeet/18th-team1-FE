"use client";

import { IcProfileNone } from "@/shared/ui/icons";

export const CalendarHeader = () => {
  return (
    <header className="h-15 flex items-center justify-between px-5">
      <span className="title3 text-gray-700">캘린더</span>
      <IcProfileNone />
    </header>
  );
};
