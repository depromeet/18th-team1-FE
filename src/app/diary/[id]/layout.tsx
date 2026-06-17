"use client";

import { format, parse } from "date-fns";
import { ko } from "date-fns/locale";
import type { ReactNode } from "react";
import { DiaryDeleteModal, DiaryOptionMenu } from "@/features/diary-actions";
import { IcOptionHeader } from "@/shared/ui/icons";
import { useDiaryDetail, useDiaryDetailOptions } from "@/widgets/diary-detail";
import { Header } from "@/widgets/header";

const DiaryDetailLayout = ({ children }: { children: ReactNode }) => {
  const diary = useDiaryDetail();
  const {
    handleBack,
    handleShare,
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
