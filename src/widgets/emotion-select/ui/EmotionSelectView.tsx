"use client";

import { useRef, useState } from "react";

import {
  EmotionBookStep,
  SentenceTypeStep,
  SituationDescriptionStep,
  SituationStep,
  useEmotionStep,
} from "@/features/emotion-select";
import { useViewportHeight } from "@/shared/hooks/useViewportHeight";
import { NewButton } from "@/shared/ui/new-button";
import { Header } from "@/widgets/header";

export const EmotionSelectView = (): React.ReactElement => {
  useViewportHeight();
  const { currentStep, handleBack, handleNext } = useEmotionStep();
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [isDirectInputActive, setIsDirectInputActive] = useState(false);
  const hiddenTextareaRef = useRef<HTMLTextAreaElement>(null);

  const handleNextWithKeyboard = (): void => {
    if (currentStep === 2) {
      hiddenTextareaRef.current?.focus();
    }
    handleNext();
  };

  return (
    <div
      className="fixed inset-x-0 top-0 flex flex-col gap-1 md:left-1/2 md:right-auto md:w-93.75 md:-translate-x-1/2 bg-gray-0"
      style={{ height: "var(--vh, 100dvh)" }}
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
          <EmotionBookStep onValidChange={setIsNextDisabled} />
        </div>
      ) : currentStep === 4 ? (
        <SentenceTypeStep
          onValidChange={setIsNextDisabled}
          onDirectInputActiveChange={setIsDirectInputActive}
        />
      ) : (
        <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-4">
          {currentStep === 2 && <SituationStep onValidChange={setIsNextDisabled} />}
          {currentStep === 3 && <SituationDescriptionStep onValidChange={setIsNextDisabled} />}
        </div>
      )}
      {!(currentStep === 4 && isDirectInputActive) && (
        <div style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
          <NewButton label="다음" disabled={isNextDisabled} onClick={handleNextWithKeyboard} />
        </div>
      )}
    </div>
  );
};
