"use client";

import { useEffect } from "react";

import { useEmotionTagsQuery } from "@/entities/emotion-tag";
import { Text } from "@/shared/ui/text";
import { useEmotionSelectStore } from "@/store/emotion-select/useEmotionSelectStore";
import { EMOTIONS, getEmotionValue } from "../model/emotion";
import { TagList } from "./TagList";

interface SituationStepProps {
  onValidChange: (isNextDisabled: boolean) => void;
}

export const SituationStep = ({ onValidChange }: SituationStepProps) => {
  const {
    selectedEmotionId,
    selectedSituationIds,
    setSelectedSituationIds,
    setSelectedEmotionRangeId,
  } = useEmotionSelectStore();
  const emotionCategory = EMOTIONS.find((e) => e.id === selectedEmotionId)?.category;
  const { data } = useEmotionTagsQuery(getEmotionValue(selectedEmotionId));

  const rawTags = data?.tags ?? [];

  useEffect(() => {
    if (rawTags.length > 0) {
      setSelectedEmotionRangeId(rawTags[0]?.emotionRangeId ?? null);
    }
  }, [rawTags, setSelectedEmotionRangeId]);

  const visibleTags = rawTags.filter(
    (t): t is typeof t & { displayGroup: string } => t.displayGroup !== null,
  );
  const orderedGroups = [...new Set(visibleTags.map((t) => t.displayGroup))];
  const tags = visibleTags.map((tag) => ({
    id: String(tag.id),
    label: tag.label,
    groupId: orderedGroups.indexOf(tag.displayGroup),
    groupName: tag.displayGroup,
  }));

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col items-center gap-1 text-center">
        <Text variant="head1" color="gray-700">
          오늘은 어떤 하루였나요?
        </Text>
        <Text variant="body1" color="gray-300">
          최대 5개까지 선택할 수 있어요
        </Text>
      </div>
      <TagList
        items={tags}
        selectedIds={selectedSituationIds}
        onSelectionChange={setSelectedSituationIds}
        onValidChange={onValidChange}
        emotionCategory={emotionCategory}
      />
    </div>
  );
};
