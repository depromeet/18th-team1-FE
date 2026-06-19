"use client";

import type { ReactNode } from "react";

import { cn } from "@/shared/lib/utils";

interface IconButtonProps {
  icon: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const IconButton = ({ icon, className, onClick }: IconButtonProps) => (
  <button
    type="button"
    className={cn(
      "flex shrink-0 w-14 h-14 items-center justify-center rounded-2xl bg-gray-400",
      className,
    )}
    onClick={onClick}
  >
    {icon}
  </button>
);
