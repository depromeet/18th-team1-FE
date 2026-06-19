import { useCallback, useEffect, useState } from "react";

interface UseInfiniteSliderOptions {
  count: number;
  intervalMs: number;
}

interface UseInfiniteSliderResult {
  slideIndex: number;
  isAnimating: boolean;
  isPaused: boolean;
  currentPosition: number;
  togglePause: () => void;
  handleTransitionEnd: () => void;
  goNext: () => void;
  goPrev: () => void;
}

export const useInfiniteSlider = ({
  count,
  intervalMs,
}: UseInfiniteSliderOptions): UseInfiniteSliderResult => {
  // count > 1일 때: slides = [lastClone, ...real, firstClone]
  // slideIndex 1..count = real slides, 0 = lastClone, count+1 = firstClone
  const [slideIndex, setSlideIndex] = useState(count > 1 ? 1 : 0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const goNext = useCallback(() => {
    if (count <= 1) return;
    setIsAnimating(true);
    setSlideIndex((prev) => prev + 1);
  }, [count]);

  const goPrev = useCallback(() => {
    if (count <= 1) return;
    setIsAnimating(true);
    setSlideIndex((prev) => prev - 1);
  }, [count]);

  useEffect(() => {
    if (count <= 1 || isPaused) return;
    const timer = setInterval(goNext, intervalMs);
    return () => clearInterval(timer);
  }, [count, intervalMs, isPaused, goNext]);

  const togglePause = (): void => setIsPaused((prev) => !prev);

  const handleTransitionEnd = () => {
    setIsAnimating(false);
    if (slideIndex === count + 1) {
      // firstClone 도달 → 실제 첫 슬라이드로 순간 이동
      setSlideIndex(1);
    } else if (slideIndex === 0) {
      // lastClone 도달 → 실제 마지막 슬라이드로 순간 이동
      setSlideIndex(count);
    }
  };

  // 1-indexed 현재 위치: clone 위치일 때도 올바른 실제 인덱스 반환
  const currentPosition = slideIndex === 0 ? count : slideIndex > count ? 1 : slideIndex;

  return {
    slideIndex,
    isAnimating,
    isPaused,
    currentPosition,
    togglePause,
    handleTransitionEnd,
    goNext,
    goPrev,
  };
};
