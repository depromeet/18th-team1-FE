"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useReportData } from "@/entities/report";
import { useReportShare } from "@/features/report-share";
import { IcShare4 } from "@/shared/ui/icons";
import { Header } from "@/widgets/header";

interface ReportLayoutProps {
  children: ReactNode;
}

const ReportLayout = ({ children }: ReportLayoutProps) => {
  const router = useRouter();
  const { handleShare } = useReportShare();
  const { hasReportContent } = useReportData();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-col h-full bg-gray-0">
      <Header
        title="월말결산"
        onBack={handleBack}
        right={
          hasReportContent && (
            <button
              type="button"
              onClick={handleShare}
              className="text-gray-700"
              aria-label="공유하기"
            >
              <IcShare4 />
            </button>
          )
        }
      />
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {children}
      </div>
    </div>
  );
};

export default ReportLayout;
