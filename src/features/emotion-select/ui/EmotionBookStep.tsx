"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { EMOTIONS } from "@/features/emotion-select/model/emotion";
import { useEmotionBookDrag } from "@/features/emotion-select/model/useEmotionBookDrag";
import { EmotionBookBadge } from "@/features/emotion-select/ui/EmotionBookBadge";
import { type BookType, EmotionBookItem } from "@/features/emotion-select/ui/EmotionBookItem";
import { OpenBook } from "@/features/emotion-select/ui/OpenBook";
import { Text } from "@/shared/ui/text";

// index 1이 마지막 착지: delay (8-1)*0.09 + duration 0.9 = 1.53s
const TEXT_APPEAR_DELAY = 1.55;
const BADGE_APPEAR_DELAY = 1.68;

// 모든 책 높이 합산 (BOOK_CONFIG height 총합)
const BOOKS_NATURAL_H = 407;
// OpenBook 내 사과가 books 컨테이너 상단 위로 돌출되는 높이 (bottom:62 - wrapper_height:39 + apple_height:60)
const APPLE_CLEARANCE = 83;

// 피그마 375px 프레임 기준 left값 - px-5(20px) 패딩 = marginLeft
const BOOK_CONFIG: { type: BookType; ml: number; width: number; height: number }[] = [
  { type: "thin", ml: 92, width: 165, height: 39 }, // 0: 아주 기분 좋아요 (오픈북, 실제 렌더 크기 165×64)
  { type: "thin", ml: 71, width: 176, height: 39 }, // 1: 기분 좋아요
  { type: "thick", ml: 79, width: 198, height: 53 }, // 2: 약간 기분 좋아요
  { type: "thin", ml: 114, width: 176, height: 39 }, // 3: 꽤 괜찮아요
  { type: "thick", ml: 76, width: 198, height: 53 }, // 4: 나쁘지 않아요
  { type: "thin", ml: 51, width: 176, height: 39 }, // 5: 그저그래요
  { type: "thick", ml: 76, width: 198, height: 53 }, // 6: 약간 별로에요
  { type: "thin", ml: 109, width: 176, height: 39 }, // 7: 별로에요
  { type: "thick", ml: 76, width: 198, height: 53 }, // 8: 아주 별로에요
];

interface EmotionBookStepProps {
  onValidChange: (isDisabled: boolean) => void;
  isTutorialActive?: boolean;
  shouldDropAnimate?: boolean;
}

export const EmotionBookStep = ({
  onValidChange,
  isTutorialActive = false,
  shouldDropAnimate = false,
}: EmotionBookStepProps): React.ReactElement => {
  const {
    selectedIndex,
    showApple,
    dismissApple,
    containerRef,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  } = useEmotionBookDrag({ onValidChange });

  const spacerRef = useRef<HTMLDivElement>(null);
  const [booksScale, setBooksScale] = useState(1);

  useEffect(() => {
    const spacer = spacerRef.current;
    if (!spacer) return;

    const updateScale = () => {
      const minBadgeGap = 20;
      const scale = Math.min(
        1,
        (BOOKS_NATURAL_H + spacer.clientHeight - minBadgeGap) / (BOOKS_NATURAL_H + APPLE_CLEARANCE),
      );
      setBooksScale(scale);
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(spacer);
    return () => observer.disconnect();
  }, []);

  const isColored = (index: number) =>
    isTutorialActive || (selectedIndex !== null && index >= selectedIndex);

  const badgeLabel =
    selectedIndex === null
      ? "책을 쌓아주세요"
      : selectedIndex === 0 && showApple
        ? "아주 기분 좋아요!"
        : (EMOTIONS[selectedIndex]?.label ?? "책을 쌓아주세요");

  const dropReveal = (delay: number) =>
    shouldDropAnimate
      ? {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.35, ease: "easeOut" as const, delay },
        }
      : {
          initial: { opacity: 1, y: 0 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0 },
        };

  return (
    <div className="flex h-full flex-col">
      <motion.div {...dropReveal(TEXT_APPEAR_DELAY)}>
        <Text variant="head2" color="gray-700" className="text-center">
          오늘의 기분을 표현해주세요
        </Text>
      </motion.div>
      <motion.div {...dropReveal(BADGE_APPEAR_DELAY)}>
        <EmotionBookBadge label={badgeLabel} isSelected={selectedIndex !== null} />
      </motion.div>
      <div ref={spacerRef} className="flex-1" />
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        id="emotion-book-container"
        className={`w-full max-w-[335px] mx-auto flex flex-col touch-none select-none${isTutorialActive ? " pointer-events-none" : ""}`}
        style={{ transform: `scale(${booksScale})`, transformOrigin: "bottom center" }}
      >
        {EMOTIONS.map((emotion, index) => {
          const config = BOOK_CONFIG[index];
          if (!config) return null;
          const { type, ml, width, height } = config;

          if (index === 0) {
            return (
              <OpenBook
                key={emotion.id}
                isVisible={isColored(0)}
                showApple={isTutorialActive || showApple}
                isTutorialActive={isTutorialActive}
                onAppleDismiss={dismissApple}
              />
            );
          }

          return (
            <EmotionBookItem
              key={emotion.id}
              index={index}
              width={width}
              height={height}
              marginLeft={ml}
              bookType={type}
              coloredImageSrc={`/images/emotion/book-${EMOTIONS.length - index}.png`}
              isColored={isColored(index)}
              isTutorialActive={isTutorialActive}
              shouldDropAnimate={shouldDropAnimate}
            />
          );
        })}
      </div>
    </div>
  );
};
