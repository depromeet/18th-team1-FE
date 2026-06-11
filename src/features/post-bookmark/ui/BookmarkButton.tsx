import { IcBookmark } from "@/shared/ui/icons";

interface BookmarkButtonProps {
  isBookmarked: boolean;
  onToggle: () => void;
  size?: "small" | "medium";
  variant?: "default" | "line";
}

const SIZE_MAP = {
  small: { iconSize: 24, buttonClass: "w-6 h-6" },
  medium: { iconSize: 34, buttonClass: "w-[34px] h-[34px]" },
} as const;

export const BookmarkButton = ({
  isBookmarked,
  onToggle,
  size = "small",
  variant = "default",
}: BookmarkButtonProps): React.ReactElement => {
  const { iconSize, buttonClass } = SIZE_MAP[size];

  const iconVariant = variant === "line" && !isBookmarked ? "line" : "default";
  const iconClass =
    variant === "line"
      ? isBookmarked
        ? "text-key-primary"
        : "text-gray-100"
      : isBookmarked
        ? "text-gray-600"
        : "text-gray-200";

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      aria-label={isBookmarked ? "북마크 해제" : "북마크"}
      className={`flex shrink-0 items-center justify-center ${buttonClass}${variant === "line" ? " rounded-full overflow-hidden" : ""}`}
    >
      <IcBookmark size={iconSize} variant={iconVariant} className={iconClass} />
    </button>
  );
};
