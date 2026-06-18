"use client";

import { format, parse } from "date-fns";
import { ko } from "date-fns/locale";
import type { ReactNode } from "react";
import { useState } from "react";
import { DiaryDeleteModal, DiaryOptionMenu } from "@/features/diary-actions";
import { SentenceShareCardDrawer } from "@/features/sentence-share";
import { IcOptionHeader } from "@/shared/ui/icons";
import { useDiaryDetail, useDiaryDetailOptions } from "@/widgets/diary-detail";
import { Header } from "@/widgets/header";

const DiaryDetailLayout = ({ children }: { children: ReactNode }) => {
  const diary = useDiaryDetail();
  const [isShareDrawerOpen, setIsShareDrawerOpen] = useState(false);
  const {
    handleBack,
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete,
    isDeleteModalOpen,
  } = useDiaryDetailOptions();

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
            onShare={() => setIsShareDrawerOpen(true)}
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
      {diary && (
        <SentenceShareCardDrawer
          isOpen={isShareDrawerOpen}
          shareType="sentence-pick"
          date={diary.recommendationDate}
          sentencePickData={{
            quote: diary.quote.content,
            title: diary.quote.title,
            author: diary.quote.author,
          }}
          onClose={() => setIsShareDrawerOpen(false)}
        />
      )}
    </div>
  );
};

export default DiaryDetailLayout;
