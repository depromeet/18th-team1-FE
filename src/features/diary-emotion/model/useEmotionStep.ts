"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useDiaryEmotionStore } from "@/store/diary-emotion/useDiaryEmotionStore";

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

  const { reset } = useDiaryEmotionStore();

  const handleBack = (): void => {
    if (currentStep > 1) {
      router.push(`/diary/emotion?step=${currentStep - 1}`);
    } else {
      reset();
      router.push("/");
    }
  };

  const handleNext = (): void => {
    if (currentStep < TOTAL_STEPS) {
      router.push(`/diary/emotion?step=${currentStep + 1}`);
      return;
    }
    router.push("/diary/sentence");
  };

  const handleSkip = (): void => {
    router.push(`/diary/emotion?step=${TOTAL_STEPS}`);
  };

  return {
    currentStep,
    totalSteps: TOTAL_STEPS,
    handleBack,
    handleNext,
    handleSkip,
  };
};
