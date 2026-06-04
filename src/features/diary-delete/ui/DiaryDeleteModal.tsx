"use client";

import type { KeyboardEvent, MouseEvent } from "react";

import { DoubleButton } from "@/shared/ui/double-button";

interface DiaryDeleteModalProps {
  isOpen: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const DiaryDeleteModal = ({ isOpen, onConfirm, onCancel }: DiaryDeleteModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
      className="flex w-71 flex-col gap-7 rounded-[1.25rem] bg-background px-2.5 pb-2.5 pt-7"
      onClick={(event: MouseEvent<HTMLDivElement>) => event.stopPropagation()}
      onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
        event.stopPropagation();
        if (event.key === "Escape") onCancel?.();
      }}
    >
      <div className="flex w-full flex-col items-center gap-1.5">
        <h2 id="delete-modal-title" className="subhead1 text-center text-gray-700">
          일기 삭제
        </h2>
        <p className="body1 text-center text-gray-600">한번 삭제한 일기는 복원할 수 없어요.</p>
      </div>
      <DoubleButton
        className="h-11.5 gap-2.5"
        secondaryLabel="취소"
        primaryLabel="삭제"
        onSecondaryClick={onCancel}
        onPrimaryClick={onConfirm}
      />
    </div>
  );
};
