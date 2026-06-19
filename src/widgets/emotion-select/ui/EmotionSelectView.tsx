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
import { SafeAreaBottom } from "@/shared/ui/safe-area-bottom";
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
    if (currentStep === 2) {
      hiddenTextareaRef.current?.focus();
    }
    handleNext();
  };

  if (isRecommending) {
    return <RecommendationLoadingView />;
  }

  return (
    <div
      className={`fixed inset-x-0 top-0 flex flex-col gap-1 md:left-1/2 md:right-auto md:w-93.75 md:-translate-x-1/2 ${currentStep === 1 ? "bg-muted" : "bg-background"}`}
      style={{ height: currentStep === 3 ? "var(--step3-vh, 100vh)" : "var(--vh, 100lvh)" }}
    >
      <textarea
        ref={hiddenTextareaRef}
        readOnly
        className="pointer-events-none fixed left-0 top-0 h-4 w-4 opacity-0"
        tabIndex={-1}
      />
      <Header onBack={handleBack} />
      {currentStep === 1 ? (
        <div className="flex min-h-0 flex-1 flex-col px-5">
          {isResolved && (
            <EmotionBookStep
              onValidChange={setIsNextDisabled}
              isTutorialActive={showTutorial}
              shouldDropAnimate={shouldDropAnimate}
            />
          )}
        </div>
      ) : currentStep === 4 ? (
        <SentenceTypeStep
          onValidChange={setIsNextDisabled}
          onDirectInputActiveChange={setIsDirectInputActive}
          onLoadingChange={setIsDirectSubmitting}
        />
      ) : currentStep === 2 ? (
        <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-4">
          <SituationStep onValidChange={setIsNextDisabled} />
        </div>
      ) : (
        <div
          className="min-h-0 flex-1 flex flex-col px-5"
          style={{ paddingBottom: "calc(76px + env(safe-area-inset-bottom, 0px))" }}
        >
          <SituationDescriptionStep onValidChange={setIsNextDisabled} />
        </div>
      )}
      {currentStep === 1 && isResolved && showTutorial && (
        <EmotionTutorialOverlay onDismiss={dismissTutorial} />
      )}
      {!(currentStep === 4 && isDirectInputActive) && currentStep !== 3 && (
        <SafeAreaBottom className={isNextDisabled || isLoading ? "bg-gray-100" : "bg-gray-700"}>
          <NewButton
            label="다음"
            disabled={isNextDisabled || isLoading}
            onClick={handleNextWithKeyboard}
          />
        </SafeAreaBottom>
      )}
      {currentStep === 3 && (
        <SafeAreaBottom
          className={`fixed inset-x-0 bottom-0 z-10 md:left-1/2 md:right-auto md:w-93.75 md:-translate-x-1/2 ${isNextDisabled || isLoading ? "bg-gray-100" : "bg-gray-700"}`}
        >
          <NewButton
            label="다음"
            disabled={isNextDisabled || isLoading}
            onClick={handleNextWithKeyboard}
          />
        </SafeAreaBottom>
      )}
    </div>
  );
};
