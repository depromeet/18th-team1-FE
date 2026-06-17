"use client";

import type { RecommendationDetailResponse } from "../model/diary.types";
import { DiaryBookSection } from "./DiaryBookSection";
import { DiaryEmotionSection } from "./DiaryEmotionSection";
import { DiaryPurposeSection } from "./DiaryPurposeSection";
import { DiaryQuoteSection } from "./DiaryQuoteSection";

interface DiaryDetailCardProps {
  diary: RecommendationDetailResponse;
}

const Divider = () => <div className="h-px w-full bg-border" />;

export const DiaryDetailCard = ({ diary }: DiaryDetailCardProps): React.ReactElement => {
  const { quote, emotionTags, emotionValue, diaryText, feelingText } = diary;
  const emotions = emotionTags.map((tag) => tag.label);

  return (
    <div className="flex w-full flex-col gap-5 px-5">
      <DiaryBookSection
        title={quote.title}
        author={quote.author}
        coverImageUrl={quote.image}
        aladinLink={quote.link}
      />
      <Divider />
      <DiaryQuoteSection quoteContent={quote.content} />
      <Divider />
      <DiaryEmotionSection emotions={emotions} emotionValue={emotionValue} content={diaryText} />
      {feelingText && (
        <>
          <Divider />
          <DiaryPurposeSection purpose={feelingText} />
        </>
      )}
    </div>
  );
};
