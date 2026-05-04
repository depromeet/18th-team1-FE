"use client";

import { Text } from "@/shared/ui/text";

import { CATEGORY_BG, EMOTIONS } from "../model/emotion";
import { useEmotionBookDrag } from "../model/useEmotionBookDrag";

interface EmotionBookStepProps {
  onValidChange: (isDisabled: boolean) => void;
}

export const EmotionBookStep = ({ onValidChange }: EmotionBookStepProps): React.ReactElement => {
  const { selectedIndex, containerRef, handlePointerDown, handlePointerMove, handlePointerUp } =
    useEmotionBookDrag({ onValidChange });

  const getBookClasses = (index: number): string => {
    if (selectedIndex === null) return "bg-gray-50";
    const selected = EMOTIONS[selectedIndex];
    if (!selected) return "bg-gray-50";
    if (index === selectedIndex) return CATEGORY_BG[selected.category];
    if (index > selectedIndex) return `${CATEGORY_BG[selected.category]} opacity-70`;
    return "bg-gray-50";
  };

  const isBookColored = (index: number): boolean => {
    if (selectedIndex === null) return false;
    return index >= selectedIndex;
  };

  return (
    <div className="flex h-full flex-col pb-3.25 pt-4.75">
      <Text variant="subhead1" color="gray-700">
        책을 위아래로 드래그해
        <br />
        오늘의 기분을 표현해주세요
      </Text>
      <div className="max-h-17.75 flex-1" />
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="flex flex-col gap-1 touch-none select-none"
      >
        {EMOTIONS.map((emotion, index) => (
          <div
            key={emotion.id}
            className={`relative flex h-11.5 w-54.5 shrink-0 items-center justify-center overflow-hidden rounded-[4px] transition-[background-color,opacity] duration-150 ease-out ${getBookClasses(index)} ${index % 2 === 0 ? "mx-auto" : "ml-18"}`}
          >
            {selectedIndex === index && (
              <Text
                as="span"
                variant="subhead1"
                color="gray-0"
                className="animate-in fade-in duration-150"
              >
                {emotion.label}
              </Text>
            )}
            {isBookColored(index) && (
              <div className="absolute left-4.25 top-0 h-12.25 w-6 bg-white opacity-20 transition-opacity duration-150 ease-out" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
