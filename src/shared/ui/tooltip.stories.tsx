"use client";

import type { Meta, StoryObj } from "@storybook/nextjs";

import { Button } from "./button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <div className="flex items-center justify-center p-20">
          <Story />
        </div>
      </TooltipProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button label="호버해보세요" className="bg-muted text-foreground border border-border" />
      </TooltipTrigger>
      <TooltipContent>툴팁 내용입니다</TooltipContent>
    </Tooltip>
  ),
};

export const AllSides: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Tooltip key={side} open>
          <TooltipTrigger asChild>
            <Button label={side} className="w-24 bg-muted text-foreground border border-border" />
          </TooltipTrigger>
          <TooltipContent side={side}>{side} 방향</TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
};

export const AlwaysOpen: Story = {
  render: () => (
    <Tooltip open>
      <TooltipTrigger asChild>
        <Button
          label="카카오 계정으로 시작하기"
          className="w-80 rounded-2xl bg-[#FEE500] text-gray-700"
        />
      </TooltipTrigger>
      <TooltipContent
        side="top"
        className="caption1 rounded-xl bg-gray-600 text-gray-0"
        arrowClassName="fill-gray-600"
      >
        최근 로그인
      </TooltipContent>
    </Tooltip>
  ),
};

export const CustomStyle: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-12">
      <Tooltip open>
        <TooltipTrigger asChild>
          <Button label="기본 스타일" className="bg-muted text-foreground border border-border" />
        </TooltipTrigger>
        <TooltipContent side="top">기본 툴팁</TooltipContent>
      </Tooltip>

      <Tooltip open>
        <TooltipTrigger asChild>
          <Button label="커스텀 스타일" className="bg-muted text-foreground border border-border" />
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="caption1 rounded-xl bg-gray-600 text-gray-0"
          arrowClassName="fill-gray-600"
        >
          커스텀 툴팁
        </TooltipContent>
      </Tooltip>

      <Tooltip open>
        <TooltipTrigger asChild>
          <Button
            label="키 컬러 스타일"
            className="bg-muted text-foreground border border-border"
          />
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="caption1 rounded-xl bg-key-primary text-gray-0"
          arrowClassName="fill-key-primary"
        >
          키 컬러 툴팁
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};
