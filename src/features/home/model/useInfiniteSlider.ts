import { useEffect, useState } from "react";

interface UseInfiniteSliderOptions {
  count: number;
  intervalMs: number;
}

interface UseInfiniteSliderResult {
  slideIndex: number;
  isAnimating: boolean;
  handleTransitionEnd: () => void;
}

export const useInfiniteSlider = ({
  count,
  intervalMs,
}: UseInfiniteSliderOptions): UseInfiniteSliderResult => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (count <= 1) return;
    const timer = setInterval(() => {
      setIsAnimating(true);
      setSlideIndex((prev) => prev + 1);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [count, intervalMs]);

  const handleTransitionEnd = () => {
    if (slideIndex === count) {
      setIsAnimating(false);
      setSlideIndex(0);
    }
  };

  return { slideIndex, isAnimating, handleTransitionEnd };
};
