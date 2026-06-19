"use client";

import { AnimatePresence, LayoutGroup } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { SentenceCardPhase, SentenceDatePhase } from "@/features/sentence-select";
import { useSentenceShareCardDrawer } from "@/features/sentence-share";
import { IcShare3 } from "@/shared/ui/icons";
import { useEmotionSelectStore } from "@/store/emotion-select/useEmotionSelectStore";
import { Header } from "@/widgets/header";

interface SentenceTodayViewProps {
  initialPhase?: "date" | "card";
}

export const SentenceTodayView = ({
  initialPhase = "date",
}: SentenceTodayViewProps): React.ReactElement => {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<"date" | "card">(initialPhase);
  const { selectedQuote, reset } = useEmotionSelectStore();
  const { openSentenceShareCardDrawer } = useSentenceShareCardDrawer();

  const today = new Date();
  const month = today.toLocaleDateString("en-US", { month: "long" });
  const date = `${today.toLocaleDateString("en-US", { weekday: "long" })} ${today.getDate()}`;

  const handleGoHome = (): void => {
    reset();
    router.push("/");
  };

  const handleReveal = (): void => {
    setPhase("card");
    router.replace(`${pathname}?phase=card`);
  };

  // 모바일 브라우저/Android 물리 뒤로가기를 가로채서 홈으로 이동
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);

    const onPopState = (): void => {
      reset();
      router.push("/");
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [reset, router]);

  return (
    <div className="relative flex-1 overflow-hidden">
      <LayoutGroup>
        <AnimatePresence mode="sync">
          {phase === "date" ? (
            <SentenceDatePhase key="date" month={month} onReveal={handleReveal} />
          ) : (
            <SentenceCardPhase
              key="card"
              header={<Header onBack={handleGoHome} />}
              month={month}
              date={date}
              quote={selectedQuote?.content ?? ""}
              bookTitle={selectedQuote?.title ?? ""}
              bookAuthor={selectedQuote?.author ?? ""}
              bookCoverImage={selectedQuote?.image}
              tags={selectedQuote?.tags ?? []}
              leftButton={{ label: "확인", isMuted: false, onClick: handleGoHome }}
              rightButton={{
                label: "공유하기",
                icon: <IcShare3 size={24} className="text-gray-0" />,
                onClick: () => openSentenceShareCardDrawer({ shareType: "today-sentence" }),
              }}
            />
          )}
        </AnimatePresence>
      </LayoutGroup>
    </div>
  );
};
