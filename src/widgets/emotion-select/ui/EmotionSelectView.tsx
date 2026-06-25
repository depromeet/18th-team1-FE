"use client";

import { useEffect, useRef, useState } from "react";

import {
  EmotionBookStep,
  EmotionTutorialOverlay,
  SentenceTypeStep,
  SituationDescriptionStep,
  SituationStep,
  useEmotionStep,
  useEmotionTutorial,
} from "@/features/emotion-select";
import { useViewportHeight } from "@/shared/hooks/useViewportHeight";
import { NewButton } from "@/shared/ui/new-button";
import { Header } from "@/widgets/header";
import { RecommendationLoadingView } from "./RecommendationLoadingView";

export const EmotionSelectView = (): React.ReactElement => {
  useViewportHeight();
  const { currentStep, isLoading, handleBack, handleNext } = useEmotionStep();
  const { showTutorial, dismissTutorial, shouldDropAnimate, isResolved } = useEmotionTutorial();
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [isDirectInputActive, setIsDirectInputActive] = useState(false);
  const [isDirectSubmitting, setIsDirectSubmitting] = useState(false);
  const hiddenTextareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (currentStep !== 3) return;
    const h =
      document.documentElement.style.getPropertyValue("--vh-no-keyboard") ||
      `${window.visualViewport?.height ?? window.innerHeight}px`;
    document.documentElement.style.setProperty("--step3-vh", h);
    return () => {
      document.documentElement.style.removeProperty("--step3-vh");
    };
  }, [currentStep]);

  const isRecommending = isLoading || isDirectSubmitting;

  const handleNextWithKeyboard = (): void => {
    if (currentStep === 2) hiddenTextareaRef.current?.focus();
    handleNext();
  };

  if (isRecommending) return <RecommendationLoadingView />;

  const stepContent: Record<number, React.ReactNode> = {
    1: (
      <div className="flex min-h-0 flex-1 flex-col px-5">
        {isResolved && (
          <EmotionBookStep
            onValidChange={setIsNextDisabled}
            isTutorialActive={showTutorial}
            shouldDropAnimate={shouldDropAnimate}
          />
        )}
      </div>
    ),
    2: (
      <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-4">
        <SituationStep onValidChange={setIsNextDisabled} />
      </div>
    ),
    3: (
      <div
        className="flex min-h-0 flex-1 flex-col px-5"
        style={{ paddingBottom: "calc(76px + env(safe-area-inset-bottom, 0px))" }}
      >
        <SituationDescriptionStep onValidChange={setIsNextDisabled} />
      </div>
    ),
    4: (
      <SentenceTypeStep
        onValidChange={setIsNextDisabled}
        onDirectInputActiveChange={setIsDirectInputActive}
        onLoadingChange={setIsDirectSubmitting}
      />
    ),
  };

  const ctaDisabled = isNextDisabled || isLoading;
  // 스텝3: fixed CTA / 스텝4 직접입력 활성: CTA 숨김 / 나머지: 일반 CTA
  const ctaVariant =
    currentStep === 3 ? "fixed" : currentStep === 4 && isDirectInputActive ? "hidden" : "normal";

  return (
    <div
      className={`fixed inset-x-0 top-0 flex flex-col gap-1 md:left-1/2 md:right-auto md:w-93.75 md:-translate-x-1/2 ${currentStep === 1 ? "bg-muted" : "bg-background"}`}
      style={{
        height:
          currentStep === 3
            ? "var(--step3-vh, 100dvh)"
            : currentStep === 4
              ? "var(--vh, 100dvh)"
              : "100dvh",
      }}
    >
      <textarea
        ref={hiddenTextareaRef}
        readOnly
        className="pointer-events-none fixed left-0 top-0 h-4 w-4 opacity-0"
        tabIndex={-1}
      />
      <Header onBack={handleBack} />

      {stepContent[currentStep]}

      {currentStep === 1 && isResolved && showTutorial && (
        <EmotionTutorialOverlay onDismiss={dismissTutorial} />
      )}

      {ctaVariant === "normal" && (
        <>
          <div
            className="shrink-0"
            style={{ height: "calc(56px + env(safe-area-inset-bottom, 0px))" }}
          />
          <div
            className={`fixed inset-x-0 bottom-0 z-10 transition-colors md:left-1/2 md:right-auto md:w-93.75 md:-translate-x-1/2 ${ctaDisabled ? "bg-gray-100" : "bg-gray-700"}`}
            style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
          >
            <NewButton label="다음" disabled={ctaDisabled} onClick={handleNextWithKeyboard} />
          </div>
        </>
      )}
      {ctaVariant === "fixed" && (
        <div
          className={`fixed inset-x-0 bottom-0 z-10 transition-colors md:left-1/2 md:right-auto md:w-93.75 md:-translate-x-1/2 ${ctaDisabled ? "bg-gray-100" : "bg-gray-700"}`}
          style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        >
          <NewButton label="다음" disabled={ctaDisabled} onClick={handleNextWithKeyboard} />
        </div>
      )}
    </div>
  );
};
