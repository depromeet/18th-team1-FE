"use client";

import { format } from "date-fns";
import { ko } from "date-fns/locale";
import type { ReactNode } from "react";

import { DiaryOptionMenu, useDiaryOptions } from "@/features/diary-actions";
import { IcOptionHeader } from "@/shared/ui/icons";
import { useDiaryDetail } from "@/widgets/diary-detail";
import { Header } from "@/widgets/header";

const DiaryDetailLayout = ({ children }: { children: ReactNode }) => {
  const { handleBack, handleEdit, handleShare, handleDelete } = useDiaryOptions();
  const diary = useDiaryDetail();

  return (
    <div className="flex h-full flex-col bg-gray-100">
      <Header
        title={diary ? format(new Date(diary.createdAt), "M월 d일", { locale: ko }) : ""}
        onBack={handleBack}
        right={
          <DiaryOptionMenu
            trigger={<IcOptionHeader size={24} className="text-gray-700" />}
            onEdit={handleEdit}
            onShare={handleShare}
            onDelete={handleDelete}
          />
        }
      />
      <main className="flex min-h-0 flex-1 flex-col overflow-hidden">{children}</main>
    </div>
  );
};

export default DiaryDetailLayout;
