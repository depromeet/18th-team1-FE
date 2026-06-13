import { cn } from "@/shared/lib/utils";
import { getChipStyle } from "../lib/getChipStyle";

interface DiaryTagChipProps {
  label: string;
  emotionValue: number;
  className?: string;
}

export const DiaryTagChip = ({ label, emotionValue, className }: DiaryTagChipProps) => (
  <span
    className={cn(
      "body3 shrink-0 whitespace-nowrap rounded-full px-2 py-1",
      getChipStyle(emotionValue),
      className,
    )}
  >
    {label}
  </span>
);
