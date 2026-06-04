"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useToneTagsQuery } from "@/entities/emotion-tag";
import { Text } from "@/shared/ui/text";
import { useDiaryEmotionStore } from "@/store/diary-emotion/useDiaryEmotionStore";
import { TagList } from "./TagList";

interface SentenceTypeStepProps {
  onValidChange: (isNextDisabled: boolean) => void;
}

export const SentenceTypeStep = ({ onValidChange }: SentenceTypeStepProps) => {
  const router = useRouter();
  const { selectedSentenceTypeIds, setSelectedSentenceTypeIds } = useDiaryEmotionStore();
  const { data, isError } = useToneTagsQuery();
  const tags = data?.tags.map((tag) => ({ id: String(tag.id), label: tag.label })) ?? [];

  useEffect(() => {
    if (isError) router.replace("/");
  }, [isError, router]);

  useEffect(() => {
    onValidChange(selectedSentenceTypeIds.length === 0);
  }, [selectedSentenceTypeIds, onValidChange]);

  return (
    <div className="flex flex-col gap-6.5 pt-1">
      <Text variant="subhead1" className="pt-3.75">
        오늘 어떤 문장이 필요하세요?
      </Text>
      <TagList
        items={tags}
        selectedIds={selectedSentenceTypeIds}
        onSelectionChange={setSelectedSentenceTypeIds}
      />
    </div>
  );
};
