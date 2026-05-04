import { useEffect } from "react";

import { MOCK_SITUATIONS } from "@/mock";
import { Text } from "@/shared/ui/text";

import { useDiaryEmotionStore } from "../model/useDiaryEmotionStore";
import { TagList } from "./TagList";

interface SituationStepProps {
  onValidChange: (isNextDisabled: boolean) => void;
}

export const SituationStep = ({ onValidChange }: SituationStepProps): React.ReactElement => {
  const { selectedSituationIds, setSelectedSituationIds } = useDiaryEmotionStore();

  useEffect(() => {
    onValidChange(selectedSituationIds.length === 0);
  }, [selectedSituationIds, onValidChange]);

  return (
    <div className="flex flex-col gap-6.5 pt-1">
      <Text variant="subhead1" className="pt-3.75">
        지금 어떤 상황이신가요?
      </Text>
      <TagList
        items={MOCK_SITUATIONS}
        selectedIds={selectedSituationIds}
        onSelectionChange={setSelectedSituationIds}
      />
    </div>
  );
};
