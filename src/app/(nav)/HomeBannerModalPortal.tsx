"use client";

import type { Post } from "@/entities/post";
import { useScrapMutation } from "@/features/post-bookmark";
import { useHomeBannerModalStore } from "@/store/home-banner-modal/useHomeBannerModalStore";
import { PostShareModal } from "@/widgets/post-share-modal";

export const HomeBannerModalPortal = () => {
  const { selectedSentence, closeModal } = useHomeBannerModalStore();
  const { toggle } = useScrapMutation();

  if (!selectedSentence) return null;

  const post: Post = {
    id: selectedSentence.id,
    author: { id: "", nickname: "" },
    content: selectedSentence.quote,
    book: {
      title: selectedSentence.bookTitle,
      author: selectedSentence.bookAuthor,
      coverImageUrl: selectedSentence.coverImageUrl,
    },
    date: `${new Date().getDate()}, ${new Date().toLocaleDateString("en-US", { weekday: "long" })}`,
    mood: "good",
    emotionTag: "",
    toneTag: "",
    isBookmarked: false,
    createdAt: "",
  };

  return (
    <PostShareModal
      post={post}
      isOpen={true}
      onClose={closeModal}
      onToggleBookmark={(currentIsBookmarked) =>
        toggle(Number(selectedSentence.id), currentIsBookmarked)
      }
    />
  );
};
