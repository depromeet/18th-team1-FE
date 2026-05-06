"use client";

import { useEffect, useRef, useState } from "react";

import { EMOTIONS, type EmotionCategory } from "./emotion";
import { useDiaryEmotionStore } from "./useDiaryEmotionStore";

const ITEM_HEIGHT = 46;
const ITEM_GAP = 4;
const ITEM_UNIT: number = ITEM_HEIGHT + ITEM_GAP;

interface UseEmotionBookDragProps {
  onValidChange: (isDisabled: boolean) => void;
}

export interface UseEmotionBookDragReturn {
  selectedIndex: number | null;
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
  const { selectedEmotionId, setSelectedEmotionId } = useDiaryEmotionStore();

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

  const getIndexFromClientY = (clientY: number): number => {
    if (!containerRef.current) return -1;
    const rect = containerRef.current.getBoundingClientRect();
    const relativeY = clientY - rect.top;
    const rawIndex = Math.floor(relativeY / ITEM_UNIT);
    return Math.max(0, Math.min(EMOTIONS.length - 1, rawIndex));
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

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>): void => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const index = getIndexFromClientY(e.clientY);
    if (index === selectedIndex) {
      shouldDeselectRef.current = true;
    } else {
      shouldDeselectRef.current = false;
      handleIndexChange(e.clientY);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>): void => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
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

  return { selectedIndex, containerRef, handlePointerDown, handlePointerMove, handlePointerUp };
};
