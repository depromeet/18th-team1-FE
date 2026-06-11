"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { MOCK_POSTS, type Post, PostAuthorProfile, PostListItem } from "@/entities/post";
import { GenreFilterDropdown, useDiscoverFilter } from "@/features/discover-filter";
import { SearchHistoryList, useSearchHistory } from "@/features/discover-search";
import { BookmarkButton } from "@/features/post-bookmark";
import { PostShareModal } from "@/widgets/post-share-modal";
import { DiscoverSearchResultsHeader } from "./DiscoverSearchResultsHeader";

interface DiscoverSearchResultsProps {
  initialQuery: string;
}

export const DiscoverSearchResults = ({
  initialQuery,
}: DiscoverSearchResultsProps): React.ReactElement => {
  const router = useRouter();
  const [activeSort, setActiveSort] = useState<"latest" | "scrap">("latest");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const { history, addToHistory, removeFromHistory } = useSearchHistory();
  const { selectedGenre, setSelectedGenre } = useDiscoverFilter();

  const handleConfirm = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    addToHistory(trimmed);
    router.push(`/discover?search=${encodeURIComponent(trimmed)}`);
  };

  const handleSelectHistory = (query: string) => {
    addToHistory(query);
    router.push(`/discover?search=${encodeURIComponent(query)}`);
  };

  return (
    <div className="flex h-full flex-col">
      <DiscoverSearchResultsHeader initialQuery={initialQuery} onConfirm={handleConfirm} />

      {/* Content */}
      {initialQuery ? (
        <>
          {/* Sort & Filter */}
          <div className="flex items-center justify-between px-5 py-3">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setActiveSort("latest")}
                className={
                  activeSort === "latest" ? "caption1 text-gray-600" : "caption3 text-gray-300"
                }
              >
                최신순
              </button>
              <button
                type="button"
                onClick={() => setActiveSort("scrap")}
                className={
                  activeSort === "scrap" ? "caption1 text-gray-600" : "caption3 text-gray-300"
                }
              >
                스크랩순
              </button>
            </div>
            <GenreFilterDropdown selectedGenre={selectedGenre} onSelect={setSelectedGenre} />
          </div>

          {/* Post list */}
          <div className="min-h-0 flex-1 overflow-y-auto px-5">
            {MOCK_POSTS.map((post) => (
              <PostListItem key={post.id}>
                <PostListItem.Header>
                  <PostAuthorProfile author={post.author} createdAt={post.createdAt} />
                  <BookmarkButton isBookmarked={post.isBookmarked} onToggle={() => {}} />
                </PostListItem.Header>
                <PostListItem.Body onClick={() => setSelectedPost(post)}>
                  <PostListItem.Content content={post.content} book={post.book} />
                  <PostListItem.Tags
                    emotionTag={post.emotionTag}
                    toneTag={post.toneTag}
                    mood={post.mood}
                  />
                </PostListItem.Body>
              </PostListItem>
            ))}
          </div>

          {selectedPost && (
            <PostShareModal
              post={selectedPost}
              isOpen={true}
              onClose={() => setSelectedPost(null)}
            />
          )}
        </>
      ) : (
        <div className="min-h-0 flex-1 overflow-y-auto">
          <SearchHistoryList
            history={history}
            onSelect={handleSelectHistory}
            onDelete={removeFromHistory}
          />
        </div>
      )}
    </div>
  );
};
