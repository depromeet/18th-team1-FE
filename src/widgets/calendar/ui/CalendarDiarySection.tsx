"use client";

import { format, isToday } from "date-fns";
import { useEffect, useMemo, useRef, useState } from "react";
import { useEmotionNavigation } from "@/features/emotion-select";
import { cn } from "@/shared/lib/utils";
import { IcRecord } from "@/shared/ui/icons";
import { useCalendarDiary } from "../model/useCalendarDiary";
import { DiaryItem } from "./DiaryItem";

const SNAP_THRESHOLD = 60;

type SnapState = "default" | "compact";

interface CalendarDiarySectionProps {
  onClose: () => void;
}

export const CalendarDiarySection = ({ onClose }: CalendarDiarySectionProps) => {
  const { diaries, selectedDate, isFutureView } = useCalendarDiary();
  const { navigateToEmotion } = useEmotionNavigation();
  const hasSnap = diaries.length >= 3;
  const hasDefaultScroll = diaries.length >= 4;

  const [snapState, setSnapState] = useState<SnapState>("default");
  const [dragY, setDragY] = useState(0);
  const isDraggingRef = useRef(false);
  const startYRef = useRef(0);
  const dragYRef = useRef(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [itemHeights, setItemHeights] = useState<number[]>([]);

  useEffect(() => {
    if (!hasSnap) return;
    const heights = itemRefs.current
      .slice(0, diaries.length)
      .map((el) => el?.offsetHeight ?? 0)
      .filter((h) => h > 0);
    if (heights.length > 0) setItemHeights(heights);
  }, [diaries, hasSnap]);

  const listMaxHeight = useMemo(() => {
    if (!hasSnap || itemHeights.length === 0) return undefined;
    if (snapState === "compact") {
      return itemHeights.slice(0, 2).reduce((sum, h) => sum + h, 0);
    }
    if (hasDefaultScroll) {
      return itemHeights.slice(0, 3).reduce((sum, h) => sum + h, 0);
    }
    return undefined;
  }, [hasSnap, hasDefaultScroll, snapState, itemHeights]);

  const isScrollable = snapState === "compact" ? hasSnap : hasDefaultScroll;

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    isDraggingRef.current = true;
    startYRef.current = e.clientY;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const delta = e.clientY - startYRef.current;
    dragYRef.current = delta;
    setDragY(delta);
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    const y = dragYRef.current;
    dragYRef.current = 0;
    setDragY(0);

    if (!hasSnap) {
      if (y > SNAP_THRESHOLD) onClose();
      return;
    }

    if (snapState === "default") {
      if (y > SNAP_THRESHOLD) setSnapState("compact");
    } else {
      if (y > SNAP_THRESHOLD) onClose();
      else if (y < -SNAP_THRESHOLD) setSnapState("default");
    }
  };

  const translateY = Math.max(0, dragY);

  const renderContent = () => {
    if (isFutureView || diaries.length === 0) {
      return (
        <p className="body3 text-gray-400 text-center mt-12 mb-8">아직 추천 받은 문장이 없어요.</p>
      );
    }
    return diaries.map((diary, index) => (
      <div
        key={diary.recommendationId}
        ref={(el) => {
          itemRefs.current[index] = el;
        }}
      >
        <DiaryItem diary={diary} />
      </div>
    ));
  };

  return (
    <div
      className={cn(
        "flex flex-col w-full bg-background rounded-t-[20px]",
        dragY === 0 && "transition-transform duration-300",
      )}
      style={{ transform: `translateY(${translateY}px)` }}
    >
      <div
        className="flex justify-center pt-4 pb-5 shrink-0 cursor-grab active:cursor-grabbing touch-none select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <div className="w-9.25 h-1 bg-gray-100 rounded-full" />
      </div>
      <div className="flex items-center justify-between px-5 py-3 shrink-0">
        <p className="head1 text-gray-700">{format(selectedDate, "yyyy.MM.dd")}</p>
        {isToday(selectedDate) && diaries.length < 5 && (
          <button
            type="button"
            onClick={() => navigateToEmotion()}
            className="flex size-7.5 items-center justify-center"
          >
            <IcRecord size={30} className="text-key-secondary" />
          </button>
        )}
      </div>
      <div
        className={cn(
          "pb-12 transition-[max-height] duration-300",
          isScrollable && "overflow-y-auto",
        )}
        style={listMaxHeight !== undefined ? { maxHeight: `${listMaxHeight}px` } : undefined}
      >
        {renderContent()}
      </div>
    </div>
  );
};
