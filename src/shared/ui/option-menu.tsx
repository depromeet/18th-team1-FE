"use client";

import type { ReactElement, ReactNode } from "react";
import { cloneElement, useState } from "react";

import { cn } from "@/shared/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { IcOption } from "@/shared/ui/icons";

export interface OptionMenuItem {
  icon: ReactElement<{ size?: number; className?: string }>;
  label: string;
  onClick?: () => void;
  isDestructive?: boolean;
}

interface OptionMenuProps {
  items: OptionMenuItem[];
  trigger?: ReactNode;
}

export const OptionMenu = ({ items, trigger }: OptionMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-40 bg-gray-700/50" />}
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="flex items-center justify-center text-gray-700 outline-none"
            aria-label="더보기"
          >
            {trigger ?? <IcOption size={24} className="size-6" />}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          sideOffset={22}
          className="flex min-w-33 flex-col gap-5 rounded-[20px] border-0 bg-background p-5 shadow-[0px_0px_30px_0px_rgba(0,0,0,0.1)]"
        >
          {items.map((item) => (
            <DropdownMenuItem
              key={item.label}
              className={cn(
                "cursor-pointer gap-2.5 p-0 focus:bg-transparent",
                item.isDestructive
                  ? "text-destructive focus:text-destructive"
                  : "text-gray-700 focus:text-gray-700",
              )}
              onClick={item.onClick}
            >
              {cloneElement(item.icon, {
                size: 20,
                className: cn(
                  "size-5 shrink-0 -translate-y-[0.5px]",
                  item.isDestructive ? "text-destructive" : "text-gray-700",
                ),
              })}
              <span className="body2">{item.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
