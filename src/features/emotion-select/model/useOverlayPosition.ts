"use client";

import { useEffect, useRef, useState } from "react";

interface OverlayPosition {
  top: number | null;
  left: number | null;
}

export const useOverlayPosition = (trailHeight: number) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<OverlayPosition>({ top: null, left: null });

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const el = containerRef.current;
      if (!el) return;
      setPosition({
        top: Math.round(el.offsetHeight / 2 - trailHeight / 2),
        left: Math.round(el.offsetWidth / 2) - 30,
      });
    });
    return () => cancelAnimationFrame(raf);
  }, [trailHeight]);

  return { containerRef, position };
};
