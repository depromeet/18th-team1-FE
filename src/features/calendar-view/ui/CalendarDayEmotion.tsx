import type { EmotionIntensity } from "@/entities/diary";
import { cn } from "@/shared/lib/utils";

const getIntensityColor = (intensity: EmotionIntensity): string => {
  if (intensity === "HIGH") return "bg-key-primary";
  if (intensity === "MID") return "bg-key-point";
  return "bg-key-secondary";
};

const getUniqueIntensities = (intensities: EmotionIntensity[]): EmotionIntensity[] => {
  const unique = [...new Set(intensities)];

  if (unique.length === 3) {
    return ["MID", "HIGH", "LOW"];
  }

  const order: EmotionIntensity[] = ["MID", "LOW", "HIGH"];
  return order.filter((intensity) => unique.includes(intensity));
};

interface CalendarDayEmotionProps {
  intensities: EmotionIntensity[];
}

export const CalendarDayEmotion = ({ intensities }: CalendarDayEmotionProps) => {
  const unique = getUniqueIntensities(intensities);

  return (
    <div className="size-11 overflow-hidden rounded-lg flex flex-col">
      {unique.map((intensity) => (
        <div key={intensity} className={cn("flex-1", getIntensityColor(intensity))} />
      ))}
    </div>
  );
};
