"use client";

import { AnimatePresence, LayoutGroup } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import type { SentenceTag } from "@/entities/sentence";
import {
  fetchSentenceShareImage,
  SentenceCardPhase,
  SentenceDatePhase,
} from "@/features/sentence-share";
import { IcShare3 } from "@/shared/ui/icons";
import { useEmotionSelectStore } from "@/store/emotion-select/useEmotionSelectStore";
import { Header } from "@/widgets/header";

const MOCK_QUOTE = {
  quote: "세상에는 두 종류의 고통이 있다.\n너를 아프게 하는 고통과 너를 변하게하는 고통",
  bookTitle: "『아픔이 길이 되려면』",
  bookAuthor: "김승섭",
};

const MOCK_TAGS: SentenceTag[] = [
  { id: 1, label: "자책하고 싶은", type: "emotion", emotionRangeId: 1 },
  { id: 2, label: "위로받고 싶은", type: "tone", emotionRangeId: 2 },
  { id: 3, label: "위로받고 싶은", type: "tone", emotionRangeId: 3 },
];

interface SentenceShareViewProps {
  initialPhase?: "date" | "card";
}

export const SentenceShareView = ({
  initialPhase = "date",
}: SentenceShareViewProps): React.ReactElement => {
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

    const dailyRecommendationId = selectedQuote?.dailyRecommendationId;
    if (!dailyRecommendationId) return;

    setIsSharing(true);
    try {
      const blob = await fetchSentenceShareImage(dailyRecommendationId);
      const file = new File([blob], "sentence-share.png", { type: "image/png" });

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
              quote={MOCK_QUOTE.quote}
              bookTitle={MOCK_QUOTE.bookTitle}
              bookAuthor={MOCK_QUOTE.bookAuthor}
              tags={MOCK_TAGS}
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
