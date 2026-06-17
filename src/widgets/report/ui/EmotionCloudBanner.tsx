"use client";

import type { EmotionTag } from "@/entities/report";

import { getTypographyClassName, useEmotionCloud } from "../model/useEmotionCloud";

interface EmotionCloudBannerProps {
  month: number;
  emotionTags: EmotionTag[];
  recommendationMessage: string;
}

export const EmotionCloudBanner = ({
  month,
  emotionTags,
  recommendationMessage,
}: EmotionCloudBannerProps): React.ReactElement => {
  const { containerRef, sortedTags, positionMap } = useEmotionCloud(emotionTags);

  return (
    <div className="bg-gray-50 pb-6">
      <p className="subhead4 text-key-secondary px-5 pt-5">{month}월의 감정</p>
      <div ref={containerRef} className="relative m-5 overflow-hidden h-48">
        {sortedTags.map((tag, index) => {
          const pos = positionMap.get(tag.tagId);
          if (!pos) return null;
          return (
            <span
              key={tag.tagId}
              className={`absolute whitespace-nowrap text-key-secondary ${getTypographyClassName(index)}`}
              style={{ left: pos.x, top: pos.y }}
            >
              {tag.label}
            </span>
          );
        })}
      </div>
      <div className="mx-5 border-t border-gray-100" />
      <p className="caption3 text-gray-400 px-5 pt-4">{recommendationMessage}</p>
    </div>
  );
};
