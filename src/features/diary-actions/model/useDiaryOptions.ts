"use client";

import { useRouter } from "next/navigation";
import { useDeleteDiaryMutation } from "@/entities/diary";

export const useDiaryOptions = (recommendationId: number) => {
  const router = useRouter();
  const { mutate: deleteDiary } = useDeleteDiaryMutation();

  const handleBack = () => {
    router.back();
  };

  const handleShare = () => {
    // TODO: 공유 로직
  };

  const handleDelete = () => {
    deleteDiary(recommendationId);
  };

  return { handleBack, handleShare, handleDelete };
};
