"use client";

import { useRouter } from "next/navigation";

import type { RecommendedSentence } from "@/entities/sentence";
import { SentenceTextCard } from "@/entities/sentence";
import { CheckButton, Header } from "@/widgets/header";

import { useDiaryWrite } from "../model/useDiaryWrite";
import { usePhotoSelect } from "../model/usePhotoSelect";
import { DiaryTextInput } from "./DiaryTextInput";
import { PhotoBar } from "./PhotoBar";

interface DiaryWriteViewProps {
  sentence: RecommendedSentence;
}

export const DiaryWriteView = ({ sentence }: DiaryWriteViewProps): React.ReactElement => {
  const router = useRouter();
  const { text, handleTextChange } = useDiaryWrite();
  const { photoUrl, inputRef, handleClick, handleDelete, handleFileChange } = usePhotoSelect();

  const handleSubmit = (): void => {
    // TODO: useCreateDiaryMutation 연동 후 실제 id로 교체
    router.push("/diary/complete/1");
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="shrink-0">
        <Header title="일기" right={<CheckButton isChecked={true} onClick={handleSubmit} />} />
      </div>
      <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-5 pt-1.75">
        <SentenceTextCard
          quote={sentence.quote}
          bookTitle={sentence.bookTitle}
          bookAuthor={sentence.bookAuthor}
        />
        <DiaryTextInput value={text} onChange={handleTextChange} />
      </div>
      <PhotoBar
        photoUrl={photoUrl}
        inputRef={inputRef}
        onAdd={handleClick}
        onDelete={handleDelete}
        onFileChange={handleFileChange}
      />
    </div>
  );
};
