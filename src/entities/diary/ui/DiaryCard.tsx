"use client";

import Image from "next/image";
import { cn } from "@/shared/lib/utils";
import { IcOption, IcWrite } from "@/shared/ui/icons";
import type { OptionMenuItem } from "@/shared/ui/option-menu";
import { OptionMenu } from "@/shared/ui/option-menu";
import type { EmotionIntensity } from "../model/diary.types";

export interface DiaryCardProps {
  variant?: "summary" | "detail";
  quoteContent: string;
  title: string;
  author: string;
  emotions: string[];
  emotionIntensity?: EmotionIntensity;
  content?: string | null;
  coverImageUrl: string;
  diaryImageUrl?: string | null;
  menuItems?: OptionMenuItem[];
  className?: string;
}

const getIntensityChipStyle = (intensity: EmotionIntensity): { bg: string; text: string } => {
  if (intensity === "HIGH") return { bg: "bg-secondary0", text: "text-secondary100" };
  if (intensity === "MID") return { bg: "bg-primary0", text: "text-primary100" };
  return { bg: "bg-secondary2_0", text: "text-secondary2" };
};

const Chip = ({
  label,
  variant,
  emotionIntensity,
}: {
  label: string;
  variant: "summary" | "detail";
  emotionIntensity?: EmotionIntensity;
}): React.ReactElement => {
  const chipStyle =
    variant === "detail" && emotionIntensity ? getIntensityChipStyle(emotionIntensity) : null;

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded px-2 py-1.5",
        chipStyle ? chipStyle.bg : "bg-gray-0",
      )}
    >
      <span
        className={cn(
          "caption1 whitespace-nowrap text-center",
          chipStyle ? chipStyle.text : "text-gray-600",
        )}
      >
        {label}
      </span>
    </div>
  );
};

const BookImage = ({
  coverImageUrl,
  title,
  variant,
}: {
  coverImageUrl?: string;
  title: string;
  variant: "summary" | "detail";
}): React.ReactElement => (
  <div
    className={cn(
      "relative shrink-0 overflow-hidden rounded-[4px]",
      variant === "summary" ? "h-12.75 w-9" : "h-21.5 w-15",
    )}
  >
    {coverImageUrl && <Image alt={title} src={coverImageUrl} fill className="object-cover" />}
  </div>
);

const BookInfo = ({
  quoteContent,
  title,
  author,
  variant,
}: {
  quoteContent: string;
  title: string;
  author: string;
  variant: "summary" | "detail";
}): React.ReactElement => (
  <div className="flex flex-col gap-1.5">
    <p
      className={cn(
        "w-full text-gray-700",
        variant === "summary" ? "subhead6 line-clamp-3" : "text-title2",
      )}
    >
      {quoteContent}
    </p>
    <div
      className={cn(
        "flex items-center gap-0.5",
        variant === "detail" ? "text-gray-500" : "text-gray-600",
      )}
    >
      <span className="caption2 whitespace-nowrap">{title}</span>
      <span className="caption2">･</span>
      <span className="caption2 truncate">{author}</span>
    </div>
  </div>
);

export const DiaryCard = ({
  variant = "summary",
  quoteContent,
  title,
  author,
  emotions,
  emotionIntensity,
  content,
  coverImageUrl,
  diaryImageUrl,
  menuItems = [],
  className,
}: DiaryCardProps): React.ReactElement => {
  const hasPhoto = diaryImageUrl != null;
  const hasContent = content != null;

  return (
    <div
      className={cn("relative flex w-full flex-col gap-4 rounded-2xl bg-gray-50 p-5", className)}
    >
      <div className="flex flex-col gap-2.5">
        <BookImage coverImageUrl={coverImageUrl} title={title} variant={variant} />
        <BookInfo quoteContent={quoteContent} title={title} author={author} variant={variant} />
      </div>
      <div className="absolute right-2.5 top-5 flex items-center justify-center">
        {variant === "summary" ? (
          <div className="-rotate-90">
            <OptionMenu
              items={menuItems}
              trigger={<IcOption size={24} className="text-gray-300" />}
            />
          </div>
        ) : (
          <div className="flex size-7 items-center justify-center rounded-[4.667px] bg-gray-100">
            <IcWrite size={28} className="text-gray-400" />
          </div>
        )}
      </div>
      <div className="h-px w-full bg-border" />
      <div className="flex flex-wrap gap-1.5">
        {emotions.map((emotion) => (
          <Chip
            key={emotion}
            label={emotion}
            variant={variant}
            emotionIntensity={emotionIntensity}
          />
        ))}
      </div>
      {hasContent && <p className="body2 whitespace-pre-wrap text-gray-500">{content}</p>}
      {hasPhoto && (
        <div
          className={cn(
            "relative shrink-0 overflow-hidden rounded-lg bg-gray-200",
            variant === "summary" ? "h-17 w-17" : "h-32.5 w-32.5",
          )}
        >
          <Image alt="일기 사진" className="object-cover" fill src={diaryImageUrl} />
        </div>
      )}
    </div>
  );
};
