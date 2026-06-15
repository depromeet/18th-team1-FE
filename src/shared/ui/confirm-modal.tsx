"use client";

import { Dialog, DialogContent, DialogTitle } from "./dialog";

interface ConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  description: React.ReactNode;
  cancelLabel?: string;
  confirmLabel: string;
  onConfirm?: () => void;
}

export const ConfirmModal = ({
  open,
  onOpenChange,
  description,
  cancelLabel = "취소",
  confirmLabel,
  onConfirm,
}: ConfirmModalProps) => {
  const handleConfirm = () => {
    onConfirm?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-71 gap-7 px-2.5 pb-2.5 pt-7"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogTitle className="sr-only">{confirmLabel}</DialogTitle>
        <div className="body1 flex items-center justify-center text-center text-gray-600">
          {description}
        </div>
        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="subhead4 flex h-11.5 flex-1 items-center justify-center rounded-lg bg-gray-100 text-gray-300"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="subhead4 flex h-11.5 flex-1 items-center justify-center rounded-lg bg-gray-700 text-gray-0"
          >
            {confirmLabel}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
