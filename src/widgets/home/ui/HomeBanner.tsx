import { Text } from "@/shared/ui/text";

import { DiaryWriteButton } from "./DiaryWriteButton";

interface HomeBannerProps {
  hasTodayDiary: boolean;
  sentenceCount?: number;
}

export const HomeBanner = ({
  hasTodayDiary,
  sentenceCount = 0,
}: HomeBannerProps): React.ReactElement => (
  <div className="flex h-60 w-full shrink-0 flex-col justify-between bg-gray-100 px-5 py-5">
    <div className="flex flex-col gap-1">
      <Text as="span" variant="title1" color="key-secondary2">
        {hasTodayDiary ? "오늘 작성한 일기 보기" : "오늘의 일기 작성하기"}
      </Text>
      <Text as="span" variant="subhead6" color="key-secondary2">
        지금까지 {sentenceCount}개의 문장을 모았어요
      </Text>
    </div>
    <div className="self-end">
      <DiaryWriteButton hasTodayDiary={hasTodayDiary} />
    </div>
  </div>
);
