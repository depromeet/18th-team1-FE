"use client";

import type { ReactNode } from "react";

import type { ToastPosition } from "@/store/toast/useToastStore";
import { useToastStore } from "@/store/toast/useToastStore";

const DEFAULT_BOTTOM_OFFSET: number = 86;

interface ToastOptions {
  icon?: ReactNode;
  duration?: number;
  position?: ToastPosition;
  bottomOffset?: number;
}

export const useToast = (): {
  toast: (message: string, options?: ToastOptions) => void;
  dismiss: (id: string) => void;
} => {
  const { add, dismiss } = useToastStore();

  const toast = (message: string, options?: ToastOptions): void => {
    add({
      message,
      icon: options?.icon,
      duration: options?.duration ?? 3000,
      position: options?.position ?? "top",
      bottomOffset: options?.bottomOffset ?? DEFAULT_BOTTOM_OFFSET,
    });
  };

  return { toast, dismiss };
};
