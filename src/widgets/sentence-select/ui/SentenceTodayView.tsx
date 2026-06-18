"use client";

import { AnimatePresence, LayoutGroup } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { SentenceCardPhase, SentenceDatePhase } from "@/features/sentence-select";
import { SentenceShareCardDrawer } from "@/features/sentence-share";
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
  const [isShareDrawerOpen, setIsShareDrawerOpen] = useState(false);
  const { selectedQuote, reset } = useEmotionSelectStore();

  const today = new Date();
  const month = today.toLocaleDateString("en-US", { month: "long" });
  const date = `${today.toLocaleDateString("en-US", { weekday: "long" })} ${today.getDate()}`;

  const handleReveal = (): void => {
    setPhase("card");
    router.replace(`${pathname}?phase=card`);
  };

  const handleConfirm = (): void => {
    reset();
    router.push("/");
  };

  return (
    <>
      <div className="relative flex-1 overflow-hidden">
        <LayoutGroup>
          <AnimatePresence mode="sync">
            {phase === "date" ? (
              <SentenceDatePhase key="date" month={month} onReveal={handleReveal} />
            ) : (
              <SentenceCardPhase
                key="card"
                header={<Header onBack={() => router.back()} />}
                month={month}
                date={date}
                quote={selectedQuote?.content ?? ""}
                bookTitle={selectedQuote?.title ?? ""}
                bookAuthor={selectedQuote?.author ?? ""}
                bookCoverImage={selectedQuote?.image}
                tags={selectedQuote?.tags ?? []}
                leftButton={{ label: "확인", isMuted: false, onClick: handleConfirm }}
                rightButton={{
                  label: "공유하기",
                  icon: <IcShare3 size={24} className="text-gray-0" />,
                  onClick: () => setIsShareDrawerOpen(true),
                }}
              />
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>
      <SentenceShareCardDrawer
        isOpen={isShareDrawerOpen}
        shareType="today-sentence"
        onClose={() => setIsShareDrawerOpen(false)}
      />
    </>
  );
};
