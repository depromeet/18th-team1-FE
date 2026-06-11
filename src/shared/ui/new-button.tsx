"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

import { cn } from "@/shared/lib/utils";

const newButtonVariants = cva(
  "subhead4 flex h-14 w-full items-center justify-center gap-2 px-[10px] transition-colors disabled:pointer-events-none disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "bg-gray-700 text-gray-0 disabled:bg-gray-100 disabled:text-gray-300",
        secondary: "bg-transparent text-gray-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface NewButtonProps extends VariantProps<typeof newButtonVariants> {
  label?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  asChild?: boolean;
}

export const NewButton = ({
  label,
  leftIcon,
  rightIcon,
  variant,
  disabled = false,
  className,
  onClick,
  asChild = false,
}: NewButtonProps): React.ReactElement => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      type={asChild ? undefined : "button"}
      disabled={disabled}
      className={cn(newButtonVariants({ variant }), className)}
      onClick={onClick}
    >
      {leftIcon}
      {label}
      {rightIcon}
    </Comp>
  );
};

export { newButtonVariants };
