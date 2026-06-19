"use client";

import { IcNextCard, IcReport } from "@/shared/ui/icons";

interface MonthlyReportBannerProps {
  month: number;
  onClick?: () => void;
}

export const MonthlyReportBanner = ({ month, onClick }: MonthlyReportBannerProps) => {
  return (
    <div className="px-5 mb-5">
      <button
        type="button"
        onClick={onClick}
        className="w-full flex items-center justify-between rounded-2xl bg-muted pl-5 pr-2.5 py-5"
      >
        <div className="flex items-center gap-2">
          <IcReport size={24} className="text-key-primary" />
          <span className="subhead4 text-gray-600">{month}월 월말결산 보러가기</span>
        </div>
        <IcNextCard className="text-gray-300" />
      </button>
    </div>
  );
};
