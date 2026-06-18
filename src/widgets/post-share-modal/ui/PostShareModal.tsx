"use client";

import { format } from "date-fns";
import { useState } from "react";
import { type Post, PostAuthorProfile, PostShareCard } from "@/entities/post";
import { ShareScrap } from "@/features/post-share";
import { SentenceShareCardDrawer } from "@/features/sentence-share";

interface PostShareModalProps {
  post: Post;
  isOpen: boolean;
  onClose: () => void;
  onToggleBookmark?: (currentIsBookmarked: boolean) => void;
}

export const PostShareModal = ({
  post,
  isOpen,
  onClose,
  onToggleBookmark,
}: PostShareModalProps): React.ReactElement => {
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked);
  const [isShareDrawerOpen, setIsShareDrawerOpen] = useState(false);

  const handleShare = (): void => {
    setIsShareDrawerOpen(true);
  };

  const handleToggleBookmark = () => {
    onToggleBookmark?.(isBookmarked);
    setIsBookmarked((prev) => !prev);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-[rgba(9,9,9,0.94)]">
          {/* Backdrop — tap to close */}
          <button type="button" className="absolute inset-0" onClick={onClose} aria-label="닫기" />

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-5">
            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-col gap-5">
                <PostAuthorProfile
                  author={post.author}
                  createdAt={post.createdAt}
                  variant="light"
                />
                <PostShareCard post={post} />
              </div>

              {/* Mood & tone tags */}
              <div className="flex flex-wrap justify-center gap-x-2 gap-y-6">
                {post.toneTag && (
                  <span className="caption2 rounded-[30px] bg-gray-600 px-2 py-1 text-white">
                    {post.toneTag}
                  </span>
                )}
                {post.emotionTag && (
                  <span className="caption2 rounded-[30px] bg-gray-600 px-2 py-1 text-white">
                    {post.emotionTag}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action bar */}
          <div className="absolute bottom-14 left-1/2 -translate-x-1/2">
            <ShareScrap
              isBookmarked={isBookmarked}
              onShare={handleShare}
              onToggleBookmark={handleToggleBookmark}
            />
          </div>
        </div>
      )}
      <SentenceShareCardDrawer
        isOpen={isShareDrawerOpen}
        shareType="sentence-pick"
        date={format(new Date(), "yyyy-MM-dd")}
        sentencePickData={{
          quote: post.content,
          title: post.book.title,
          author: post.book.author,
        }}
        onClose={() => setIsShareDrawerOpen(false)}
      />
    </>
  );
};
