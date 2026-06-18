import { type ChangeEvent, type ClipboardEvent, useRef } from "react";

import { useToast } from "@/shared/hooks/useToast";

export const useCharLimit = <T extends HTMLInputElement | HTMLTextAreaElement>(
  maxLength: number,
  onChange: (value: string) => void,
  toastMessage: string,
) => {
  const { toast } = useToast();
  const hasToastedRef = useRef(false);

  const handleChange = (e: ChangeEvent<T>): void => {
    if (e.target.value.length > maxLength) {
      if (!hasToastedRef.current) {
        toast(toastMessage);
        hasToastedRef.current = true;
      }
      return;
    }
    hasToastedRef.current = false;
    onChange(e.target.value);
  };

  const handlePaste = (e: ClipboardEvent<T>): void => {
    const pastedText = e.clipboardData.getData("text");
    const { selectionStart, selectionEnd, value: currentValue } = e.currentTarget;
    const before = currentValue.slice(0, selectionStart ?? currentValue.length);
    const after = currentValue.slice(selectionEnd ?? currentValue.length);
    const resultValue = before + pastedText + after;

    if (resultValue.length > maxLength) {
      e.preventDefault();
      const maxPasteLength = maxLength - before.length - after.length;
      const truncated = before + pastedText.slice(0, Math.max(0, maxPasteLength)) + after;
      onChange(truncated);
      if (!hasToastedRef.current) {
        toast(toastMessage);
        hasToastedRef.current = true;
      }
    }
  };

  return { handleChange, handlePaste };
};
