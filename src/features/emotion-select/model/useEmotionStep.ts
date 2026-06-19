"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { sentenceKeys, startRecommendation } from "@/entities/sentence";
import { getEmotionValue } from "@/features/emotion-select/model/emotion";
import { useEmotionSelectStore } from "@/store/emotion-select/useEmotionSelectStore";

const TOTAL_STEPS = 4;

interface UseEmotionStepReturn {
  currentStep: number;
  totalSteps: number;
  isLoading: boolean;
  handleBack: () => void;
  handleNext: () => Promise<void>;
  handleSkip: () => void;
}

export const useEmotionStep = (): UseEmotionStepReturn => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const rawStep = Number(searchParams.get("step"));
  const currentStep = Number.isNaN(rawStep) || rawStep < 1 || rawStep > TOTAL_STEPS ? 1 : rawStep;

  const [isLoading, setIsLoading] = useState(false);
  const {
    reset,
    selectedEmotionId,
    selectedSituationIds,
    selectedNeedTagId,
    situationDescription,
    setCurrentRecommendationId,
    setInitialRecommendedQuote,
  } = useEmotionSelectStore();

  const handleBack = (): void => {
    if (currentStep > 1) {
      router.push(`/emotion?step=${currentStep - 1}`);
    } else {
      reset();
      router.push("/");
    }
  };

  const handleNext = async (): Promise<void> => {
    if (currentStep < TOTAL_STEPS) {
      router.push(`/emotion?step=${currentStep + 1}`);
      return;
    }

    setIsLoading(true);
    try {
      const result = await startRecommendation({
        emotionValue: getEmotionValue(selectedEmotionId),
        emotionTagIds: selectedSituationIds.map(Number),
        needTagId: selectedNeedTagId,
        feelingText: null,
        diaryText: situationDescription || null,
      });
      setCurrentRecommendationId(result.recommendationId);
      setInitialRecommendedQuote(result.quote);
      queryClient.invalidateQueries({ queryKey: sentenceKeys.todayStatus() });
      router.push("/sentence");
    } catch {
      setIsLoading(false);
    }
  };

  const handleSkip = (): void => {
    router.push(`/emotion?step=${TOTAL_STEPS}`);
  };

  return {
    currentStep,
    totalSteps: TOTAL_STEPS,
    isLoading,
    handleBack,
    handleNext,
    handleSkip,
  };
};
