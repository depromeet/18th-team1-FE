"use client";

import { useRouter } from "next/navigation";

import type { RecommendedSentence } from "@/entities/sentence";
import { SentenceListCard } from "@/entities/sentence";
import { Button } from "@/shared/ui/button";
import { DoubleButton } from "@/shared/ui/double-button";

import { useSentenceList } from "../model/useSentenceList";

interface SentenceListViewProps {
  initialSentenceId: string;
  sentences: RecommendedSentence[];
}

export const SentenceListView = ({
  initialSentenceId,
  sentences,
}: SentenceListViewProps): React.ReactElement => {
  const router = useRouter();
  const { visibleSentences, selectedId, canLoadMore, handleSelect, handleLoadMore } =
    useSentenceList(initialSentenceId, sentences);

  const handleNext = (): void => {
    router.push(`/diary/write?sentenceId=${selectedId}`);
  };

  const handleSelectItem = (id: string): void => {
    handleSelect(id);
    router.replace(`/diary/sentence/${id}/list`);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto px-5 pt-4.5 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex flex-col gap-3.5">
          {visibleSentences.map((sentence) => (
            <SentenceListCard
              key={sentence.id}
              sentence={sentence}
              isSelected={sentence.id === selectedId}
              onClick={() => handleSelectItem(sentence.id)}
            />
          ))}
        </div>
      </div>
      <section className="shrink-0 bg-gray-0 px-5 pb-8">
        {canLoadMore ? (
          <DoubleButton
            secondaryLabel="문장 더 불러오기"
            primaryLabel="다음"
            onSecondaryClick={handleLoadMore}
            onPrimaryClick={handleNext}
          />
        ) : (
          <Button label="이 문장으로 일기 쓰기" onClick={handleNext} />
        )}
      </section>
    </div>
  );
};
