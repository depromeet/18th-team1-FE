"use client";

import { useRef, useState } from "react";

import { useViewportHeight } from "@/shared/hooks/useViewportHeight";
import { Button } from "@/shared/ui/button";
import { DoubleButton } from "@/shared/ui/double-button";
import { Header } from "@/widgets/header";

import { useEmotionStep } from "../model/useEmotionStep";
import { EmotionBookStep } from "./EmotionBookStep";
import { LoadingView } from "./LoadingView";
import { SentenceTypeStep } from "./SentenceTypeStep";
import { SituationDescriptionStep } from "./SituationDescriptionStep";
import { SituationStep } from "./SituationStep";

export const EmotionStepView = (): React.ReactElement => {
  useViewportHeight();
  const { currentStep, totalSteps, isLoading, handleBack, handleNext, handleSkip } =
    useEmotionStep();
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const hiddenTextareaRef = useRef<HTMLTextAreaElement>(null);

  const handleNextWithKeyboard = (): void => {
    if (currentStep === 2) {
      hiddenTextareaRef.current?.focus();
    }
    handleNext();
  };

  if (isLoading) return <LoadingView />;

  return (
    <div
      className="fixed inset-x-0 top-0 flex flex-col gap-1 bg-gray0 md:left-1/2 md:right-auto md:w-93.75 md:-translate-x-1/2"
      style={{ height: "var(--vh, 100dvh)" }}
    >
      <textarea
        ref={hiddenTextareaRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 h-4 w-4 opacity-0"
        tabIndex={-1}
      />
      <Header onBack={handleBack} />
      {currentStep === 1 ? (
        <div className="flex min-h-0 flex-1 flex-col px-5 pb-28">
          <EmotionBookStep onValidChange={setIsNextDisabled} />
        </div>
      ) : (
        <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-28">
          {currentStep === 2 && <SituationStep onValidChange={setIsNextDisabled} />}
          {currentStep === 3 && <SituationDescriptionStep onValidChange={setIsNextDisabled} />}
          {currentStep === 4 && <SentenceTypeStep onValidChange={setIsNextDisabled} />}
        </div>
      )}
      <div
        className="absolute bottom-0 left-0 right-0 px-5"
        style={{
          paddingBottom: "max(env(safe-area-inset-bottom), 14px)",
          transform: "translateZ(0)",
        }}
      >
        {currentStep === 3 ? (
          <DoubleButton
            secondaryLabel="건너뛰기"
            primaryLabel="다음"
            isPrimaryDisabled={isNextDisabled}
            onSecondaryClick={handleSkip}
            onPrimaryClick={handleNext}
          />
        ) : (
          <Button
            label={currentStep === totalSteps ? "오늘의 문장 추천 받기" : "다음"}
            isDisabled={isNextDisabled}
            onClick={handleNextWithKeyboard}
          />
        )}
      </div>
    </div>
  );
};
