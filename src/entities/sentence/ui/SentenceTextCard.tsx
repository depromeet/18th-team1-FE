import { memo } from "react";

import { Text } from "@/shared/ui/text";

import type { RecommendedSentence } from "../model/sentence.types";

type SentenceTextCardProps = Pick<RecommendedSentence, "quote" | "bookTitle" | "bookAuthor">;

export const SentenceTextCard = memo(
  ({ quote, bookTitle, bookAuthor }: SentenceTextCardProps): React.ReactElement => (
    <div className="flex flex-col gap-2.5">
      <Text variant="title2" color="gray-700">
        {quote}
      </Text>
      <Text variant="caption2" color="gray-500">
        {bookTitle} ･ {bookAuthor}
      </Text>
    </div>
  ),
);
