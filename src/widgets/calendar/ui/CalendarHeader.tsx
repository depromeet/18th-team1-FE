"use client";

import { IcSetting, IcShare } from "@/shared/ui/icons";
import { Header } from "@/widgets/header";

export const CalendarHeader = (): React.ReactElement => {
  return (
    <Header
      title="캘린더"
      className="px-4"
      right={
        <div className="flex items-center gap-3.5">
          <button type="button" className="text-gray-700" aria-label="공유">
            <IcShare size={24} />
          </button>
          <button type="button" className="text-gray-700" aria-label="설정">
            <IcSetting size={24} />
          </button>
        </div>
      }
    />
  );
};
