"use client";

import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";

import { Header } from "@/widgets/header";

const SentenceLayout = ({ children }: { children: ReactNode }): React.ReactElement => {
  const pathname = usePathname();
  const router = useRouter();

  const handleBack = pathname.endsWith("/list")
    ? (): void => {
        const id = pathname.split("/")[3];
        router.push(`/diary/sentence/${id}`);
      }
    : (): void => {
        router.push("/");
      };

  return (
    <div className="flex h-full flex-col bg-gray-0">
      <div className="shrink-0">
        <Header title="오늘의 문장" onBack={handleBack} />
      </div>
      <main className="flex flex-1 flex-col overflow-hidden">{children}</main>
    </div>
  );
};

export default SentenceLayout;
