"use client";

import { useState } from "react";

interface UseDiaryDeleteModalProps {
  onDelete?: () => void;
}

export const useDiaryDeleteModal = ({ onDelete }: UseDiaryDeleteModalProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete?.();
    setIsDeleteModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  return {
    isDeleteModalOpen,
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete,
  };
};
