"use client";

import { useRouter } from "next/navigation";

import { TodaysSentenceCard } from "@/entities/sentence";
import { NewButton } from "@/shared/ui/new-button";
import { Text } from "@/shared/ui/text";

const today = new Date();
const MOCK_QUOTE = {
  date: `${today.getDate()}, ${today.toLocaleDateString("en-US", { weekday: "long" })}`,
  quote: "세상에는 두 종류의 고통이 있다.\n너를 아프게 하는 고통과 너를 변하게하는 고통",
  bookTitle: "『아픔이 길이 되려면』",
  bookAuthor: "김승섭",
};

export const SentenceDetailView = (): React.ReactElement => {
  const router = useRouter();

  const handleNext = (): void => {
    router.push("/sentence/share");
  };

  const handleViewList = (): void => {
    router.push("/sentence/list");
  };

  return (
    <div className="flex h-full flex-col bg-muted">
      <div className="flex flex-1 flex-col items-center">
        <Text variant="point-eng" color="gray-500" className="text-center">
          Today<span className="font-pretendard font-semibold">&apos;</span>s Text
        </Text>
        <div className="flex flex-1 items-center justify-center">
          <TodaysSentenceCard
            date={MOCK_QUOTE.date}
            quote={MOCK_QUOTE.quote}
            bookTitle={MOCK_QUOTE.bookTitle}
            bookAuthor={MOCK_QUOTE.bookAuthor}
          />
        </div>
      </div>
      <section className="flex shrink-0 flex-col items-center gap-2">
        <NewButton variant="secondary" label="다른 문장 더보기" onClick={handleViewList} />
        <NewButton label="다음" onClick={handleNext} />
      </section>
    </div>
  );
};
