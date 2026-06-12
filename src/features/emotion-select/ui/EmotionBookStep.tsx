"use client";

import { EMOTIONS } from "@/features/emotion-select/model/emotion";
import { useEmotionBookDrag } from "@/features/emotion-select/model/useEmotionBookDrag";
import { EmotionBookBadge } from "@/features/emotion-select/ui/EmotionBookBadge";
import { type BookType, EmotionBookItem } from "@/features/emotion-select/ui/EmotionBookItem";
import { OpenBook } from "@/features/emotion-select/ui/OpenBook";
import { Text } from "@/shared/ui/text";

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

  const isColored = (index: number) =>
    isTutorialActive || (selectedIndex !== null && index >= selectedIndex);

  const badgeLabel =
    selectedIndex === null
      ? "책을 쌓아주세요"
      : selectedIndex === 0 && showApple
        ? "아주 기분 좋아요!"
        : (EMOTIONS[selectedIndex]?.label ?? "책을 쌓아주세요");

  return (
    <div className="flex h-full flex-col">
      <Text variant="head2" color="gray-700" className="text-center">
        오늘의 기분을 표현해주세요
      </Text>
      <EmotionBookBadge label={badgeLabel} isSelected={selectedIndex !== null} />
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        id="emotion-book-container"
        className={`mt-auto flex flex-col touch-none select-none${isTutorialActive ? " pointer-events-none" : ""}`}
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
