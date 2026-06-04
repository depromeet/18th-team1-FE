"use client";

import Image from "next/image";
import { IconButton } from "@/shared/ui/icon-button";
import { IcWrite } from "@/shared/ui/icons";
import type { DiaryDetail } from "../model/diary.types";
import { DiaryChip } from "./DiaryChip";

interface DiaryDetailCardProps {
  diary: DiaryDetail;
}

export const DiaryDetailCard = ({ diary }: DiaryDetailCardProps) => {
  const {
    quoteContent,
    title,
    author,
    emotionIntensity,
    emotions,
    content,
    coverImageUrl,
    diaryImageUrl,
    aladinLink,
  } = diary;

  const handleAladinLinkOpen = () => {
    window.open(aladinLink, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="relative flex w-full flex-col gap-4 rounded-2xl bg-gray-0 p-5">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div className="relative h-21.5 w-15 shrink-0 overflow-hidden rounded-[4px]">
            {coverImageUrl && (
              <Image
                alt={title}
                src={coverImageUrl}
                fill
                sizes="3.75rem"
                className="object-cover"
              />
            )}
          </div>
          {aladinLink && (
            <IconButton
              icon={<IcWrite className="text-gray-400" />}
              className="w-7 h-7 bg-gray-100 rounded-[4.67px]"
              onClick={handleAladinLinkOpen}
            />
          )}
        </div>
        <div className="flex flex-col gap-2.5">
          <p className="title2 w-full text-gray-700">{quoteContent}</p>
          <div className="flex items-center gap-0.5 text-gray-500">
            <span className="caption2 whitespace-nowrap">{title}</span>
            <span className="caption2">･</span>
            <span className="caption2 truncate">{author}</span>
          </div>
        </div>
      </div>
      <div className="h-px w-full bg-border" />
      {emotions && emotions.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {emotions.map((emotion) => (
            <DiaryChip key={emotion} label={emotion} variant={emotionIntensity} />
          ))}
        </div>
      )}
      {content != null && <p className="body3 whitespace-pre-wrap text-gray-500">{content}</p>}
      {diaryImageUrl != null && (
        <div className="relative h-32.5 w-32.5 shrink-0 overflow-hidden rounded-lg bg-gray-200">
          <Image
            alt="일기 사진"
            className="object-cover"
            fill
            sizes="8.125rem"
            src={diaryImageUrl}
          />
        </div>
      )}
    </div>
  );
};
