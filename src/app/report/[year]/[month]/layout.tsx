"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { IcShare4 } from "@/shared/ui/icons";
import { Header } from "@/widgets/header";

interface ReportLayoutProps {
  children: ReactNode;
}

const ReportLayout = ({ children }: ReportLayoutProps) => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-col h-full bg-gray-0">
      <Header title="월말결산" onBack={handleBack} right={<IcShare4 className="text-gray-700" />} />
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {children}
      </div>
    </div>
  );
};

export default ReportLayout;
