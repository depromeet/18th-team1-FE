"use client";

import { useEffect } from "react";

import { useEmotionTagsQuery } from "@/entities/emotion-tag";
import { MOCK_SITUATIONS } from "@/mock";
import { Text } from "@/shared/ui/text";
import { useDiaryEmotionStore } from "@/store/diary-emotion/useDiaryEmotionStore";
import { getEmotionValue } from "../model/emotion";
import { TagList } from "./TagList";

interface SituationStepProps {
  onValidChange: (isNextDisabled: boolean) => void;
}

export const SituationStep = ({ onValidChange }: SituationStepProps): React.ReactElement => {
  const { selectedEmotionId, selectedSituationIds, setSelectedSituationIds } =
    useDiaryEmotionStore();
  const { data, isError } = useEmotionTagsQuery(getEmotionValue(selectedEmotionId));
  const sourceTags = isError ? MOCK_SITUATIONS : (data?.tags ?? []);
  const tags = sourceTags.map((tag) => ({ id: String(tag.id), label: tag.label }));

  useEffect(() => {
    onValidChange(selectedSituationIds.length === 0);
  }, [selectedSituationIds, onValidChange]);

  return (
    <div className="flex flex-col gap-6.5 pt-1">
      <Text variant="subhead1" className="pt-3.75">
        지금 어떤 상황이신가요?
      </Text>
      <TagList
        items={tags}
        selectedIds={selectedSituationIds}
        onSelectionChange={setSelectedSituationIds}
      />
    </div>
  );
};
