"use client";

import { useEffect, useRef, useState } from "react";

const TUTORIAL_KEY = "emotion-tutorial-seen";

export const useEmotionTutorial = () => {
  // null = sessionStorage 확인 전 (SSR hydration mismatch 방지)
  const [showTutorial, setShowTutorial] = useState<boolean | null>(null);
  const [shouldDropAnimate, setShouldDropAnimate] = useState(false);
  const dropTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    setShowTutorial(sessionStorage.getItem(TUTORIAL_KEY) !== "true");

    return () => {
      clearTimeout(dropTimerRef.current);
    };
  }, []);

  const dismissTutorial = (): void => {
    setShowTutorial(false);
    setShouldDropAnimate(true);
    sessionStorage.setItem(TUTORIAL_KEY, "true");
    // drop 애니메이션 완료 후 비활성화 (드래그 해제 시 재생 방지)
    dropTimerRef.current = setTimeout(() => setShouldDropAnimate(false), 2200);
  };

  return { showTutorial: showTutorial ?? false, dismissTutorial, shouldDropAnimate };
};
