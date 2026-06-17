"use client";

import { useRef } from "react";

const SWIPE_THRESHOLD_PX = 50;

interface UseMonthSwipeParams {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
}

interface UseMonthSwipeReturn {
  handlePointerDown: (e: React.PointerEvent) => void;
  handlePointerUp: (e: React.PointerEvent) => void;
}

export const useMonthSwipe = ({
  onSwipeLeft,
  onSwipeRight,
  isPrevDisabled,
  isNextDisabled,
}: UseMonthSwipeParams): UseMonthSwipeReturn => {
  const pointerStartXRef = useRef(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStartXRef.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const deltaX = e.clientX - pointerStartXRef.current;
    if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX) return;

    if (deltaX < 0 && !isNextDisabled) {
      onSwipeLeft();
    } else if (deltaX > 0 && !isPrevDisabled) {
      onSwipeRight();
    }
  };

  return { handlePointerDown, handlePointerUp };
};
