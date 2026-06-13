"use client";

import { useRouter } from "next/navigation";
import { useDiaryDeleteModal, useDiaryOptions } from "@/features/diary-actions";

export const useDiaryDetailOptions = () => {
  const router = useRouter();
  const { handleBack, handleShare, handleDelete } = useDiaryOptions();
  const {
    isDeleteModalOpen,
    handleDeleteClick,
    handleConfirmDelete: confirmDelete,
    handleCancelDelete,
  } = useDiaryDeleteModal({ onDelete: handleDelete });

  const handleConfirmDelete = () => {
    confirmDelete();
    router.push("/calendar");
  };

  return {
    handleBack,
    handleShare,
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete,
    isDeleteModalOpen,
  };
};
