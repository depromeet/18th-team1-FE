"use client";

import type { RecommendedSentence } from "@/entities/sentence";
import { Text } from "@/shared/ui/text";

import { useInfiniteSlider } from "../model/useInfiniteSlider";
import { PlaybackControlChip } from "./PlaybackControlChip";

const AUTO_SCROLL_INTERVAL_MS = 5000;

interface RandomSentenceBannerProps {
  sentences: RecommendedSentence[];
}

export const RandomSentenceBanner = ({ sentences }: RandomSentenceBannerProps) => {
  const { slideIndex, isAnimating, isPaused, togglePause, handleTransitionEnd } = useInfiniteSlider(
    {
      count: sentences.length,
      intervalMs: AUTO_SCROLL_INTERVAL_MS,
    },
  );

  if (sentences.length === 0) {
    return (
      <div className="flex w-full flex-col">
        <div className="h-72.25 overflow-hidden bg-key-secondary">
          <div className="flex w-full shrink-0 flex-col gap-5 p-5">
            <div className="h-31.5" />
            <div className="caption2" />
          </div>
        </div>
        <div className="h-1.5 bg-key-primary-0-1" />
      </div>
    );
  }

  const firstSentence = sentences[0];
  const slides =
    sentences.length > 1 && firstSentence
      ? [
          ...sentences.map((sentence) => ({ ...sentence, slideKey: sentence.id })),
          { ...firstSentence, slideKey: `${firstSentence.id}-clone` },
        ]
      : sentences.map((sentence) => ({ ...sentence, slideKey: sentence.id }));

  const currentPosition = (slideIndex % sentences.length) + 1;

  return (
    <div className="flex w-full flex-col">
      <div className="relative h-72.25 overflow-hidden bg-key-secondary">
        <div
          className="flex"
          style={{
            transform: `translateX(-${slideIndex * 100}%)`,
            transition: isAnimating ? "transform 850ms cubic-bezier(0.22, 1, 0.36, 1)" : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {slides.map((slide) => (
            <div key={slide.slideKey} className="flex w-full shrink-0 flex-col gap-5 p-5">
              <p className="title1-3 line-clamp-3 h-31.5 text-key-secondary2">{slide.quote}</p>
              <Text variant="caption2" color="key-secondary2">
                &#x300E;{slide.bookTitle}&#x300F;, {slide.bookAuthor}
              </Text>
            </div>
          ))}
        </div>
        <PlaybackControlChip
          isPaused={isPaused}
          currentPosition={currentPosition}
          total={sentences.length}
          onToggle={togglePause}
        />
      </div>
      <div className="h-1.5 bg-key-primary-0-1" />
    </div>
  );
};
