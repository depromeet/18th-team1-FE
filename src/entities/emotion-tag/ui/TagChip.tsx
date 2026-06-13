import { cn } from "@/shared/lib/utils";
import { IcMinusCircleFill } from "@/shared/ui/icons";

export type TagChipVariant = "default" | "bad" | "neutral" | "good" | "label" | "dim";

interface TagChipProps {
  label: string;
  variant?: TagChipVariant;
  onRemove?: () => void;
  onClick?: () => void;
}

const VARIANT_CLASS: Record<TagChipVariant, string> = {
  default: "bg-gray-50 border border-dashed border-gray-200 text-gray-500",
  bad: "bg-key-secondary text-gray-0",
  neutral: "bg-key-point text-gray-0",
  good: "bg-key-primary-100 text-gray-0",
  label: "bg-gray-600 text-gray-0",
  dim: "bg-gray-500 text-gray-0",
};

const BASE = "body3 inline-flex h-[41px] items-center gap-1 rounded-[30px] px-[14px] py-[10px]";

export const TagChip = ({
  label,
  variant = "default",
  onRemove,
  onClick,
}: TagChipProps): React.ReactElement => {
  const chipClass = cn(BASE, VARIANT_CLASS[variant]);

  if (variant === "label" || variant === "dim") {
    return <span className={chipClass}>{label}</span>;
  }

  if (variant === "default") {
    return (
      <button type="button" onClick={onClick} className={cn(chipClass, "cursor-pointer")}>
        {label}
      </button>
    );
  }

  return (
    <div className={chipClass}>
      <span>{label}</span>
      <button
        type="button"
        onClick={onRemove}
        className="flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center"
        aria-label={`${label} 선택 취소`}
      >
        <IcMinusCircleFill size={16} className="relative -top-px text-gray-0" />
      </button>
    </div>
  );
};
