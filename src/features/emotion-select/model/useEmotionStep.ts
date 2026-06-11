"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useEmotionSelectStore } from "@/store/emotion-select/useEmotionSelectStore";

const TOTAL_STEPS = 4;

interface UseEmotionStepReturn {
  currentStep: number;
  totalSteps: number;
  handleBack: () => void;
  handleNext: () => void;
  handleSkip: () => void;
}

export const useEmotionStep = (): UseEmotionStepReturn => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawStep = Number(searchParams.get("step"));
  const currentStep = Number.isNaN(rawStep) || rawStep < 1 || rawStep > TOTAL_STEPS ? 1 : rawStep;

  const { reset } = useEmotionSelectStore();

  const handleBack = (): void => {
    if (currentStep > 1) {
      router.push(`/emotion?step=${currentStep - 1}`);
    } else {
      reset();
      router.push("/");
    }
  };

  const handleNext = (): void => {
    if (currentStep < TOTAL_STEPS) {
      router.push(`/emotion?step=${currentStep + 1}`);
      return;
    }
    router.push("/sentence");
  };

  const handleSkip = (): void => {
    router.push(`/emotion?step=${TOTAL_STEPS}`);
  };

  return {
    currentStep,
    totalSteps: TOTAL_STEPS,
    handleBack,
    handleNext,
    handleSkip,
  };
};
