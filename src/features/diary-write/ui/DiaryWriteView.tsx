"use client";

import { useRouter } from "next/navigation";

import { SentenceTextCard } from "@/entities/sentence";
import { useDiaryEmotionStore } from "@/store/diary-emotion/useDiaryEmotionStore";
import { CheckButton, Header } from "@/widgets/header";

import { useCreateDiaryMutation } from "../api/mutations";
import { useDiaryWrite } from "../model/useDiaryWrite";
import { usePhotoSelect } from "../model/usePhotoSelect";
import { DiaryTextInput } from "./DiaryTextInput";
import { PhotoBar } from "./PhotoBar";

export const DiaryWriteView = (): React.ReactElement | null => {
  const router = useRouter();
  const { selectedQuote } = useDiaryEmotionStore();
  const { text, handleTextChange } = useDiaryWrite();
  const { photoUrl, photoFile, inputRef, handleClick, handleDelete, handleFileChange } =
    usePhotoSelect();
  const { mutate, isPending } = useCreateDiaryMutation();

  if (!selectedQuote) return null;

  const handleSubmit = (): void => {
    mutate(
      { quoteId: selectedQuote.quoteId, content: text || null, photoFile },
      {
        onSuccess: (diaryId: number) => router.push(`/diary/complete?diaryId=${diaryId}`),
        onError: () => alert("일기 저장에 실패했어요. 다시 시도해주세요."),
      },
    );
  };

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <div className="shrink-0">
        <Header
          title="일기"
          right={<CheckButton isChecked={!isPending} onClick={handleSubmit} />}
        />
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-x-hidden overflow-y-auto px-5 pt-1.75 pb-24">
        <SentenceTextCard
          quote={selectedQuote.content}
          bookTitle={selectedQuote.title}
          bookAuthor={selectedQuote.author}
        />
        <DiaryTextInput value={text} onChange={handleTextChange} />
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 px-5"
        style={{ paddingBottom: "max(env(safe-area-inset-bottom), 14px)" }}
      >
        <PhotoBar
          photoUrl={photoUrl}
          inputRef={inputRef}
          onAdd={handleClick}
          onDelete={handleDelete}
          onFileChange={handleFileChange}
        />
      </div>
    </div>
  );
};
