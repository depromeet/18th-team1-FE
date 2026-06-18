"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useNeedTagsQuery } from "@/entities/emotion-tag";
import { sentenceKeys, startRecommendation } from "@/entities/sentence";
import { getEmotionValue } from "@/features/emotion-select/model/emotion";
import { IcPen } from "@/shared/ui/icons";
import { Text } from "@/shared/ui/text";
import { useEmotionSelectStore } from "@/store/emotion-select/useEmotionSelectStore";

import { DirectInputBar } from "./DirectInputBar";
import { SentenceTypeChip } from "./SentenceTypeChip";

interface SentenceTypeStepProps {
  onValidChange: (isNextDisabled: boolean) => void;
  onDirectInputActiveChange?: (isActive: boolean) => void;
  onLoadingChange?: (isLoading: boolean) => void;
}

export const SentenceTypeStep = ({
  onValidChange,
  onDirectInputActiveChange,
  onLoadingChange,
}: SentenceTypeStepProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    selectedEmotionId,
    selectedSituationIds,
    selectedNeedTagId,
    situationDescription,
    setSelectedNeedTagId,
    setDirectSentenceInput,
    setCurrentRecommendationId,
    setInitialRecommendedQuote,
  } = useEmotionSelectStore();
  const [isDirectInputActive, setIsDirectInputActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data } = useNeedTagsQuery();
  const needTags = data?.tags ?? [];

  const handleTagSelect = (id: number): void => {
    const newId = selectedNeedTagId === id ? null : id;
    setSelectedNeedTagId(newId);
    setIsDirectInputActive(false);
    onDirectInputActiveChange?.(false);
    onValidChange(newId === null);
  };

  const handleDirectInputActivate = (): void => {
    setIsDirectInputActive(true);
    onDirectInputActiveChange?.(true);
    setSelectedNeedTagId(null);
    onValidChange(true);
  };

  const handleDirectInputDeactivate = (): void => {
    setIsDirectInputActive(false);
    onDirectInputActiveChange?.(false);
    onValidChange(true);
  };

  const handleDirectInputSubmit = async (value: string): Promise<void> => {
    if (isSubmitting) return;
    setDirectSentenceInput(value);
    setIsSubmitting(true);
    onLoadingChange?.(true);
    try {
      const result = await startRecommendation({
        emotionValue: getEmotionValue(selectedEmotionId),
        emotionTagIds: selectedSituationIds.map(Number),
        needTagId: null,
        feelingText: value,
        diaryText: situationDescription || null,
      });
      setCurrentRecommendationId(result.recommendationId);
      setInitialRecommendedQuote(result.quote);
      queryClient.invalidateQueries({ queryKey: sentenceKeys.todayStatus() });
      router.push("/sentence");
    } catch {
      setIsSubmitting(false);
      onLoadingChange?.(false);
    }
  };

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      {/* 헤더 + 스크롤 영역 */}
      <div className="relative flex min-h-0 flex-1 flex-col">
        <div className="flex shrink-0 flex-col gap-1 px-5 text-center">
          <Text variant="head1" color="gray-700">
            오늘 어떤 문장이 필요하세요?
          </Text>
          <Text variant="body1" color="gray-300">
            선택한 종류에 따라 추천받을 문장이 달라져요
          </Text>
        </div>

        <div className="relative flex min-h-0 flex-1 flex-col pt-19.25">
          <div className="min-h-0 flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex flex-col items-center gap-4 pb-26">
              {needTags.map((tag) => (
                <SentenceTypeChip
                  key={tag.id}
                  label={tag.label}
                  isSelected={selectedNeedTagId === tag.id}
                  onClick={() => handleTagSelect(tag.id)}
                />
              ))}
            </div>
          </div>
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-46"
            style={{ background: "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFF 80%)" }}
          />
        </div>

        {isDirectInputActive && (
          <button
            type="button"
            aria-label="직접 입력 닫기"
            className="absolute inset-0 bg-white/90"
            onClick={handleDirectInputDeactivate}
          />
        )}
      </div>

      {isDirectInputActive && (
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-34.5"
          style={{
            background: "linear-gradient(178deg, rgba(255, 255, 255, 0.00) 1.56%, #EAEBEB 113.45%)",
          }}
        />
      )}

      {/* 직접 작성 영역 — 고정 100px */}
      {isDirectInputActive ? (
        <div className="relative flex h-25 shrink-0 items-center px-5">
          <DirectInputBar
            onValidChange={onValidChange}
            onSubmit={handleDirectInputSubmit}
            isLoading={isSubmitting}
          />
        </div>
      ) : (
        <div className="flex h-25 shrink-0 items-center justify-center bg-white">
          <button
            type="button"
            onClick={handleDirectInputActivate}
            className="flex h-10.25 w-44.5 items-center justify-center gap-1 border-b border-gray-200 px-3.5 py-2.5"
          >
            <Text as="span" variant="body1" color="gray-300">
              직접 작성할게요
            </Text>
            <IcPen
              size={18}
              className="-translate-y-px -scale-y-100 aspect-square shrink-0 text-gray-300"
            />
          </button>
        </div>
      )}
    </div>
  );
};
