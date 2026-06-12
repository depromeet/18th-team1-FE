"use client";

import { cn } from "@/shared/lib/utils";
import { Text } from "@/shared/ui/text";

interface HomeSentenceItemProps {
  day: number;
  sentence: string;
  dayName: string;
  isSunday?: boolean;
}

export const HomeSentenceItem = ({
  day,
  sentence,
  dayName,
  isSunday = false,
}: HomeSentenceItemProps) => (
  <div className="flex h-21.5 items-center gap-4 border-b border-gray-200 py-5 pl-5 pr-1.5">
    <div className="flex w-9.75 shrink-0 flex-col items-center">
      <Text
        as="span"
        variant="body3"
        className={cn("-mb-1 w-9.75 text-center", isSunday ? "text-sub-sunday" : "text-gray-500")}
      >
        {dayName}
      </Text>
      <div className="flex h-8 items-center justify-center">
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
    <Text variant="body4" color="gray-600" className="line-clamp-3 flex-1">
      {sentence}
    </Text>
  </div>
);
