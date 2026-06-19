"use client";

import { useEffect, useRef, useState } from "react";
import { useEmotionSelectStore } from "@/store/emotion-select/useEmotionSelectStore";
import { EMOTIONS, type EmotionCategory } from "./emotion";

// thin: 39px, thick: 53px — indices 0,1,3,5,7=thin / 2,4,6,8=thick
const BOOK_HEIGHTS = [39, 39, 53, 39, 53, 39, 53, 39, 53];
const CUMULATIVE_HEIGHTS: number[] = BOOK_HEIGHTS.reduce<number[]>(
  (acc, h) => {
    acc.push((acc.at(-1) ?? 0) + h);
    return acc;
  },
  [0],
);

interface UseEmotionBookDragProps {
  onValidChange: (isDisabled: boolean) => void;
}

export interface UseEmotionBookDragReturn {
  selectedIndex: number | null;
  showApple: boolean;
  dismissApple: () => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
  handlePointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
  handlePointerMove: (e: React.PointerEvent<HTMLDivElement>) => void;
  handlePointerUp: (e: React.PointerEvent<HTMLDivElement>) => void;
}

const getRestoredIndex = (emotionId: string | null): number | null => {
  if (!emotionId) return null;
  const index = EMOTIONS.findIndex((e) => e.id === emotionId);
  return index === -1 ? null : index;
};

export const useEmotionBookDrag = ({
  onValidChange,
}: UseEmotionBookDragProps): UseEmotionBookDragReturn => {
  const { selectedEmotionId, setSelectedEmotionId, isAppleVisible, setIsAppleVisible } =
    useEmotionSelectStore();

  const initialIndexRef = useRef(getRestoredIndex(selectedEmotionId));
  const [selectedIndex, setSelectedIndex] = useState<number | null>(initialIndexRef.current);
  const containerRef = useRef<HTMLDivElement>(null);
  const prevCategoryRef = useRef<EmotionCategory | null>(
    selectedEmotionId ? (EMOTIONS.find((e) => e.id === selectedEmotionId)?.category ?? null) : null,
  );
  const shouldDeselectRef = useRef(false);

  useEffect(() => {
    if (initialIndexRef.current !== null) {
      onValidChange(false);
    }
  }, [onValidChange]);

  useEffect(() => {
    if (selectedIndex !== 0) setIsAppleVisible(false);
  }, [selectedIndex, setIsAppleVisible]);

  const getIndexFromClientY = (clientY: number): number => {
    if (!containerRef.current) return -1;
    const rect = containerRef.current.getBoundingClientRect();
    const relativeY = clientY - rect.top;
    for (let i = 0; i < EMOTIONS.length; i++) {
      if (relativeY < (CUMULATIVE_HEIGHTS[i + 1] ?? Infinity)) return i;
    }
    return EMOTIONS.length - 1;
  };

  const trySelectEmotion = (index: number): void => {
    const emotion = EMOTIONS[index];
    if (!emotion) return;

    if (prevCategoryRef.current !== null && prevCategoryRef.current !== emotion.category) {
      navigator.vibrate?.(10);
    }
    prevCategoryRef.current = emotion.category;

    if (selectedIndex === null) {
      onValidChange(false);
    }
    setSelectedIndex(index);
    setSelectedEmotionId(emotion.id);
  };

  const handleIndexChange = (clientY: number): void => {
    const index = getIndexFromClientY(clientY);
    if (index === selectedIndex) return;
    trySelectEmotion(index);
  };

  const dismissApple = (): void => setIsAppleVisible(false);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>): void => {
    if (!containerRef.current) return;
    const relativeY = e.clientY - containerRef.current.getBoundingClientRect().top;
    if (relativeY < 0) return; // 사과 영역 — 컨테이너 위쪽 클릭 무시
    if (e.target === e.currentTarget) return; // 책 양옆 빈 공간 클릭 무시

    e.currentTarget.setPointerCapture(e.pointerId);
    const index = getIndexFromClientY(e.clientY);
    if (index === selectedIndex && index !== 0) {
      // index 0(최상단)에서는 클릭으로 deselect 하지 않음
      shouldDeselectRef.current = true;
    } else {
      shouldDeselectRef.current = false;
      if (index !== selectedIndex) handleIndexChange(e.clientY);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>): void => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
    if (containerRef.current && selectedIndex === 0) {
      const relativeY = e.clientY - containerRef.current.getBoundingClientRect().top;
      if (relativeY < 0) setIsAppleVisible(true);
    }
    if (shouldDeselectRef.current) {
      const index = getIndexFromClientY(e.clientY);
      if (index !== selectedIndex) {
        shouldDeselectRef.current = false;
        trySelectEmotion(index);
      }
      return;
    }
    handleIndexChange(e.clientY);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>): void => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    if (shouldDeselectRef.current) {
      shouldDeselectRef.current = false;
      setSelectedIndex(null);
      setSelectedEmotionId(null);
      onValidChange(true);
    }
  };

  return {
    selectedIndex,
    showApple: isAppleVisible,
    dismissApple,
    containerRef,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  };
};
