import { getDate } from "date-fns";
import Image from "next/image";
import type { EmotionIntensity } from "@/entities/diary";
import { useImageDominantColor } from "@/shared/hooks/useImageDominantColor";
import { cn } from "@/shared/lib/utils";
import { IcPlus } from "@/shared/ui/icons";
import { CalendarDayEmotion } from "./CalendarDayEmotion";

interface CalendarDayProps {
  isCoverView: boolean;
  coverUrls?: string[];
  hasDiary: boolean;
  intensities?: EmotionIntensity[];
  isTodayDate: boolean;
  isFutureDate: boolean;
  date: Date;
}

export const CalendarDay = ({
  isCoverView,
  coverUrls,
  hasDiary,
  intensities,
  isTodayDate,
  isFutureDate,
  date,
}: CalendarDayProps) => {
  const { isDark: isMainCoverDark } = useImageDominantColor(
    isCoverView ? coverUrls?.[0] : undefined,
    "top",
  );

  if (isCoverView && coverUrls && coverUrls.length > 0) {
    const [mainCover, subCover] = coverUrls as [string, string | undefined];

    return (
      <div className="relative w-11.5 h-19.25">
        {subCover && (
          <div className="absolute overflow-hidden rounded-[4px] w-10 h-16 top-0 left-0.75 z-0">
            <Image src={subCover} alt="책 표지" fill sizes="40px" className="object-cover" />
          </div>
        )}
        <div className="absolute overflow-hidden rounded-[4px] w-11.5 h-18 bottom-0 left-0 z-10">
          <Image
            src={mainCover}
            alt="책 표지"
            fill
            sizes="46px"
            className="object-cover"
            priority
          />
        </div>
        {coverUrls.length > 1 && (
          <span
            className={cn(
              "absolute right-0.75 top-2.5 z-20 backdrop-blur-[4.7px] point4 text-gray-0 w-4.25 h-4.25 rounded-full flex items-center justify-center",
              isMainCoverDark ? "bg-gray-0-20" : "bg-gray-500-50",
            )}
          >
            {coverUrls.length}
          </span>
        )}
      </div>
    );
  }

  if (hasDiary && intensities) {
    return <CalendarDayEmotion intensities={intensities} />;
  }

  if (isTodayDate) {
    return (
      <div className="size-11 rounded-lg border-2 border-dashed border-key-secondary flex items-center justify-center">
        <IcPlus size={7} className="text-key-secondary" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "size-11 rounded-lg flex items-center justify-center",
        !isFutureDate && "bg-gray-50",
      )}
    >
      <span className={cn("body3", isFutureDate ? "text-gray-100" : "text-gray-400")}>
        {getDate(date)}
      </span>
    </div>
  );
};
