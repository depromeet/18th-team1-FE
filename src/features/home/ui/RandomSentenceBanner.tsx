"use client";

import { useRef } from "react";

import type { RecommendedSentence } from "@/entities/sentence";
import { Text } from "@/shared/ui/text";

import { useInfiniteSlider } from "../model/useInfiniteSlider";
import { PlaybackControlChip } from "./PlaybackControlChip";

const AUTO_SCROLL_INTERVAL_MS = 5000;
const SWIPE_THRESHOLD_PX = 50;

interface RandomSentenceBannerProps {
  sentences: RecommendedSentence[];
  onSlideClick?: (sentence: RecommendedSentence) => void;
}

export const RandomSentenceBanner = ({ sentences, onSlideClick }: RandomSentenceBannerProps) => {
  const {
    slideIndex,
    isAnimating,
    isPaused,
    currentPosition,
    togglePause,
    handleTransitionEnd,
    goNext,
    goPrev,
  } = useInfiniteSlider({
    count: sentences.length,
    intervalMs: AUTO_SCROLL_INTERVAL_MS,
  });

  const dragStartXRef = useRef<number | null>(null);
  // 드래그로 슬라이드된 경우 클릭 이벤트 차단
  const wasSwipedRef = useRef(false);

  const handleDragStart = (x: number) => {
    dragStartXRef.current = x;
    wasSwipedRef.current = false;
  };

  const handleDragEnd = (endX: number) => {
    if (dragStartXRef.current === null || isAnimating) return;
    const delta = dragStartXRef.current - endX;
    if (Math.abs(delta) > SWIPE_THRESHOLD_PX) {
      wasSwipedRef.current = true;
      if (delta > 0) goNext();
      else goPrev();
    }
    dragStartXRef.current = null;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const x = e.touches[0]?.clientX;
    if (x !== undefined) handleDragStart(x);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const x = e.changedTouches[0]?.clientX;
    if (x !== undefined) handleDragEnd(x);
  };

  if (sentences.length === 0) {
    return (
      <div className="flex w-full flex-col">
        <div className="h-72.25 overflow-hidden bg-key-primary">
          <div className="flex w-full shrink-0 flex-col gap-5 p-5">
            <div className="h-31.5" />
            <div className="caption2" />
          </div>
        </div>
        <div className="h-1.5 bg-key-point-50" />
      </div>
    );
  }

  const firstSentence = sentences[0];
  const lastSentence = sentences[sentences.length - 1];

  const slides =
    sentences.length > 1 && firstSentence && lastSentence
      ? [
          { ...lastSentence, slideKey: `${lastSentence.id}-clone-start` },
          ...sentences.map((sentence) => ({ ...sentence, slideKey: sentence.id })),
          { ...firstSentence, slideKey: `${firstSentence.id}-clone-end` },
        ]
      : sentences.map((sentence) => ({ ...sentence, slideKey: sentence.id }));

  return (
    <div className="flex w-full flex-col">
      <div
        className="relative h-72.25 overflow-hidden bg-key-primary [touch-action:pan-y]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex h-full"
          style={{
            transform: `translateX(-${slideIndex * 100}%)`,
            transition: isAnimating ? "transform 850ms cubic-bezier(0.22, 1, 0.36, 1)" : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {slides.map((slide) => (
            <button
              key={slide.slideKey}
              type="button"
              className="flex h-full w-full shrink-0 flex-col gap-5 p-5 text-left"
              onClick={() => {
                if (wasSwipedRef.current) {
                  wasSwipedRef.current = false;
                  return;
                }
                onSlideClick?.(slide);
              }}
            >
              <p className="title1 line-clamp-3 text-key-secondary">{slide.quote}</p>
              <Text variant="caption2" color="key-secondary">
                &#x300E;{slide.bookTitle}&#x300F;, {slide.bookAuthor}
              </Text>
            </button>
          ))}
        </div>
        <PlaybackControlChip
          isPaused={isPaused}
          currentPosition={currentPosition}
          total={sentences.length}
          onToggle={togglePause}
        />
      </div>
      <div className="h-1.5 bg-key-point-50" />
    </div>
  );
};
