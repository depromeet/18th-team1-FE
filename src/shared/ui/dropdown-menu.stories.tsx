"use client";

import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";

import { IcEdit, IcShare, IcTrash } from "@/shared/ui/icons";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";

const meta: Meta = {
  title: "DropdownMenu",
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj;

// cmp_modal_option — 수정/공유/삭제 옵션 메뉴
export const OptionMenu: Story = {
  render: () => (
    <DropdownMenu defaultOpen>
      <DropdownMenuTrigger className="body2 text-gray-400">메뉴 열기</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <IcEdit />
            수정하기
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IcShare />
            공유하기
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive">
            <IcTrash className="text-destructive" />
            삭제
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

// cmp_modal_option — 삭제 단독
export const DestructiveOnly: Story = {
  render: () => (
    <DropdownMenu defaultOpen>
      <DropdownMenuTrigger className="body2 text-gray-400">메뉴 열기</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem variant="destructive">
          <IcTrash className="text-destructive" />
          삭제
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

// cmp_modal_option — 구분선으로 그룹 분리
export const WithSeparator: Story = {
  render: () => (
    <DropdownMenu defaultOpen>
      <DropdownMenuTrigger className="body2 text-gray-400">메뉴 열기</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <IcEdit />
            수정하기
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <IcShare />
            공유하기
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

// dim 배경과 함께
export const WithDim: Story = {
  render: () => (
    <DropdownMenu defaultOpen>
      <DropdownMenuTrigger className="body2 text-gray-400">메뉴 열기</DropdownMenuTrigger>
      <DropdownMenuContent showDim>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <IcEdit />
            수정하기
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IcShare />
            공유하기
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

// cmp_modal_week — 체크박스 선택 메뉴
export const CheckboxMenu: Story = {
  render: () => {
    const [isWeekly, setIsWeekly] = useState(true);
    const [isMonthly, setIsMonthly] = useState(false);

    return (
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger className="body2 text-gray-400">기간 선택</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem
            checked={isWeekly}
            onCheckedChange={(value) => setIsWeekly(!!value)}
          >
            주간
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={isMonthly}
            onCheckedChange={(value) => setIsMonthly(!!value)}
          >
            월간
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};
