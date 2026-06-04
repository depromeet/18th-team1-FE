import { useEffect, useState } from "react";

interface UseInfiniteSliderOptions {
  count: number;
  intervalMs: number;
}

interface UseInfiniteSliderResult {
  slideIndex: number;
  isAnimating: boolean;
  isPaused: boolean;
  togglePause: () => void;
  handleTransitionEnd: () => void;
}

export const useInfiniteSlider = ({
  count,
  intervalMs,
}: UseInfiniteSliderOptions): UseInfiniteSliderResult => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (count <= 1 || isPaused) return;
    const timer = setInterval(() => {
      setIsAnimating(true);
      setSlideIndex((prev) => prev + 1);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [count, intervalMs, isPaused]);

  const togglePause = (): void => setIsPaused((prev) => !prev);

  const handleTransitionEnd = () => {
    if (slideIndex === count) {
      setIsAnimating(false);
      setSlideIndex(0);
    }
  };

  return { slideIndex, isAnimating, isPaused, togglePause, handleTransitionEnd };
};
