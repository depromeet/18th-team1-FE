"use client";

import { useState } from "react";
import { type Post, PostAuthorProfile, PostShareCard } from "@/entities/post";
import { ShareScrap } from "@/features/post-share";

interface PostShareModalProps {
  post: Post;
  isOpen: boolean;
  onClose: () => void;
}

export const PostShareModal = ({
  post,
  isOpen,
  onClose,
}: PostShareModalProps): React.ReactElement | null => {
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked);

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      await navigator.share({ text: post.content }).catch(() => {});
    } else {
      await navigator.clipboard.writeText(post.content).catch(() => {});
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[rgba(9,9,9,0.94)]">
      {/* Backdrop — tap to close */}
      <button type="button" className="absolute inset-0" onClick={onClose} aria-label="닫기" />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-5">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col gap-5">
            <PostAuthorProfile author={post.author} createdAt={post.createdAt} variant="light" />
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
          onToggleBookmark={() => setIsBookmarked((prev) => !prev)}
        />
      </div>
    </div>
  );
};
