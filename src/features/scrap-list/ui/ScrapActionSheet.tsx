import Image from "next/image";
import { useState } from "react";

import { cn } from "@/shared/lib/utils";
import { IcBookmark, IcLink, IcShare } from "@/shared/ui/icons";
import { Sheet, SheetContent } from "@/shared/ui/sheet";

interface ScrapActionSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quote: string;
  bookTitle: string;
  author: string;
  coverImageUrl?: string;
}

export const ScrapActionSheet = ({
  open,
  onOpenChange,
  quote,
  bookTitle,
  author,
  coverImageUrl,
}: ScrapActionSheetProps): React.ReactElement => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        showCloseButton={false}
        className="overflow-visible gap-0 rounded-t-[20px] border-0 p-0 md:max-w-93.75 md:mx-auto"
      >
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
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-2"
          >
            <IcLink size={16} className="text-gray-500" />
            <span className="caption2 text-gray-500">책 링크</span>
          </button>
          <button
            type="button"
            className="flex size-8.5 items-center justify-center rounded-full bg-gray-100"
          >
            <IcShare size={30} className="text-gray-500" />
          </button>
          <button
            type="button"
            className="flex size-8.5 items-center justify-center"
            onClick={() => setIsBookmarked((prev) => !prev)}
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
