"use client";

import { useEffect, useRef, useState } from "react";

const TUTORIAL_KEY = "emotion-tutorial-seen";

export const useEmotionTutorial = () => {
  // null = sessionStorage 확인 전 (SSR hydration mismatch 방지)
  const [showTutorial, setShowTutorial] = useState<boolean | null>(null);
  const [shouldDropAnimate, setShouldDropAnimate] = useState(false);
  const dropTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    setShowTutorial(sessionStorage.getItem(TUTORIAL_KEY) !== "true");

    return () => {
      mountedRef.current = false;
      clearTimeout(dropTimerRef.current);

      // React Strict Mode는 동기적으로 cleanup → remount 실행.
      // setTimeout(0) 시점엔 remount로 인해 mountedRef가 이미 true로 복구됨 → 클리어 안 함.
      // 실제 페이지 이탈(unmount 후 remount 없음) 시에만 sessionStorage 제거 → 다음 진입 때 오버레이 재표시.
      setTimeout(() => {
        if (!mountedRef.current) {
          sessionStorage.removeItem(TUTORIAL_KEY);
        }
      }, 0);
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
