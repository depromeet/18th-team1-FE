import { useEffect } from "react";

import { TagChip, type TagChipVariant } from "@/entities/emotion-tag";
import { useToast } from "@/shared/hooks/useToast";

import type { EmotionCategory } from "../model/emotion";

const MAX_SELECTION = 5;

export interface TagItem {
  id: string;
  label: string;
  groupId?: number;
  groupName?: string;
}

interface TagListProps {
  items: TagItem[];
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  onValidChange?: (isNextDisabled: boolean) => void;
  emotionCategory?: EmotionCategory;
}

const CATEGORY_TO_VARIANT: Record<EmotionCategory, TagChipVariant> = {
  bad: "bad",
  neutral: "neutral",
  good: "good",
};

export const TagList = ({
  items,
  selectedIds,
  onSelectionChange,
  onValidChange,
  emotionCategory,
}: TagListProps): React.ReactElement => {
  const { toast } = useToast();
  const selectedVariant: TagChipVariant = emotionCategory
    ? CATEGORY_TO_VARIANT[emotionCategory]
    : "neutral";

  useEffect(() => {
    onValidChange?.(selectedIds.length === 0);
  }, [selectedIds, onValidChange]);

  const handleSelect = (id: string): void => {
    if (selectedIds.length >= MAX_SELECTION) {
      toast("최대 5개까지 선택 가능해요", { position: "bottom" });
      return;
    }
    onSelectionChange([...selectedIds, id]);
  };

  const handleRemove = (id: string): void => {
    onSelectionChange(selectedIds.filter((s) => s !== id));
  };

  const renderChip = (item: TagItem): React.ReactElement => {
    const isSelected = selectedIds.includes(item.id);
    return isSelected ? (
      <TagChip
        key={item.id}
        label={item.label}
        variant={selectedVariant}
        onRemove={() => handleRemove(item.id)}
      />
    ) : (
      <TagChip
        key={item.id}
        label={item.label}
        variant="default"
        onClick={() => handleSelect(item.id)}
      />
    );
  };

  const isGrouped = items.some((item) => item.groupId !== undefined);

  if (!isGrouped) {
    return <div className="flex flex-wrap gap-x-2 gap-y-3">{items.map(renderChip)}</div>;
  }

  const groupOrder: number[] = [];
  const groupMap = new Map<number, { name?: string; items: TagItem[] }>();

  for (const item of items) {
    const key = item.groupId ?? 0;
    if (!groupMap.has(key)) {
      groupOrder.push(key);
      groupMap.set(key, { name: item.groupName, items: [] });
    }
    groupMap.get(key)?.items.push(item);
  }

  return (
    <div className="flex flex-col gap-8">
      {groupOrder.map((groupId) => {
        const group = groupMap.get(groupId);
        if (!group) return null;
        return (
          <div key={groupId} className="flex flex-col gap-3">
            {group.name && <p className="body2 text-gray-400">{group.name}</p>}
            <div className="flex flex-wrap gap-2">{group.items.map(renderChip)}</div>
          </div>
        );
      })}
    </div>
  );
};
