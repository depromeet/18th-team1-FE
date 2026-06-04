import { cn } from "@/shared/lib/utils";
import { Text } from "@/shared/ui/text";

import type { RecommendedSentence } from "../model/sentence.types";

interface SentenceListCardProps {
  sentence: RecommendedSentence;
  isSelected: boolean;
  onClick: () => void;
}

export const SentenceListCard = ({ sentence, isSelected, onClick }: SentenceListCardProps) => (
  <button
    type="button"
    aria-pressed={isSelected}
    onClick={onClick}
    className={cn(
      "flex w-full flex-col items-start rounded-[4px] p-5 text-left",
      isSelected ? "border-r-16 border-key-primary bg-key-secondary" : "bg-gray-50",
    )}
  >
    <div className="flex w-full flex-col gap-4.75">
      <div className="flex flex-col">
        <Text
          variant={isSelected ? "subhead5" : "subhead6"}
          color={isSelected ? "key-secondary2" : "gray-600"}
        >
          {sentence.bookTitle}
        </Text>
        <Text
          as="span"
          variant={isSelected ? "caption1" : "caption2"}
          color={isSelected ? "key-secondary2" : "gray-400"}
          className={cn(isSelected && "opacity-80")}
        >
          {sentence.bookAuthor}
        </Text>
      </div>
      <Text
        variant={isSelected ? "title2" : "subhead2"}
        color={isSelected ? "key-secondary2" : "gray-700"}
      >
        {sentence.quote}
      </Text>
    </div>
  </button>
);
