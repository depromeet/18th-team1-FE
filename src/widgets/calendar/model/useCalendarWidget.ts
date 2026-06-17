"use client";

import { endOfMonth, format, startOfMonth } from "date-fns";
import type { EmotionIntensity } from "@/entities/diary";
import { useDiariesQuery } from "@/entities/diary";
import { useUserProfileQuery } from "@/entities/user";

const getEmotionIntensity = (emotionValue: number): EmotionIntensity => {
  if (emotionValue >= 7) return "HIGH";
  if (emotionValue >= 4) return "MID";
  return "LOW";
};

interface UseCalendarWidgetReturn {
  diaryIntensitiesByDate: Record<string, EmotionIntensity[]>;
  diaryCoverByDate: Record<string, string[]>;
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
  minYear: number | undefined;
  minMonth: number | undefined;
}

export const useCalendarWidget = (viewDate: Date): UseCalendarWidgetReturn => {
  const start = format(startOfMonth(viewDate), "yyyy-MM-dd");
  const end = format(endOfMonth(viewDate), "yyyy-MM-dd");
  const { data } = useDiariesQuery(start, end);
  const diaries = data?.recommendations ?? [];

  const { data: userProfile } = useUserProfileQuery();
  const signupDate = userProfile ? new Date(userProfile.createdAt) : undefined;

  const viewMonthStart = startOfMonth(viewDate);
  const isPrevDisabled = signupDate ? viewMonthStart <= startOfMonth(signupDate) : false;
  const isNextDisabled = viewMonthStart >= startOfMonth(new Date());

  const diaryIntensitiesByDate = diaries.reduce<Record<string, EmotionIntensity[]>>(
    (acc, diary) => {
      const key = diary.recommendationDate;
      acc[key] = [...(acc[key] ?? []), getEmotionIntensity(diary.emotionValue)];
      return acc;
    },
    {},
  );

  const diaryCoverByDate: Record<string, string[]> = [...diaries]
    .filter((diary) => diary.quote.image)
    .sort((a, b) => a.recommendationId - b.recommendationId)
    .reduce<Record<string, string[]>>((acc, diary) => {
      const key = diary.recommendationDate;
      acc[key] = [...(acc[key] ?? []), diary.quote.image];
      return acc;
    }, {});

  return {
    diaryIntensitiesByDate,
    diaryCoverByDate,
    isPrevDisabled,
    isNextDisabled,
    minYear: signupDate?.getFullYear(),
    minMonth: signupDate ? signupDate.getMonth() + 1 : undefined,
  };
};
