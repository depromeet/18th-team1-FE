import { cn } from "@/shared/lib/utils";
import { getChipStyle } from "../lib/getChipStyle";
import { DiaryTagChip } from "./DiaryTagChip";

const MAX_VISIBLE_TAGS = 2;

interface DiaryTagSectionProps {
  tags: string[];
  emotionValue: number;
  className?: string;
}

export const DiaryTagSection = ({ tags, emotionValue, className }: DiaryTagSectionProps) => {
  const visibleTags = tags.slice(0, MAX_VISIBLE_TAGS);
  const hiddenCount = tags.length - visibleTags.length;

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {visibleTags.map((tag) => (
        <DiaryTagChip key={tag} label={tag} emotionValue={emotionValue} className="caption2" />
      ))}
      {hiddenCount > 0 && (
        <span
          className={cn(
            "caption2 flex size-6.5 shrink-0 items-center justify-center rounded-full",
            getChipStyle(emotionValue),
          )}
        >
          +{hiddenCount}
        </span>
      )}
    </div>
  );
};
