"use client";

import type { DiaryDetail } from "../model/diary.types";
import { DiaryBookSection } from "./DiaryBookSection";
import { DiaryEmotionSection } from "./DiaryEmotionSection";
import { DiaryPurposeSection } from "./DiaryPurposeSection";
import { DiaryQuoteSection } from "./DiaryQuoteSection";

interface DiaryDetailCardProps {
  diary: DiaryDetail;
}

const Divider = () => <div className="h-px w-full bg-border" />;

export const DiaryDetailCard = ({ diary }: DiaryDetailCardProps): React.ReactElement => {
  const {
    title,
    author,
    coverImageUrl,
    aladinLink,
    quoteContent,
    emotions,
    emotionValue,
    content,
    purpose,
  } = diary;

  return (
    <div className="flex w-full flex-col gap-5 px-5">
      <DiaryBookSection
        title={title}
        author={author}
        coverImageUrl={coverImageUrl}
        aladinLink={aladinLink}
      />
      <Divider />
      <DiaryQuoteSection quoteContent={quoteContent} />
      <Divider />
      <DiaryEmotionSection emotions={emotions} emotionValue={emotionValue} content={content} />
      {purpose && (
        <>
          <Divider />
          <DiaryPurposeSection purpose={purpose} />
        </>
      )}
    </div>
  );
};
