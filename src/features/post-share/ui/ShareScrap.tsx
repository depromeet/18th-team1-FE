"use client";

import { BookmarkButton } from "@/features/post-bookmark";
import { IcShare2 } from "@/shared/ui/icons";

interface ShareScrapProps {
  isBookmarked: boolean;
  onShare: () => void;
  onToggleBookmark: () => void;
}

export const ShareScrap = ({
  isBookmarked,
  onShare,
  onToggleBookmark,
}: ShareScrapProps): React.ReactElement => (
  <div className="flex items-center gap-3">
    <button
      type="button"
      onClick={onShare}
      aria-label="공유"
      className="flex size-[34px] items-center justify-center"
    >
      <IcShare2 size={28} className="text-gray-100" />
    </button>
    <div className="h-6 w-px bg-gray-100/40" />
    <BookmarkButton
      isBookmarked={isBookmarked}
      onToggle={onToggleBookmark}
      size="medium"
      variant="line"
    />
  </div>
);
