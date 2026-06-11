"use client";

import type { ReactNode } from "react";

import { cn } from "@/shared/lib/utils";

interface NewDoubleButtonItem {
  label?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isMuted?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

interface NewDoubleButtonProps {
  left: NewDoubleButtonItem;
  right: NewDoubleButtonItem;
  className?: string;
}

const itemBaseClass =
  "subhead6 flex flex-1 h-full items-center justify-center gap-2 bg-transparent transition-colors disabled:pointer-events-none disabled:cursor-not-allowed";

export const NewDoubleButton = ({
  left,
  right,
  className,
}: NewDoubleButtonProps): React.ReactElement => (
  <div className={cn("flex h-14 w-full items-center bg-gray-700 px-5", className)}>
    <button
      type="button"
      disabled={left.disabled}
      onClick={left.onClick}
      className={cn(itemBaseClass, left.isMuted || left.disabled ? "text-gray-300" : "text-gray-0")}
    >
      {left.leftIcon && <span className="relative -top-px">{left.leftIcon}</span>}
      {left.label}
      {left.rightIcon}
    </button>

    <div className="h-7.5 w-px shrink-0 bg-gray-300" />

    <button
      type="button"
      disabled={right.disabled}
      onClick={right.onClick}
      className={cn(
        itemBaseClass,
        right.isMuted || right.disabled ? "text-gray-300" : "text-gray-0",
      )}
    >
      {right.leftIcon && <span className="relative -top-px">{right.leftIcon}</span>}
      {right.label}
      {right.rightIcon}
    </button>
  </div>
);
