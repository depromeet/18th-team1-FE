"use client";

import { cn } from "@/shared/lib/utils";
import { Text } from "@/shared/ui/text";

import type { Diary } from "../model/diary.types";

interface DiaryListItemProps extends Pick<Diary, "day" | "sentence"> {
  dayName: string;
  isSunday?: boolean;
  onPress?: () => void;
}

export const DiaryListItem = ({
  day,
  sentence,
  dayName,
  isSunday = false,
  onPress,
}: DiaryListItemProps): React.ReactElement => (
  <div className="flex items-center gap-2 rounded-2xl bg-gray-50 py-5 pl-5 pr-1.5">
    <div className="flex flex-1 items-center gap-4">
      <div className="flex w-9.75 shrink-0 flex-col items-center pb-1">
        <Text
          as="span"
          variant="body2"
          className={cn(isSunday ? "text-sub-sunday" : "text-gray-500")}
        >
          {dayName}
        </Text>
        <Text
          as="span"
          variant="point1"
          className={cn("leading-none", isSunday ? "text-sub-sunday" : "text-gray-600")}
        >
          {day}
        </Text>
      </div>
      <div className="h-15.5 w-px shrink-0 bg-gray-200" />
      <Text variant="body3" color="gray-600" className="flex-1 line-clamp-3">
        {sentence}
      </Text>
    </div>
    <button
      type="button"
      onClick={onPress}
      className="shrink-0 p-2 text-gray-300"
      aria-label="일기 상세보기"
    >
      <svg width="7" height="12" viewBox="0 0 7 12" fill="none" aria-hidden="true">
        <path
          d="M1 1L6 6L1 11"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  </div>
);
