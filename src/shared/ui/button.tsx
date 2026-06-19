"use client";

import type { ReactNode } from "react";

import { cn } from "@/shared/lib/utils";

interface ButtonProps {
  label?: string;
  icon?: ReactNode;
  isDisabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Button = ({ label, icon, isDisabled = false, className, onClick }: ButtonProps) => (
  <button
    type="button"
    className={cn(
      "subhead4 flex w-full h-14 items-center justify-center gap-[7px] rounded-2xl bg-gray-700 capitalize text-gray-0 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-300",
      className,
    )}
    disabled={isDisabled}
    onClick={onClick}
  >
    {icon}
    {label}
  </button>
);
