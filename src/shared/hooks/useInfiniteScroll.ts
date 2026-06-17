import { useCallback, useEffect, useRef } from "react";

export const useInfiniteScroll = (
  onLoad: () => void,
  threshold = 0.75,
): React.RefObject<HTMLDivElement | null> => {
  const ref = useRef<HTMLDivElement>(null);
  const stableOnLoad = useCallback(onLoad, [onLoad]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      if ((scrollTop + clientHeight) / scrollHeight >= threshold) {
        stableOnLoad();
      }
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [stableOnLoad, threshold]);

  return ref;
};
