"use client";

import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";

import { useEmotionSelectStore } from "@/store/emotion-select/useEmotionSelectStore";
import { Header } from "@/widgets/header";

const SentenceLayout = ({ children }: { children: ReactNode }): React.ReactElement => {
  const pathname = usePathname();
  const router = useRouter();
  const reset = useEmotionSelectStore((state) => state.reset);

  const handleBack = pathname.endsWith("/list")
    ? (): void => router.push("/sentence")
    : (): void => {
        reset();
        router.push("/");
      };

  return (
    <div className="flex h-full flex-col bg-muted">
      <div className="shrink-0">
        <Header title={pathname === "/sentence/list" ? "오늘의 문장" : ""} onBack={handleBack} />
      </div>
      <main className="flex flex-1 flex-col overflow-hidden">{children}</main>
    </div>
  );
};

export default SentenceLayout;
