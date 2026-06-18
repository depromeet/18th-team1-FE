"use client";

import { addDays, format, getDay, isAfter, isSameDay, startOfDay } from "date-fns";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { RecommendationListItem } from "@/entities/diary";
import { useDiariesQuery } from "@/entities/diary";
import { cn } from "@/shared/lib/utils";
import { Drawer, DrawerContent } from "@/shared/ui/drawer";
import { IcDelete, IcOption } from "@/shared/ui/icons";
import { NewButton } from "@/shared/ui/new-button";

import type { SentenceShareData } from "../model/calendar-share.types";

// 56일(8주) + 오늘 + 우측 3칸(미래 버퍼) = 60일
// inner flex에 paddingLeft = 3 * cellWidth를 줘서
// scrollLeft = i * cellWidth 일 때 allDays[i]가 정확히 중앙에 위치하도록 맞춤
const PAST_DAYS = 56; // 8주
const TODAY_INDEX = PAST_DAYS; // 56
const TOTAL_DAYS = PAST_DAYS + 1 + 3; // 60

const WEEKDAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"] as const;

// ── Day cell ──────────────────────────────────────────────────────────────────

interface DayCellProps {
  day: Date;
  diaries: RecommendationListItem[];
  isSelected: boolean;
  isDisabled: boolean;
}

const DayCell = ({ day, diaries, isSelected, isDisabled }: DayCellProps): React.ReactElement => {
  const dateNum = format(day, "d");

  if (diaries.length === 0 || isDisabled) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-[10px] bg-gray-50 transition-all duration-150",
          isSelected ? "size-[55px]" : "size-11",
        )}
      >
        <span className="body3 text-gray-200">{dateNum}</span>
      </div>
    );
  }

  const cellHeight = isSelected ? "h-[86px]" : "h-[72px]";
  const cellWidth = isSelected ? "w-[55px]" : "w-[46px]";

  if (diaries.length === 1) {
    const diary = diaries[0];
    if (!diary) return <div className={cn("rounded-[10px] bg-gray-50", cellHeight, cellWidth)} />;
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-[4px] shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] transition-all duration-150",
          cellHeight,
          cellWidth,
        )}
      >
        <Image
          src={diary.quote.image}
          alt={diary.quote.title}
          fill
          sizes="55px"
          className="object-cover"
        />
      </div>
    );
  }

  // 일기 2개 이상: 겹친 썸네일 + 카운트 배지
  const back = diaries[0];
  const front = diaries[1];
  if (!back || !front)
    return <div className={cn("rounded-[10px] bg-gray-50", cellHeight, cellWidth)} />;
  return (
    <div className={cn("relative transition-all duration-150", cellHeight, cellWidth)}>
      <div className="absolute inset-x-[6%] bottom-[17%] top-0 overflow-hidden rounded-[3.5px]">
        <Image
          src={back.quote.image}
          alt={back.quote.title}
          fill
          sizes="40px"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 top-[6.5%] overflow-hidden rounded-[4px] shadow-[0_4px_14px_0_rgba(0,0,0,0.1)]">
        <Image
          src={front.quote.image}
          alt={front.quote.title}
          fill
          sizes="46px"
          className="object-cover"
        />
      </div>
      <div className="absolute right-0 top-[13%] flex size-4.25 items-center justify-center rounded-xl bg-white/20 backdrop-blur-[4.7px]">
        <span className="font-medium text-[10px] leading-none text-white">{diaries.length}</span>
      </div>
    </div>
  );
};

// ── Sentence card ─────────────────────────────────────────────────────────────

interface SentenceCardProps {
  diary: RecommendationListItem;
}

const SentenceCard = ({ diary }: SentenceCardProps): React.ReactElement => (
  <div className="relative flex w-full flex-col gap-2 px-5 pt-5">
    <div className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-1.5 pr-9">
        <p className="subhead4 whitespace-pre-wrap text-gray-700">{diary.quote.content}</p>
        <p className="caption2 text-gray-600">
          『{diary.quote.title}』, {diary.quote.author}
        </p>
      </div>
      <div className="h-px w-full bg-gray-100" />
    </div>
    <button
      type="button"
      className="absolute right-5 top-5 flex size-6 items-center justify-center"
      aria-label="더보기"
    >
      <IcOption size={24} className="-rotate-90 text-gray-400" />
    </button>
  </div>
);

// ── Main ──────────────────────────────────────────────────────────────────────

interface CalendarShareDateDrawerProps {
  isOpen: boolean;
  onSelectDate: (date: string, sentenceData: SentenceShareData) => void;
  onClose: () => void;
}

export const CalendarShareDateDrawer = ({
  isOpen,
  onSelectDate,
  onClose,
}: CalendarShareDateDrawerProps): React.ReactElement => {
  const today = useMemo(() => startOfDay(new Date()), []);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(today);

  // [today-56, ..., today-1, today, today+1, today+2, today+3] = 60일
  const allDays = useMemo(
    () => Array.from({ length: TOTAL_DAYS }, (_, i) => addDays(today, i - TODAY_INDEX)),
    [today],
  );

  // allDays[0] = today - 56일 (8주 시작)
  const queryStart = format(allDays[0] ?? today, "yyyy-MM-dd");
  const queryEnd = format(today, "yyyy-MM-dd");
  const { data } = useDiariesQuery(queryStart, queryEnd, { enabled: isOpen });

  const diaryByDate = useMemo(() => {
    const map = new Map<string, RecommendationListItem[]>();
    for (const diary of data?.recommendations ?? []) {
      map.set(diary.recommendationDate, [...(map.get(diary.recommendationDate) ?? []), diary]);
    }
    return map;
  }, [data]);

  const selectedDiary = (diaryByDate.get(format(selectedDate, "yyyy-MM-dd")) ?? [])[0] ?? null;

  // 현재 보이는 7칸: 선택일 ±3일 → 동적 요일 레이블
  const visibleDays = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(selectedDate, i - 3)),
    [selectedDate],
  );

  // 스크롤 → 중앙 셀(= 뷰포트 중앙)을 selectedDate로 갱신
  const handleScroll = useCallback((): void => {
    const el = scrollRef.current;
    if (!el) return;
    const cellWidth = el.clientWidth / 7;
    const index = Math.max(0, Math.min(Math.round(el.scrollLeft / cellWidth), allDays.length - 1));
    const day = allDays[index];
    if (!day || isAfter(day, today)) return;
    setSelectedDate(day);
  }, [allDays, today]);

  // 열릴 때: 오늘을 중앙으로 초기화
  useEffect(() => {
    if (!isOpen) return;
    setSelectedDate(today);
    requestAnimationFrame(() => {
      const el = scrollRef.current;
      if (!el) return;
      el.scrollLeft = TODAY_INDEX * (el.clientWidth / 7);
    });
  }, [isOpen, today]);

  // 셀 클릭 → 해당 날짜를 중앙으로 스크롤
  const handleCellClick = (day: Date, index: number): void => {
    if (isAfter(day, today)) return;
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: index * (el.clientWidth / 7), behavior: "smooth" });
    setSelectedDate(day);
  };

  const handleConfirm = (): void => {
    if (!selectedDiary) return;
    onSelectDate(format(selectedDate, "yyyy-MM-dd"), {
      quote: selectedDiary.quote.content,
      title: selectedDiary.quote.title,
      author: selectedDiary.quote.author,
    });
  };

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="data-[vaul-drawer-direction=bottom]:max-h-[90vh]">
        {/* 헤더 */}
        <div className="relative flex h-15 items-center justify-center px-5">
          <h2 className="head1 text-gray-700">{format(selectedDate, "M월 d일")}</h2>
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 flex size-7.5 items-center justify-center"
            aria-label="닫기"
          >
            <IcDelete size={24} className="text-gray-300" />
          </button>
        </div>

        {/* 삼각형 인디케이터 — 항상 중앙 열(index 3) 고정 */}
        <div className="grid grid-cols-7 pb-2.25">
          {WEEKDAY_LABELS.map((label, i) => (
            <div key={label} className="flex justify-center">
              {i === 3 && (
                <svg aria-hidden="true" width="30" height="18" viewBox="0 0 30 18" fill="none">
                  <path
                    d="M13.134 16.5C13.5189 17.1667 14.4811 17.1667 14.866 16.5L20.9282 6C21.3131 5.33333 20.832 4.5 20.0622 4.5H7.93782C7.16802 4.5 6.6869 5.33333 7.0718 6L13.134 16.5Z"
                    fill="#222222"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>

        {/*
          요일 레이블 — 선택일 ±3일의 요일을 동적으로 표시
          · 선택일(index 3)이 항상 중앙
          · 오늘에 해당하는 레이블에만 어두운 원 표시
          · 토요일: text-sub-saturday, 일요일: text-sub-sunday
        */}
        <div className="grid grid-cols-7 pb-5">
          {visibleDays.map((day) => {
            const dow = getDay(day); // 0=일, 6=토
            const isToday = isSameDay(day, today);
            return (
              <div key={day.toISOString()} className="flex justify-center">
                <div
                  className={cn(
                    "caption2 flex size-5 items-center justify-center rounded-full",
                    isToday && "bg-gray-700 text-gray-0",
                    !isToday && dow === 0 && "text-sub-sunday",
                    !isToday && dow === 6 && "text-sub-saturday",
                    !isToday && dow !== 0 && dow !== 6 && "text-gray-400",
                  )}
                >
                  {WEEKDAY_LABELS[dow]}
                </div>
              </div>
            );
          })}
        </div>

        {/*
          날짜 셀 — center-snap 1일 단위 스크롤
          · 셀 너비: 100vw / 7 (7칸이 뷰포트를 꽉 채움)
          · snap-center: 뷰포트 중앙에 스냅된 셀이 선택된 날짜
          · paddingLeft = 3 * cellWidth: scrollLeft = i * cellWidth 이면 allDays[i]가 정확히 중앙
          · 우측 3칸(미래 disabled)으로 오늘을 중앙까지 스크롤 가능
        */}
        <div
          ref={scrollRef}
          data-vaul-no-drag
          className="overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          onScroll={handleScroll}
        >
          <div className="flex items-end pb-9" style={{ paddingLeft: "calc(100vw / 7 * 3)" }}>
            {allDays.map((day, index) => {
              const dayDiaries = diaryByDate.get(format(day, "yyyy-MM-dd")) ?? [];
              const isFuture = isAfter(day, today);
              const isSelected = isSameDay(day, selectedDate);
              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  disabled={isFuture}
                  onClick={() => handleCellClick(day, index)}
                  className="flex shrink-0 snap-center justify-center disabled:cursor-default"
                  style={{ width: "calc(100vw / 7)" }}
                >
                  <DayCell
                    day={day}
                    diaries={dayDiaries}
                    isSelected={isSelected}
                    isDisabled={isFuture}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* 선택 날짜의 문장 카드 */}
        {selectedDiary && <SentenceCard diary={selectedDiary} />}

        <NewButton
          label="다음"
          disabled={!selectedDiary}
          onClick={handleConfirm}
          className="mt-5"
        />
      </DrawerContent>
    </Drawer>
  );
};
