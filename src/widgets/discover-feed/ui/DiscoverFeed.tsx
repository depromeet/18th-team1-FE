"use client";

import { useState } from "react";
import { MOCK_POSTS, type Post, PostAuthorProfile, PostListItem } from "@/entities/post";
import { GenreFilterChips, useDiscoverFilter } from "@/features/discover-filter";
import { DiscoverSearchBar, useDiscoverSearch } from "@/features/discover-search";
import { BookmarkButton } from "@/features/post-bookmark";
import { PostShareModal } from "@/widgets/post-share-modal";

export const DiscoverFeed = (): React.ReactElement => {
  const { selectedGenre, setSelectedGenre } = useDiscoverFilter();
  const { navigateToSearch } = useDiscoverSearch();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="bg-key-point-50">
        <div className="px-5 pt-15">
          <DiscoverSearchBar onSubmit={(query) => navigateToSearch(query)} />
        </div>
        <GenreFilterChips selected={selectedGenre} onChange={setSelectedGenre} />
      </div>

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
        <PostShareModal post={selectedPost} isOpen={true} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  );
};
