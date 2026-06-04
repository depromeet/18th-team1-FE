import type { Diary } from "@/entities/diary";
import { Text } from "@/shared/ui/text";

import { HomeSentenceItem } from "./HomeSentenceItem";

const DAY_NAMES = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"] as const;

interface HomeSentenceSectionProps {
  diaries: Diary[];
}

export const HomeSentenceSection = ({ diaries }: HomeSentenceSectionProps): React.ReactElement => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const monthNameEN = today.toLocaleString("en-US", { month: "short" }).toUpperCase();

  return (
    <section className="flex flex-col [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
      <div className="flex items-center gap-2 px-5 pt-7.5 pb-4">
        <Text as="span" variant="point2" color="gray-600">
          {monthNameEN}
        </Text>
        <div className="h-3.5 w-px bg-gray-400" />
        <Text as="span" variant="subhead1" color="gray-600" className="-translate-y-px">
          {month}월에 함께한 문장
        </Text>
      </div>
      {diaries.length === 0 ? (
        <div className="flex flex-1 flex-col items-center pt-9.75">
          <Text variant="body2" color="gray-400">
            아직 작성된 일기가 없어요
          </Text>
        </div>
      ) : (
        <div className="flex flex-col gap-3 px-5 pb-24">
          {diaries.map((diary) => {
            const date = new Date(today.getFullYear(), today.getMonth(), diary.day);
            const dayIndex = date.getDay();
            const dayName = DAY_NAMES[dayIndex] ?? "일요일";
            const isSunday = dayIndex === 0;
            return (
              <HomeSentenceItem
                key={diary.day}
                day={diary.day}
                sentence={diary.sentence}
                dayName={dayName}
                isSunday={isSunday}
              />
            );
          })}
        </div>
      )}
    </section>
  );
};
