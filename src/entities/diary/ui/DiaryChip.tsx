import { cn } from "@/shared/lib/utils";
import type { EmotionIntensity } from "../model/diary.types";

const getChipClasses = (variant: EmotionIntensity | "default") => {
  if (variant === "HIGH") return "bg-key-secondary-0 text-key-secondary-100";
  if (variant === "MID") return "bg-key-primary-0 text-key-primary-100";
  if (variant === "LOW") return "bg-key-secondary-0 text-key-secondary";
  return "bg-gray-0 text-gray-600";
};

interface DiaryChipProps {
  label: string;
  variant?: EmotionIntensity | "default";
  className?: string;
}

export const DiaryChip = ({ label, variant = "default", className }: DiaryChipProps) => (
  <div
    className={cn(
      "flex shrink-0 items-center justify-center rounded-[4px] px-2 py-1.5",
      getChipClasses(variant),
      className,
    )}
  >
    <span className="caption1 whitespace-nowrap text-center">{label}</span>
  </div>
);
