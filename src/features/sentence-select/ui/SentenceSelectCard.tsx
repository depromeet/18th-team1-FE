"use client";

import { cn } from "@/shared/lib/utils";
import { Text } from "@/shared/ui/text";

interface SentenceSelectCardProps {
  quote: string;
  bookTitle: string;
  bookAuthor: string;
  isSelected: boolean;
  onClick: () => void;
}

export const SentenceSelectCard = ({
  quote,
  bookTitle,
  bookAuthor,
  isSelected,
  onClick,
}: SentenceSelectCardProps) => (
  <button
    type="button"
    className={cn(
      "w-full overflow-hidden rounded-2xl bg-background text-left",
      !isSelected && "flex h-37.5 flex-col items-start justify-center px-4 py-5.5",
    )}
    onClick={onClick}
  >
    {isSelected ? (
      <div className="overflow-hidden rounded-lg">
        <div className="flex h-11 flex-col items-start bg-key-secondary pl-4 pr-2.5 py-2.5">
          <div className="flex w-full items-center">
            <Text as="span" variant="point3" color="gray-0" className="flex-1">
              Today&apos;s text
            </Text>
          </div>
        </div>
        <div className="flex h-37.5 flex-col items-start justify-center gap-4 bg-background px-4 py-5.5">
          <Text variant="body1" color="gray-500" className="w-full whitespace-pre-wrap">
            {quote}
          </Text>
          <Text variant="caption2" color="gray-300">
            {bookTitle}, {bookAuthor}
          </Text>
        </div>
      </div>
    ) : (
      <div className="flex w-full flex-col items-start gap-4">
        <Text variant="body1" color="gray-500" className="w-full whitespace-pre-wrap">
          {quote}
        </Text>
        <Text variant="caption2" color="gray-300">
          {bookTitle}, {bookAuthor}
        </Text>
      </div>
    )}
  </button>
);
