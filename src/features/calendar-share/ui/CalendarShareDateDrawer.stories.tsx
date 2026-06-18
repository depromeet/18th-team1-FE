"use client";

import type { Meta, StoryObj } from "@storybook/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { format, startOfWeek, subDays, subWeeks } from "date-fns";
import { useState } from "react";
import type { DiaryListResponse } from "@/entities/diary";
import { diaryKeys } from "@/entities/diary";

import { CalendarShareDateDrawer } from "./CalendarShareDateDrawer";

// ── mock data ──────────────────────────────────────────────────────────────────

const today = new Date();
const WEEK_COUNT = 8;
const weekStart = startOfWeek(subWeeks(today, WEEK_COUNT - 1), { weekStartsOn: 0 });
const queryStart = format(weekStart, "yyyy-MM-dd");
const queryEnd = format(today, "yyyy-MM-dd");

const mockDiaries: DiaryListResponse = {
  start: queryStart,
  end: queryEnd,
  diaries: [
    {
      id: 1,
      createdAt: format(today, "yyyy-MM-dd"),
      content: null,
      emotionValue: 80,
      quoteContent:
        "우리는 우리가 반복적으로 하는 것의 산물이다.\n탁월함은 행동이 아니라 습관이다.",
      coverImageUrl: "https://picsum.photos/seed/diary1/100/150",
      author: "아리스토텔레스",
      title: "니코마코스 윤리학",
    },
    {
      id: 2,
      createdAt: format(subDays(today, 2), "yyyy-MM-dd"),
      content: null,
      emotionValue: 60,
      quoteContent: "행복은 준비된 자에게 찾아온다.",
      coverImageUrl: "https://picsum.photos/seed/diary2/100/150",
      author: "루이 파스퇴르",
      title: "과학의 시대",
    },
    {
      id: 3,
      createdAt: format(subDays(today, 3), "yyyy-MM-dd"),
      content: null,
      emotionValue: 70,
      quoteContent: "인간은 생각하는 갈대다.",
      coverImageUrl: "https://picsum.photos/seed/diary3/100/150",
      author: "블레즈 파스칼",
      title: "팡세",
    },
    {
      id: 4,
      createdAt: format(subDays(today, 3), "yyyy-MM-dd"),
      content: null,
      emotionValue: 50,
      quoteContent: "두 번째 일기.",
      coverImageUrl: "https://picsum.photos/seed/diary4/100/150",
      author: "저자",
      title: "책 제목",
    },
    {
      id: 5,
      createdAt: format(subDays(today, 10), "yyyy-MM-dd"),
      content: null,
      emotionValue: 90,
      quoteContent: "지식은 힘이다.",
      coverImageUrl: "https://picsum.photos/seed/diary5/100/150",
      author: "프랜시스 베이컨",
      title: "신기관",
    },
  ],
};

const createQueryClient = () => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  client.setQueryData(diaryKeys.list(queryStart, queryEnd), mockDiaries);
  return client;
};

// ── meta ───────────────────────────────────────────────────────────────────────

const meta: Meta<typeof CalendarShareDateDrawer> = {
  title: "features/calendar-share/CalendarShareDateDrawer",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <QueryClientProvider client={createQueryClient()}>
        <div
          className="relative mx-auto overflow-hidden bg-muted"
          style={{ width: 375, height: 812 }}
        >
          <Story />
        </div>
      </QueryClientProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CalendarShareDateDrawer>;

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);
    return (
      <>
        <div className="flex h-full items-center justify-center">
          <span className="body3 text-gray-400">
            {selected ? `선택됨: ${selected}` : "날짜를 선택해주세요"}
          </span>
        </div>
        <CalendarShareDateDrawer
          isOpen
          onSelectDate={(date) => setSelected(date)}
          onClose={() => {}}
        />
      </>
    );
  },
};
