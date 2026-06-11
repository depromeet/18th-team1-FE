"use client";

import { useEmotionTagsQuery } from "@/entities/emotion-tag";
import { Text } from "@/shared/ui/text";
import { useEmotionSelectStore } from "@/store/emotion-select/useEmotionSelectStore";
import type { EmotionCategory } from "../model/emotion";
import { EMOTIONS, getEmotionValue } from "../model/emotion";
import { TagList } from "./TagList";

// TODO: API에서 그룹명(emotionRangeName)을 내려줄 때 이 상수 제거 후 API 응답값 사용
const GROUP_NAMES: Record<EmotionCategory, string[]> = {
  bad: ["무기력과 우울", "불안과 위축", "분노와 상처"],
  neutral: ["평온과 여유", "사색과 고립", "무감각과 모호함"],
  good: ["행복하고 충만한", "열정과 활기", "안도와 평화"],
};

interface SituationStepProps {
  onValidChange: (isNextDisabled: boolean) => void;
}

export const SituationStep = ({ onValidChange }: SituationStepProps) => {
  const { selectedEmotionId, selectedSituationIds, setSelectedSituationIds } =
    useEmotionSelectStore();
  const emotionCategory = EMOTIONS.find((e) => e.id === selectedEmotionId)?.category;
  const { data } = useEmotionTagsQuery(getEmotionValue(selectedEmotionId));

  // TODO: API에서 emotionRangeName을 내려주면 tag.emotionRangeName으로 대체 후 이 로직 제거
  const groupNames = emotionCategory ? GROUP_NAMES[emotionCategory] : [];
  const rawTags = data?.tags ?? [];
  const chunkSize = Math.ceil(rawTags.length / 3);

  const tags = rawTags.map((tag, index) => ({
    id: String(tag.id),
    label: tag.label,
    groupId: Math.floor(index / chunkSize),
    groupName: groupNames[Math.floor(index / chunkSize)],
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
