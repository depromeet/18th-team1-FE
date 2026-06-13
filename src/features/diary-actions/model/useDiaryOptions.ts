"use client";

import { useRouter } from "next/navigation";

interface UseDiaryOptionsReturn {
  handleBack: () => void;
  handleShare: () => void;
  handleDelete: () => void;
}

export const useDiaryOptions = (): UseDiaryOptionsReturn => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleShare = () => {
    // TODO: 공유 로직
  };

  const handleDelete = () => {
    // TODO: 삭제 로직
  };

  return { handleBack, handleShare, handleDelete };
};
