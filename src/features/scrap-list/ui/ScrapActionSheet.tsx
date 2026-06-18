"use client";

import { format } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";

import { useSentenceShareCardDrawer } from "@/features/sentence-share";
import { cn } from "@/shared/lib/utils";
import { IcBookmark, IcLink, IcShare } from "@/shared/ui/icons";
import { Sheet, SheetContent, SheetTitle } from "@/shared/ui/sheet";

import { useScrapMutation, useUnscrapMutation } from "../api/queries";

interface ScrapActionSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quoteId: number;
  quote: string;
  bookTitle: string;
  author: string;
  coverImageUrl?: string;
  bookPurchaseLink: string;
}

export const ScrapActionSheet = ({
  open,
  onOpenChange,
  quoteId,
  quote,
  bookTitle,
  author,
  coverImageUrl,
  bookPurchaseLink,
}: ScrapActionSheetProps): React.ReactElement => {
  const [isBookmarked, setIsBookmarked] = useState(true);
  // 시트 닫힘 애니메이션 완료 후 드로어를 열기 위한 플래그
  const [pendingShare, setPendingShare] = useState(false);
  // 시트 닫히면 부모가 activeItem을 null로 초기화하므로, 공유 데이터를 미리 캡처해둠
  const [capturedShareData, setCapturedShareData] = useState<{
    quote: string;
    title: string;
    author: string;
    coverImageUrl?: string;
  } | null>(null);
  const { mutateAsync: scrapAsync } = useScrapMutation();
  const { mutateAsync: unscrapAsync } = useUnscrapMutation();
  const { openSentenceShareCardDrawer } = useSentenceShareCardDrawer();

  useEffect(() => {
    if (open) setIsBookmarked(true);
  }, [open]);

  // 시트가 완전히 닫힌 후 pendingShare가 true면 드로어 열기
  useEffect(() => {
    if (!open && pendingShare && capturedShareData) {
      openSentenceShareCardDrawer({
        shareType: "sentence-pick",
        date: format(new Date(), "yyyy-MM-dd"),
        sentencePickData: capturedShareData,
      });
      setPendingShare(false);
      setCapturedShareData(null);
    }
  }, [open, pendingShare, capturedShareData, openSentenceShareCardDrawer]);

  const handleBookmarkToggle = async () => {
    if (isBookmarked) {
      await unscrapAsync(quoteId);
    } else {
      await scrapAsync(quoteId);
    }
    setIsBookmarked((prev) => !prev);
  };

  const handleShare = (): void => {
    setCapturedShareData({ quote, title: bookTitle, author, coverImageUrl });
    setPendingShare(true);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        showCloseButton={false}
        className="overflow-visible gap-0 rounded-t-[20px] border-0 p-0 md:max-w-93.75 md:mx-auto"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <SheetTitle className="sr-only">{bookTitle}</SheetTitle>
        {/* 책 표지 — 버튼 하단(54px)에 맞춰 위로 돌출 */}
        <div className="absolute -top-37 left-8 h-50.5 w-32 overflow-hidden rounded-lg">
          {coverImageUrl ? (
            <Image src={coverImageUrl} alt={bookTitle} fill className="object-cover" />
          ) : (
            <div className="size-full bg-gray-100" />
          )}
        </div>

        {/* 액션 버튼 — 오른쪽 정렬 */}
        <div className="flex items-center justify-end gap-2 pl-47.5 pr-5 pt-5 pb-2.5">
          <a
            href={bookPurchaseLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-2"
          >
            <IcLink size={16} className="text-gray-500" />
            <span className="caption2 text-gray-500">책 링크</span>
          </a>
          <button
            type="button"
            aria-label="공유"
            onClick={handleShare}
            className="flex size-8.5 items-center justify-center rounded-full bg-gray-100"
          >
            <IcShare size={30} className="text-gray-500" />
          </button>
          <button
            type="button"
            aria-label="북마크"
            aria-pressed={isBookmarked}
            className="flex size-8.5 items-center justify-center"
            onClick={handleBookmarkToggle}
          >
            <IcBookmark
              size={34}
              className={cn(isBookmarked ? "text-gray-600" : "text-gray-200")}
            />
          </button>
        </div>

        {/* 텍스트 */}
        <div className="flex flex-col gap-3 px-5 pt-5 pb-12">
          <p className="subhead4 text-gray-700">{quote}</p>
          <p className="caption2 text-gray-600">{`『${bookTitle}』, ${author}`}</p>
        </div>
      </SheetContent>
    </Sheet>
  );
};
