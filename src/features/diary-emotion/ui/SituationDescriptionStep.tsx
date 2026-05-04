import { useEffect, useRef } from "react";

import { MOCK_SITUATIONS } from "@/mock";

import { useDiaryEmotionStore } from "../model/useDiaryEmotionStore";
import { TagChip } from "./TagChip";

interface SituationDescriptionStepProps {
  onValidChange: (isNextDisabled: boolean) => void;
}

export const SituationDescriptionStep = ({
  onValidChange,
}: SituationDescriptionStepProps): React.ReactElement => {
  const { selectedSituationIds, situationDescription, setSituationDescription } =
    useDiaryEmotionStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const selectedChips = MOCK_SITUATIONS.filter((s) => selectedSituationIds.includes(s.id));

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  useEffect(() => {
    onValidChange(situationDescription.trim() === "");
  }, [situationDescription, onValidChange]);

  return (
    <div className="flex flex-col pt-8.5">
      <div className="flex flex-wrap gap-x-2.5 gap-y-3.5">
        {selectedChips.map((chip) => (
          <TagChip key={chip.id} label={chip.label} isSelected />
        ))}
      </div>
      <textarea
        ref={textareaRef}
        className="head1 mt-14 w-full resize-none bg-transparent text-foreground outline-none placeholder:text-[rgba(9,9,9,0.2)]"
        placeholder={"왜 이런 감정을\n느끼셨나요?"}
        rows={5}
        value={situationDescription}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void =>
          setSituationDescription(e.target.value)
        }
      />
    </div>
  );
};
