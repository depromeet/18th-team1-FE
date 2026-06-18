"use client";

import { format, parse } from "date-fns";
import { ko } from "date-fns/locale";
import type { ReactNode } from "react";
import { DiaryDeleteModal, DiaryOptionMenu } from "@/features/diary-actions";
import { useSentenceShareCardDrawer } from "@/features/sentence-share";
import { IcOptionHeader } from "@/shared/ui/icons";
import { useDiaryDetail, useDiaryDetailOptions } from "@/widgets/diary-detail";
import { Header } from "@/widgets/header";

const DiaryDetailLayout = ({ children }: { children: ReactNode }) => {
  const diary = useDiaryDetail();
  const { openSentenceShareCardDrawer } = useSentenceShareCardDrawer();
  const {
    handleBack,
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete,
    isDeleteModalOpen,
  } = useDiaryDetailOptions();

  const handleShare = (): void => {
    if (!diary) return;
    openSentenceShareCardDrawer({
      shareType: "sentence-pick",
      date: diary.recommendationDate,
      sentencePickData: {
        quote: diary.quote.content,
        title: diary.quote.title,
        author: diary.quote.author,
        coverImageUrl: diary.quote.image,
      },
    });
  };

  return (
    <div className="flex h-full flex-col">
      <Header
        title={
          diary
            ? format(parse(diary.recommendationDate, "yyyy-MM-dd", new Date()), "M월 d일", {
                locale: ko,
              })
            : ""
        }
        onBack={handleBack}
        right={
          <DiaryOptionMenu
            trigger={<IcOptionHeader size={24} className="text-gray-700" />}
            onShare={handleShare}
            onDelete={handleDeleteClick}
          />
        }
      />
      <main className="flex min-h-0 flex-1 flex-col overflow-hidden">{children}</main>
      <DiaryDeleteModal
        isOpen={isDeleteModalOpen}
        onConfirm={handleConfirmDelete}
        onClose={handleCancelDelete}
      />
    </div>
  );
};

export default DiaryDetailLayout;
