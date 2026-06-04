"use client";

import type { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { IcEdit, IcShare2, IcTrash } from "@/shared/ui/icons";

interface DiaryOptionMenuProps {
  trigger: ReactNode;
  onEdit?: () => void;
  onShare?: () => void;
  onDelete?: () => void;
}

export const DiaryOptionMenu = ({ trigger, onEdit, onShare, onDelete }: DiaryOptionMenuProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button
        type="button"
        className="flex items-center justify-center outline-none"
        aria-label="더보기"
      >
        {trigger}
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      align="end"
      sideOffset={22}
      className="flex min-w-33 flex-col gap-4 rounded-[20px] border-0 bg-background p-4 shadow-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <DropdownMenuItem
        className="cursor-pointer gap-2.5 p-0 focus:bg-transparent text-gray-700 focus:text-gray-700"
        onClick={onEdit}
      >
        <IcEdit size={20} className="size-5 shrink-0 -translate-y-[0.5px] text-gray-700" />
        <span>수정하기</span>
      </DropdownMenuItem>
      <DropdownMenuItem
        className="cursor-pointer gap-2.5 p-0 focus:bg-transparent text-gray-700 focus:text-gray-700"
        onClick={onShare}
      >
        <IcShare2 size={20} className="size-5 shrink-0 -translate-y-[0.5px] text-gray-700" />
        <span>공유하기</span>
      </DropdownMenuItem>
      <DropdownMenuItem
        className="cursor-pointer gap-2.5 p-0 focus:bg-transparent text-destructive focus:text-destructive"
        onClick={onDelete}
      >
        <IcTrash size={20} className="size-5 shrink-0 -translate-y-[0.5px] text-destructive" />
        <span>삭제</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
