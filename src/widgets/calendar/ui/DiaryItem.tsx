"use client";

import Image from "next/image";
import Link from "next/link";
import {
  DiaryTagSection,
  type RecommendationListItem,
  useDiaryDetailQuery,
  useDiaryStore,
} from "@/entities/diary";
import {
  DiaryDeleteModal,
  DiaryOptionMenu,
  useDiaryDeleteModal,
  useDiaryOptions,
} from "@/features/diary-actions";
import { IcOptionCard } from "@/shared/ui/icons";

interface DiaryItemProps {
  diary: RecommendationListItem;
}

export const DiaryItem = ({ diary }: DiaryItemProps) => {
  const { setSelectedDiary } = useDiaryStore();
  const { handleShare, handleDelete } = useDiaryOptions(diary.recommendationId);
  const { isDeleteModalOpen, handleDeleteClick, handleConfirmDelete, handleCancelDelete } =
    useDiaryDeleteModal({ onDelete: handleDelete });
  const { data: detail } = useDiaryDetailQuery(diary.recommendationId);
  const tags = detail?.emotionTags.map((tag) => tag.label) ?? [];

  const handleDeleteOpen = () => {
    setSelectedDiary(diary);
    handleDeleteClick();
  };

  return (
    <div className="relative pt-5 px-5">
      <Link href={`/diary/${diary.recommendationId}`} onClick={() => setSelectedDiary(diary)}>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <div className="flex gap-3 items-center">
              <div className="relative w-15.75 h-24.5 shrink-0 rounded-[4px] overflow-hidden bg-gray-100">
                {diary.quote.image && (
                  <Image
                    alt={diary.quote.title}
                    src={diary.quote.image}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex flex-col gap-1.5 flex-1 min-w-0 pr-8">
                <p className="subhead4 text-gray-700 line-clamp-3">{diary.quote.content}</p>
                <p className="caption2 text-gray-600 truncate">{`『${diary.quote.title}』, ${diary.quote.author}`}</p>
              </div>
            </div>
            <DiaryTagSection tags={tags} emotionValue={diary.emotionValue} />
          </div>
          <div className="h-px w-full bg-gray-100" />
        </div>
      </Link>
      <div className="absolute right-5 top-5">
        <DiaryOptionMenu
          trigger={<IcOptionCard size={24} className="text-gray-300" />}
          onShare={handleShare}
          onDelete={handleDeleteOpen}
        />
      </div>
      <DiaryDeleteModal
        isOpen={isDeleteModalOpen}
        onConfirm={handleConfirmDelete}
        onClose={handleCancelDelete}
      />
    </div>
  );
};
