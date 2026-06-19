"use client";

import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";

import { useEmotionSelectStore } from "@/store/emotion-select/useEmotionSelectStore";
import { Header } from "@/widgets/header";

const SentenceLayout = ({ children }: { children: ReactNode }): React.ReactElement => {
  const pathname = usePathname();
  const router = useRouter();
  const reset = useEmotionSelectStore((state) => state.reset);

  const isSentenceView = pathname === "/sentence";

  const handleBack = pathname.endsWith("/list")
    ? (): void => router.push("/sentence")
    : (): void => {
        reset();
        router.push("/");
      };

  // 모바일 브라우저/Android 물리 뒤로가기를 가로채서 홈으로 이동
  useEffect(() => {
    if (!isSentenceView) return;

    window.history.pushState(null, "", window.location.href);

    const handlePopState = (): void => {
      reset();
      router.push("/");
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [isSentenceView, reset, router]);

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
