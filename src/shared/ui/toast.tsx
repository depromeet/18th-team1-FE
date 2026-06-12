"use client";

import { useEffect } from "react";

import { IcInfoCircle } from "@/shared/ui/icons";
import type { ToastItem } from "@/store/toast/useToastStore";
import { useToastStore } from "@/store/toast/useToastStore";

interface ToastProps {
  toast: ToastItem;
}

const Toast = ({ toast }: ToastProps): React.ReactElement => {
  const { dismiss } = useToastStore();
  const animationClass =
    toast.position === "bottom" ? "slide-in-from-bottom-2" : "slide-in-from-top-2";

  useEffect(() => {
    const timer = setTimeout(() => dismiss(toast.id), toast.duration);
    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, dismiss]);

  return (
    <div
      className={`animate-in fade-in ${animationClass} duration-200 flex items-center gap-2 rounded-full bg-white pl-3 pr-4 py-3 backdrop-blur-[15px] shadow-[0_2px_30px_0_rgba(0,27,55,0.10)]`}
    >
      {toast.icon ?? <IcInfoCircle size={24} className="shrink-0 text-gray-600" />}
      <span className="whitespace-nowrap text-[0.9375rem] font-[590] leading-[1.35] text-foreground">
        {toast.message}
      </span>
    </div>
  );
};

export const ToastContainer = (): React.ReactElement => {
  const { toasts } = useToastStore();
  const topToasts = toasts.filter((t) => t.position === "top");
  const bottomToasts = toasts.filter((t) => t.position === "bottom");

  return (
    <>
      <div className="pointer-events-none fixed left-1/2 top-5 z-50 flex -translate-x-1/2 flex-col items-center gap-2">
        {topToasts.map((t) => (
          <Toast key={t.id} toast={t} />
        ))}
      </div>
      {bottomToasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-none fixed left-1/2 z-50 -translate-x-1/2"
          style={{ bottom: t.bottomOffset }}
        >
          <Toast toast={t} />
        </div>
      ))}
    </>
  );
};
