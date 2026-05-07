"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

import { cn } from "@/shared/lib/utils";
import { IcBack } from "@/shared/ui/icons";

interface HeaderProps {
  title?: string;
  onBack?: () => void;
  right?: ReactNode;
  className?: string;
}

export const Header = ({ title, onBack, right, className }: HeaderProps): React.ReactElement => {
  const router = useRouter();
  const handleBack =
    onBack ??
    ((): void => {
      router.back();
    });

  return (
    <header
      className={cn(
        "relative flex h-15 w-full items-center justify-between px-5 py-3.5",
        className,
      )}
    >
      {onBack !== undefined ? (
        <button type="button" onClick={handleBack} className="text-gray-700" aria-label="뒤로가기">
          <IcBack size={24} />
        </button>
      ) : (
        <div className="size-6" />
      )}

      {title && (
        <span className="subhead1 absolute left-1/2 -translate-x-1/2 cursor-default select-none text-gray-700">
          {title}
        </span>
      )}

      {right}
    </header>
  );
};
