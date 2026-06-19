"use client";

import { motion } from "framer-motion";
import { type ReactNode, useLayoutEffect, useRef, useState } from "react";

import { TagChip } from "@/entities/emotion-tag";
import type { TagDto } from "@/entities/sentence";
import { TodaysSentenceCard } from "@/entities/sentence";
import { IcPlusCount } from "@/shared/ui/icons";
import { NewDoubleButton } from "@/shared/ui/new-double-button";
import { Text } from "@/shared/ui/text";

interface ButtonConfig {
  label: string;
  icon?: ReactNode;
  isMuted?: boolean;
  onClick: () => void;
}

interface SentenceCardPhaseProps {
  header: ReactNode;
  month: string;
  date: string;
  quote: string;
  bookTitle: string;
  bookAuthor: string;
  bookCoverImage?: string;
  tags: TagDto[];
  leftButton: ButtonConfig;
  rightButton: ButtonConfig;
}

const ENTER = { duration: 0.45, ease: [0.0, 0.0, 0.2, 1] as const };
const MAX_VISIBLE_TAGS = 2;

export const SentenceCardPhase = ({
  header,
  month,
  date,
  quote,
  bookTitle,
  bookAuthor,
  bookCoverImage,
  tags,
  leftButton,
  rightButton,
}: SentenceCardPhaseProps): React.ReactElement => {
  const emotionTags = tags.filter((tag) => tag.type === "EMOTION");
  const visibleTags = emotionTags.slice(0, MAX_VISIBLE_TAGS);
  const overflowCount = Math.max(0, emotionTags.length - MAX_VISIBLE_TAGS);

  const containerRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const [isWrapped, setIsWrapped] = useState(false);
  const [tagsLeftOffset, setTagsLeftOffset] = useState(0);

  const BubbleSize = 41; // size-10.25 = 10.25 * 4px
  const ChipGap = 8; // gap-x-2 = 8px

  useLayoutEffect(() => {
    if (!overflowCount) return;

    const update = () => {
      const container = containerRef.current;
      const tagsElement = tagsRef.current;
      if (!container || !tagsElement) return;

      const containerWidth = container.offsetWidth;
      const tagsWidth = tagsElement.offsetWidth;

      const shouldWrap = tagsWidth + ChipGap + BubbleSize > containerWidth;
      setIsWrapped(shouldWrap);
      if (shouldWrap) {
        setTagsLeftOffset((containerWidth - tagsWidth) / 2);
      }
    };

    update();
    const observer = new ResizeObserver(update);
    if (containerRef.current) observer.observe(containerRef.current);
    if (tagsRef.current) observer.observe(tagsRef.current);
    return () => observer.disconnect();
  }, [overflowCount]);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ duration: 0.1 }}
    >
      {header}

      {/* Month: layoutId handles shared-element transition from DatePhase */}
      {/* top = header(60px) + original offset(34.5px) = 94.5px */}
      <motion.div
        layoutId="sentence-share-month"
        className="pointer-events-none absolute left-1/2 top-[94.5px] z-0 -translate-x-1/2"
        transition={ENTER}
      >
        <span
          className="block capitalize whitespace-nowrap bg-clip-text font-gt-pressura text-[4.375rem] font-bold leading-[1.2] tracking-[-0.175rem] text-transparent"
          style={{
            backgroundImage: "linear-gradient(0deg, #8a8a8a 0%, #242424 100%)",
          }}
        >
          {month}
        </span>
      </motion.div>

      {/* Scrollable content — Month stays absolute above, button stays absolute below */}
      <div className="min-h-0 flex-1 overflow-y-auto pb-16 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* Today's Text */}
        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...ENTER, delay: 0.12 }}
        >
          <Text as="span" variant="point-eng" color="gray-300">
            Today<span className="font-pretendard font-semibold">&apos;</span>s Text
          </Text>
        </motion.div>

        {/* Sentence card — centered */}
        <motion.div
          className="relative z-10 mt-15.75 flex justify-center"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...ENTER, delay: 0.18 }}
        >
          <TodaysSentenceCard
            date={date}
            quote={quote}
            bookTitle={bookTitle}
            bookAuthor={bookAuthor}
            bookCoverImage={bookCoverImage}
            animateWords
          />
        </motion.div>

        {/* Tags */}
        <motion.div
          className="mt-6.5 flex justify-center px-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...ENTER, delay: 0.26 }}
        >
          <div ref={containerRef} className="w-full">
            <div className="flex justify-center gap-x-2">
              <div ref={tagsRef} className="flex flex-nowrap gap-x-2">
                {visibleTags.map((tag) => (
                  <TagChip key={tag.id} label={tag.label} variant="dim" />
                ))}
              </div>
              {overflowCount > 0 && !isWrapped && (
                <div className="flex size-10.25 items-center justify-center rounded-full bg-[#898989]">
                  <IcPlusCount width={13.3} height={16.62} className="text-gray-0" />
                  <span className="point2 relative -top-[1.5px] text-gray-0">{overflowCount}</span>
                </div>
              )}
            </div>
            {overflowCount > 0 && isWrapped && (
              <div
                className="mt-2 flex size-10.25 items-center justify-center rounded-full bg-[#898989]"
                style={{ marginLeft: tagsLeftOffset }}
              >
                <IcPlusCount width={13.3} height={16.62} className="text-gray-0" />
                <span className="point2 relative -top-[1.5px] text-gray-0">{overflowCount}</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Button bar — absolute bottom so it's always visible regardless of screen height */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-10 bg-gray-700"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...ENTER, delay: 0.32 }}
      >
        <NewDoubleButton
          left={{
            label: leftButton.label,
            leftIcon: leftButton.icon,
            isMuted: leftButton.isMuted,
            onClick: leftButton.onClick,
          }}
          right={{
            label: rightButton.label,
            leftIcon: rightButton.icon,
            onClick: rightButton.onClick,
          }}
        />
      </motion.div>
    </motion.div>
  );
};
