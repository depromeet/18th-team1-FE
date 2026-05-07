"use client";

import { useRouter } from "next/navigation";

interface UseDiaryOptionsReturn {
  handleBack: () => void;
  handleEdit: () => void;
  handleShare: () => void;
  handleDelete: () => void;
}

export const useDiaryOptions = (): UseDiaryOptionsReturn => {
  const router = useRouter();

  const handleBack = (): void => {
    router.back();
  };

  const handleEdit = (): void => {
    // TODO: 수정 로직
  };

  const handleShare = (): void => {
    // TODO: 공유 로직
  };

  const handleDelete = (): void => {
    // TODO: 삭제 로직
  };

  return { handleBack, handleEdit, handleShare, handleDelete };
};
