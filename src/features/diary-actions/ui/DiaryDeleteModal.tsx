"use client";

import { createPortal } from "react-dom";
import { Modal } from "@/shared/ui/modal";

interface DiaryDeleteModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export const DiaryDeleteModal = ({ isOpen, onConfirm, onClose }: DiaryDeleteModalProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <button
        type="button"
        className="absolute inset-0 bg-gray-700-50"
        aria-label="닫기"
        onClick={onClose}
      />
      <div className="relative z-10">
        <Modal
          title="기록 삭제"
          description="한번 삭제한 기록은 복원할 수 없어요."
          primaryLabel="삭제"
          secondaryLabel="취소"
          onConfirm={onConfirm}
          onClose={onClose}
        />
      </div>
    </div>,
    document.body,
  );
};
