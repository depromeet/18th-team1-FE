"use client";

import type { RecommendedSentence } from "@/entities/sentence";
import { Text } from "@/shared/ui/text";

import { useInfiniteSlider } from "../model/useInfiniteSlider";

const AUTO_SCROLL_INTERVAL_MS = 5000;

interface RandomSentenceBannerProps {
  sentences: RecommendedSentence[];
}

export const RandomSentenceBanner = ({ sentences }: RandomSentenceBannerProps) => {
  const { slideIndex, isAnimating, handleTransitionEnd } = useInfiniteSlider({
    count: sentences.length,
    intervalMs: AUTO_SCROLL_INTERVAL_MS,
  });

  if (sentences.length === 0) {
    return (
      <div className="flex w-full flex-col">
        <div className="overflow-hidden bg-key-secondary">
          <div className="flex w-full shrink-0 flex-col gap-5 p-5">
            <div className="h-22.5" />
            <div className="caption2" />
          </div>
        </div>
        <div className="h-6.25 bg-key-primary" />
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

  return (
    <div className="flex w-full flex-col">
      <div className="overflow-hidden bg-key-secondary">
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
              <Text variant="title2" color="key-secondary2" className="line-clamp-3 h-22.5">
                {slide.quote}
              </Text>
              <Text variant="caption2" color="key-secondary2">
                &#x300E;{slide.bookTitle}&#x300F;, {slide.bookAuthor}
              </Text>
            </div>
          ))}
        </div>
      </div>
      <div className="h-6.25 bg-key-primary" />
    </div>
  );
};
