import { useEffect } from "react";

import { MOCK_SENTENCE_TYPES } from "@/mock";
import { Text } from "@/shared/ui/text";

import { useDiaryEmotionStore } from "../model/useDiaryEmotionStore";
import { TagList } from "./TagList";

interface SentenceTypeStepProps {
  onValidChange: (isNextDisabled: boolean) => void;
}

export const SentenceTypeStep = ({ onValidChange }: SentenceTypeStepProps): React.ReactElement => {
  const { selectedSentenceTypeIds, setSelectedSentenceTypeIds } = useDiaryEmotionStore();

  useEffect(() => {
    onValidChange(selectedSentenceTypeIds.length === 0);
  }, [selectedSentenceTypeIds, onValidChange]);

  return (
    <div className="flex flex-col gap-6.5 pt-1">
      <Text variant="subhead1" className="pt-3.75">
        오늘 어떤 문장이 필요하세요?
      </Text>
      <TagList
        items={MOCK_SENTENCE_TYPES}
        selectedIds={selectedSentenceTypeIds}
        onSelectionChange={setSelectedSentenceTypeIds}
      />
    </div>
  );
};
