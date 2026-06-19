"use client";

import { useEffect, useRef, useState } from "react";

const TUTORIAL_KEY = "emotion-tutorial-seen";

export const useEmotionTutorial = () => {
  // null = sessionStorage 확인 전 (SSR hydration mismatch 방지)
  const [showTutorial, setShowTutorial] = useState<boolean | null>(null);
  const [shouldDropAnimate, setShouldDropAnimate] = useState(false);
  // false → effect 실행 전, true → 튜토리얼 표시 여부 확정 후
  // EmotionBookStep을 isResolved 이후에 마운트해야 shouldDropAnimate가
  // 첫 렌더에 반영되어 드롭 애니메이션이 정상 재생됨
  const [isResolved, setIsResolved] = useState(false);
  const dropTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const tutorialSeen = sessionStorage.getItem(TUTORIAL_KEY) === "true";
    setShowTutorial(!tutorialSeen);

    if (tutorialSeen) {
      // 튜토리얼을 이미 본 경우: 외부 페이지에서 진입 시 드롭 애니메이션 재생
      setShouldDropAnimate(true);
      dropTimerRef.current = setTimeout(() => setShouldDropAnimate(false), 2200);
    }

    // React 18+에서 같은 effect 내 state 업데이트는 배치 처리되므로
    // isResolved=true 시점에 shouldDropAnimate도 이미 true로 확정됨
    setIsResolved(true);

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

  return { showTutorial: showTutorial ?? false, dismissTutorial, shouldDropAnimate, isResolved };
};
