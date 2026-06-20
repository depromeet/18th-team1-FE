"use client";

import { format } from "date-fns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { type RecommendationListItem, useDeleteDiaryMutation } from "@/entities/diary";
import {
  CalendarShareCardDrawer,
  CalendarShareDateDrawer,
  CalendarShareTypeSheet,
  type ShareType,
  useCalendarShareFlow,
} from "@/features/calendar-share";
import { CalendarBoard, useCalendar, useMonthSwipe } from "@/features/calendar-view";
import { DiaryDeleteModal } from "@/features/diary-actions";
import { useEmotionNavigation } from "@/features/emotion-select";
import { MonthPicker } from "@/features/month-picker";
import { useSentenceShareCardDrawer } from "@/features/sentence-share";
import { ConfirmModal } from "@/shared/ui/confirm-modal";
import { IcMonthBack, IcMonthNext, IcShare } from "@/shared/ui/icons";
import { OptionTab } from "@/shared/ui/option-tab";
import { useEmotionSelectStore } from "@/store/emotion-select/useEmotionSelectStore";
import { useCalendarWidget } from "../model/useCalendarWidget";

interface CalendarWidgetProps {
  onDateSelect?: () => void;
}

export const CalendarWidget = ({ onDateSelect }: CalendarWidgetProps) => {
  const { viewDate, setSelectedDate, days, handlePrev, handleNext, navigateToMonth } =
    useCalendar();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const viewTab = searchParams.get("tab") === "cover" ? "cover" : "emotion";
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const { step, openTypeSheet, selectType, close } = useCalendarShareFlow();
  const { navigateToEmotion } = useEmotionNavigation();
  const { selectedQuote } = useEmotionSelectStore();
  const { openSentenceShareCardDrawer } = useSentenceShareCardDrawer();
  const [isNoSentenceModalOpen, setIsNoSentenceModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const { mutate: deleteDiary } = useDeleteDiaryMutation();

  const handleShareSentence = (diary: RecommendationListItem): void => {
    openSentenceShareCardDrawer({
      shareType: "sentence-pick",
      date: diary.recommendationDate,
      sentencePickData: {
        quote: diary.quote.content,
        title: diary.quote.title,
        author: diary.quote.author,
        coverImageUrl: diary.quote.image,
      },
    });
  };

  const handleConfirmDelete = (): void => {
    if (deleteTargetId === null) return;
    deleteDiary(deleteTargetId, { onSuccess: () => setDeleteTargetId(null) });
  };

  // 캘린더 공유 플로우의 card-drawer 단계 도달 시 전역 드로어로 위임
  useEffect(() => {
    if (step.type === "card-drawer" && step.shareType !== "calendar") {
      openSentenceShareCardDrawer({
        shareType: step.shareType as "today-sentence" | "sentence-pick",
        date: step.date,
        sentencePickData: step.sentenceData,
      });
      close();
    }
  }, [step, openSentenceShareCardDrawer, close]);

  const handleSelectType = (shareType: ShareType): void => {
    if (shareType === "today-sentence" && !selectedQuote) {
      setIsNoSentenceModalOpen(true);
      return;
    }
    selectType(shareType);
  };

  const handleConfirmGoToEmotion = async (): Promise<void> => {
    close();
    await navigateToEmotion();
  };

  const {
    diaryIntensitiesByDate,
    diaryCoverByDate,
    isPrevDisabled,
    isNextDisabled,
    minYear,
    minMonth,
  } = useCalendarWidget(viewDate);

  const { handlePointerDown, handlePointerUp } = useMonthSwipe({
    onSwipeLeft: handleNext,
    onSwipeRight: handlePrev,
    isPrevDisabled,
    isNextDisabled,
  });

  return (
    <>
      <div className="flex w-full flex-col gap-4">
        <div className="flex items-center gap-2 px-5">
          <button
            type="button"
            onClick={handlePrev}
            disabled={isPrevDisabled}
            className="disabled:cursor-default"
          >
            <IcMonthBack size={24} className={isPrevDisabled ? "text-gray-200" : "text-gray-300"} />
          </button>
          <button type="button" onClick={() => setIsPickerOpen(true)}>
            <span className="subhead1 text-gray-700">{format(viewDate, "yyyy.MM")}</span>
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={isNextDisabled}
            className="disabled:cursor-default"
          >
            <IcMonthNext size={24} className={isNextDisabled ? "text-gray-200" : "text-gray-300"} />
          </button>
        </div>
        <div className="flex items-center justify-between px-5">
          <OptionTab
            options={[
              { value: "emotion", label: "감정 색" },
              { value: "cover", label: "책 표지" },
            ]}
            value={viewTab}
            onChange={(v) => {
              const nextSearchParams = new URLSearchParams(searchParams.toString());
              nextSearchParams.set("tab", v);
              router.replace(`${pathname}?${nextSearchParams.toString()}`);
            }}
          />
          <button
            type="button"
            className="flex size-8.5 items-center justify-center rounded-full bg-muted"
            onClick={openTypeSheet}
          >
            <IcShare size={34} className="text-gray-500" />
          </button>
        </div>
        <CalendarBoard
          days={days}
          viewDate={viewDate}
          onSelectDate={(date) => {
            setSelectedDate(date);
            onDateSelect?.();
          }}
          diaryIntensitiesByDate={diaryIntensitiesByDate}
          diaryCoverByDate={diaryCoverByDate}
          viewTab={viewTab}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        />
      </div>

      <MonthPicker
        isOpen={isPickerOpen}
        selectedValue={format(viewDate, "yyyy-MM")}
        minYear={minYear}
        minMonth={minMonth}
        onClose={() => setIsPickerOpen(false)}
        onChange={(dateStr) => {
          const [year, month] = dateStr.split("-").map(Number) as [number, number];
          navigateToMonth(year, month);
        }}
      />

      <CalendarShareTypeSheet
        isOpen={step.type === "type-sheet"}
        onSelect={handleSelectType}
        onClose={close}
      />

      <CalendarShareDateDrawer
        isOpen={step.type === "date-drawer"}
        onClose={close}
        onShareSentence={handleShareSentence}
        onDeleteSentence={setDeleteTargetId}
      />

      <CalendarShareCardDrawer
        isOpen={step.type === "card-drawer" && step.shareType === "calendar"}
        year={viewDate.getFullYear()}
        month={viewDate.getMonth() + 1}
        onClose={close}
      />

      <DiaryDeleteModal
        isOpen={deleteTargetId !== null}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteTargetId(null)}
      />

      <ConfirmModal
        open={isNoSentenceModalOpen}
        onOpenChange={setIsNoSentenceModalOpen}
        description={
          <>
            아직 오늘의 문장이 없어요.
            <br />
            바로 추천 받으러 갈까요?
          </>
        }
        confirmLabel="확인"
        cancelLabel="취소"
        onConfirm={handleConfirmGoToEmotion}
      />
    </>
  );
};
