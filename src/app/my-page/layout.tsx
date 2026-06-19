"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

import { IcSetting } from "@/shared/ui/icons";
import { Header } from "@/widgets/header";

const MyPageLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-gray-50 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <Header
        onBack={() => (window.history.length > 1 ? router.back() : router.push("/"))}
        right={
          <button type="button" aria-label="설정" onClick={() => router.push("/my-page/settings")}>
            <IcSetting size={24} className="text-gray-700" />
          </button>
        }
      />
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  );
};

export default MyPageLayout;
