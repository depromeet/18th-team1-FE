"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { TagChip } from "@/entities/emotion-tag";
import type { SentenceTag } from "@/entities/sentence";
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
  tags: SentenceTag[];
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
  const visibleTags = tags.slice(0, MAX_VISIBLE_TAGS);
  const overflowCount = Math.max(0, tags.length - MAX_VISIBLE_TAGS);

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
        />
      </motion.div>

      {/* Tags */}
      <motion.div
        className="mt-6.5 flex flex-wrap justify-center gap-x-2 gap-y-6 px-5"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...ENTER, delay: 0.26 }}
      >
        {visibleTags.map((tag) => (
          <TagChip key={tag.id} label={tag.label} variant="dim" />
        ))}
        {overflowCount > 0 && (
          <div className="flex size-10.25 items-center justify-center rounded-full bg-[#898989]">
            <IcPlusCount width={13.3} height={16.62} className="text-gray-0" />
            <span className="point2 relative -top-[1.5px] text-gray-0">{overflowCount}</span>
          </div>
        )}
      </motion.div>

      <div className="flex-1" />

      {/* Button bar */}
      <motion.div
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
