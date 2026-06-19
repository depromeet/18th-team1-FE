"use client";

import { useRouter } from "next/navigation";
import { useDeleteDiaryMutation } from "@/entities/diary";

export const useDiaryOptions = (recommendationId: number) => {
  const router = useRouter();
  const { mutate: deleteDiary } = useDeleteDiaryMutation();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const handleShare = () => {
    // TODO: 공유 로직
  };

  const handleDelete = () => {
    deleteDiary(recommendationId);
  };

  return { handleBack, handleShare, handleDelete };
};
