"use client";

import Image from "next/image";
import { IcEdit, IcOption, IcShare, IcTrash } from "@/shared/ui/icons";
import type { OptionMenuItem } from "@/shared/ui/option-menu";
import { OptionMenu } from "@/shared/ui/option-menu";
import type { DiaryDetail } from "../model/diary.types";
import { DiaryChip } from "./DiaryChip";

const DIARY_MENU_ITEMS: OptionMenuItem[] = [
  { icon: <IcEdit />, label: "수정하기" },
  { icon: <IcShare />, label: "공유하기" },
  { icon: <IcTrash />, label: "삭제", isDestructive: true },
];

interface DiaryCardProps {
  diary: DiaryDetail;
}

export const DiaryCard = ({ diary }: DiaryCardProps): React.ReactElement => {
  const { quoteContent, title, author, emotions, content, coverImageUrl, diaryImageUrl } = diary;

  return (
    <div className="relative flex w-full flex-col gap-4 rounded-2xl bg-gray-50 p-5">
      <div className="flex flex-col gap-2.5">
        <div className="relative h-12.75 w-9 shrink-0 overflow-hidden rounded-[4px]">
          {coverImageUrl && <Image alt={title} src={coverImageUrl} fill className="object-cover" />}
        </div>
        <div className="flex flex-col gap-1.5">
          <p className="subhead6 w-full line-clamp-3 text-gray-700">{quoteContent}</p>
          <div className="flex items-center gap-0.5 text-gray-600">
            <span className="caption2 whitespace-nowrap">{title}</span>
            <span className="caption2">･</span>
            <span className="caption2 truncate">{author}</span>
          </div>
        </div>
      </div>
      <div className="absolute right-2.5 top-5 -rotate-90">
        <OptionMenu
          items={DIARY_MENU_ITEMS}
          trigger={<IcOption size={24} className="text-gray-300" />}
        />
      </div>
      <div className="h-px w-full bg-border" />
      <div className="flex flex-wrap gap-1.5">
        {emotions.map((emotion) => (
          <DiaryChip key={emotion} label={emotion} />
        ))}
      </div>
      {content != null && <p className="body3 whitespace-pre-wrap text-gray-500">{content}</p>}
      {diaryImageUrl != null && (
        <div className="relative h-17 w-17 shrink-0 overflow-hidden rounded-lg bg-gray-200">
          <Image alt="일기 사진" className="object-cover" fill src={diaryImageUrl} />
        </div>
      )}
    </div>
  );
};
