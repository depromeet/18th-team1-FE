import { cn } from "@/shared/lib/utils";

const CHIP_VARIANTS = {
  default: "bg-gray-0 text-gray-600",
  high: "bg-key-secondary-0 text-key-secondary-100",
  mid: "bg-key-primary-0 text-key-primary-100",
  low: "bg-key-secondary2-0 text-key-secondary2",
} as const;

type ChipVariant = keyof typeof CHIP_VARIANTS;

interface DiaryChipProps {
  label: string;
  variant?: ChipVariant;
  className?: string;
}

export const DiaryChip = ({
  label,
  variant = "default",
  className,
}: DiaryChipProps): React.ReactElement => (
  <div
    className={cn(
      "flex shrink-0 items-center justify-center rounded-[4px] px-2 py-1.5",
      CHIP_VARIANTS[variant],
      className,
    )}
  >
    <span className="caption1 whitespace-nowrap text-center">{label}</span>
  </div>
);
