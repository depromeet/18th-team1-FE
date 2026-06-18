"use client";

import { AnimatePresence, LayoutGroup } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import {
  fetchSentenceTodayImage,
  SentenceCardPhase,
  SentenceDatePhase,
} from "@/features/sentence-select";
import { fetchTodaySentenceCardImage } from "@/features/sentence-share";
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
  const [isSharing, setIsSharing] = useState(false);
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

  const handleShare = async (): Promise<void> => {
    if (isSharing) return;

    if (!navigator.share) {
      alert("이 브라우저에서는 공유 기능을 지원하지 않아요.");
      return;
    }

    const recommendationId = selectedQuote?.recommendationId;
    if (!recommendationId) return;

    setIsSharing(true);
    try {
      const blob = await fetchSentenceTodayImage(recommendationId);
      const blob = await fetchTodaySentenceCardImage(dailyRecommendationId, 1);
      const file = new File([blob], "sentence-today.png", { type: "image/png" });

      if (!navigator.canShare?.({ files: [file] })) {
        alert("이 기기에서는 이미지 공유를 지원하지 않아요.");
        return;
      }

      await navigator.share({ files: [file] });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      alert("공유에 실패했어요. 다시 시도해주세요.");
    } finally {
      setIsSharing(false);
    }
  };

  return (
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
                onClick: handleShare,
              }}
            />
          )}
        </AnimatePresence>
      </LayoutGroup>
    </div>
  );
};
