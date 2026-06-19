import { useEffect } from "react";

import { TagChip, useEmotionTagsQuery } from "@/entities/emotion-tag";
import { IcPlusCount } from "@/shared/ui/icons";
import { Text } from "@/shared/ui/text";
import { useEmotionSelectStore } from "@/store/emotion-select/useEmotionSelectStore";

import { getEmotionValue } from "../model/emotion";
import { useCharLimit } from "../model/useCharLimit";

interface SituationDescriptionStepProps {
  onValidChange: (isNextDisabled: boolean) => void;
}

const MAX_VISIBLE_CHIPS = 2;

export const SituationDescriptionStep = ({ onValidChange }: SituationDescriptionStepProps) => {
  const { selectedEmotionId, selectedSituationIds, situationDescription, setSituationDescription } =
    useEmotionSelectStore();

  const { data } = useEmotionTagsQuery(getEmotionValue(selectedEmotionId));
  const selectedChips = (data?.tags ?? []).filter((tag) =>
    selectedSituationIds.includes(String(tag.id)),
  );

  const visibleChips = selectedChips.slice(0, MAX_VISIBLE_CHIPS);
  const overflowCount = selectedChips.length - MAX_VISIBLE_CHIPS;

  useEffect(() => {
    onValidChange(false);
  }, [onValidChange]);

  const { handleChange, handlePaste } = useCharLimit<HTMLTextAreaElement>(
    300,
    setSituationDescription,
    "최대 300자까지 작성 가능해요",
  );

  return (
    <div className="flex flex-1 flex-col gap-10 min-h-0">
      <Text as="h2" variant="head1" color="gray-700" className="shrink-0 text-center">
        왜 이런 감정을 느끼셨나요?
      </Text>
      <div className="flex flex-1 flex-col gap-4 min-h-0">
        <div className="flex flex-1 flex-col rounded-[20px] bg-muted p-5 min-h-0 max-h-[386px]">
          <textarea
            // biome-ignore lint/a11y/noAutofocus: 감정 입력 스텝에서 즉시 입력 유도를 위해 의도적으로 사용
            autoFocus
            className="body1 min-h-20 flex-1 w-full resize-none bg-transparent text-foreground outline-none placeholder:text-gray-300"
            placeholder={"구체적으로 작성할수록\n딱 맞는 문장을 추천 받을 수 있어요"}
            value={situationDescription}
            onChange={handleChange}
            onPaste={handlePaste}
          />
          <p
            className={`body1 shrink-0 text-right ${situationDescription.length >= 300 ? "text-sub-error" : "text-gray-400"}`}
          >
            {situationDescription.length}/300
          </p>
        </div>
        <div className="shrink-0 flex flex-wrap gap-x-2 gap-y-3">
          {visibleChips.map((chip) => (
            <TagChip key={chip.id} label={chip.label} variant="label" />
          ))}
          {overflowCount > 0 && (
            <div className="flex h-10.25 min-w-10.25 shrink-0 items-center justify-center rounded-full bg-gray-400 px-2.5">
              <IcPlusCount size={14} className="shrink-0 text-gray-0" />
              <span className="point2 relative -top-px text-gray-0">{overflowCount}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
