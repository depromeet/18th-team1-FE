"use client";

import type { KeyboardEvent, MouseEvent } from "react";
import { DoubleButton } from "./double-button";

interface ModalProps {
  title?: string;
  description: string;
  primaryLabel: string;
  secondaryLabel: string;
  onConfirm?: () => void;
  onClose?: () => void;
}

export const Modal = ({
  title,
  description,
  primaryLabel,
  secondaryLabel,
  onConfirm,
  onClose,
}: ModalProps) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
      className="flex w-71 flex-col gap-7 rounded-2xl bg-background px-2.5 pb-2.5 pt-7"
      onClick={(event: MouseEvent<HTMLDivElement>) => event.stopPropagation()}
      onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
        event.stopPropagation();
        if (event.key === "Escape") onClose?.();
      }}
    >
      <div className="flex w-full flex-col items-center gap-1.5">
        {title && (
          <h2 id="modal-title" className="subhead1 text-center text-gray-700">
            {title}
          </h2>
        )}
        <p className="body1 text-center text-gray-600">{description}</p>
      </div>
      <DoubleButton
        className="h-11.5 gap-2.5"
        secondaryLabel={secondaryLabel}
        primaryLabel={primaryLabel}
        onSecondaryClick={onClose}
        onPrimaryClick={onConfirm}
      />
    </div>
  );
};
