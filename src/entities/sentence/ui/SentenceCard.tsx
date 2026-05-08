"use client";

import { useLongPress } from "@/shared/hooks/useLongPress";
import { Text } from "@/shared/ui/text";

import type { RecommendedSentence } from "../model/sentence.types";

type SentenceCardProps = Omit<RecommendedSentence, "id">;

export const SentenceCard = ({
  bookTitle,
  bookAuthor,
  quote,
  date,
}: SentenceCardProps): React.ReactElement => {
  const longPressHandlers = useLongPress(() => {
    navigator.clipboard.writeText(quote);
  });

  return (
    <div className="flex flex-col gap-7.5 px-5 pt-14.25">
      {date && (
        <Text variant="subhead6" color="key-secondary2">
          {date}
        </Text>
      )}
      <div className="flex flex-col gap-4.5">
        <Text
          variant="title1-2"
          color="gray-700"
          className="cursor-copy select-none"
          {...longPressHandlers}
        >
          {quote}
        </Text>
        <div className="flex flex-col gap-1">
          <Text variant="subhead6" color="gray-600">
            {bookTitle}
          </Text>
          <Text variant="body3" color="gray-400">
            {bookAuthor}
          </Text>
        </div>
      </div>
    </div>
  );
};
