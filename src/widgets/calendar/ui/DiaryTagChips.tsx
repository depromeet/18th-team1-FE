import { cn } from "@/shared/lib/utils";

const MAX_VISIBLE_TAGS = 2;

const getChipStyle = (emotionValue: number) => {
  if (emotionValue >= 7) return "bg-key-secondary-0 text-key-secondary";
  if (emotionValue >= 4) return "bg-key-point-0 text-key-point-100";
  return "bg-key-primary-0 text-key-primary-100";
};

interface DiaryTagChipsProps {
  tags: string[];
  emotionValue: number;
  className?: string;
}

export const DiaryTagChips = ({
  tags,
  emotionValue,
  className,
}: DiaryTagChipsProps): React.ReactElement => {
  const chipStyle = getChipStyle(emotionValue);
  const visibleTags = tags.slice(0, MAX_VISIBLE_TAGS);
  const hiddenCount = tags.length - visibleTags.length;

  return (
    <div className={cn("flex gap-1 items-center flex-wrap", className)}>
      {visibleTags.map((tag) => (
        <span key={tag} className={cn("caption2 px-2 py-1 rounded-full shrink-0", chipStyle)}>
          {tag}
        </span>
      ))}
      {hiddenCount > 0 && (
        <span
          className={cn(
            "caption2 flex items-center justify-center size-6.5 rounded-full shrink-0",
            chipStyle,
          )}
        >
          +{hiddenCount}
        </span>
      )}
    </div>
  );
};
