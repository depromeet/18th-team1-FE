"use client";

import type { ReactNode } from "react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type ToastPosition = "top" | "bottom";

export type ToastItem = {
  id: string;
  message: string;
  icon?: ReactNode;
  duration: number;
  position: ToastPosition;
  bottomOffset: number;
};

type ToastStore = {
  toasts: ToastItem[];
  add: (item: Omit<ToastItem, "id">) => void;
  dismiss: (id: string) => void;
};

export const useToastStore = create<ToastStore>()(
  devtools(
    (set) => ({
      toasts: [],
      add: (item): void => {
        const id = crypto.randomUUID();
        set((state) => ({ toasts: [...state.toasts, { ...item, id }] }), false, "toast/add");
      },
      dismiss: (id): void => {
        set(
          (state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }),
          false,
          "toast/dismiss",
        );
      },
    }),
    { name: "ToastStore" },
  ),
);
