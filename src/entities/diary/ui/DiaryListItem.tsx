"use client";

import { cn } from "@/shared/lib/utils";
import { Text } from "@/shared/ui/text";

import type { Diary } from "../model/diary.types";

interface DiaryListItemProps extends Pick<Diary, "day" | "sentence"> {
  dayName: string;
  isSunday?: boolean;
}

export const DiaryListItem = ({
  day,
  sentence,
  dayName,
  isSunday = false,
}: DiaryListItemProps) => (
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
          className={cn(isSunday ? "text-sub-sunday" : "text-gray-600")}
        >
          {day}
        </Text>
      </div>
    </div>
    <div className="h-15.5 w-px shrink-0 bg-gray-100" />
    <Text variant="body3" color="gray-600" className="line-clamp-3 flex-1">
      {sentence}
    </Text>
  </div>
);
