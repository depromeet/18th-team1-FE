"use client";

import { useCallback, useState } from "react";
import {
  type DiscoveryQuoteDto,
  PostAuthorProfile,
  PostListItem,
  useDiscoveryFeedQuery,
} from "@/entities/post";
import { GenreFilterChips, useDiscoverFilter } from "@/features/discover-filter";
import { DiscoverSearchBar, useDiscoverSearch } from "@/features/discover-search";
import { BookmarkButton, useScrapMutation } from "@/features/post-bookmark";
import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";
import { PostShareModal } from "@/widgets/post-share-modal";

const getMood = (emotionValue: number) => {
  if (emotionValue >= 7) return "good" as const;
  if (emotionValue >= 4) return "mid" as const;
  return "bad" as const;
};

const formatRelativeTime = (isoString: string): string => {
  const diff = Date.now() - new Date(isoString).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "방금 전";
  if (minutes < 60) return `${minutes}분 전`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}시간 전`;
  const days = Math.floor(hours / 24);
  return `${days}일 전`;
};

export const DiscoverFeed = (): React.ReactElement => {
  const { selectedGenre, setSelectedGenre } = useDiscoverFilter();
  const { navigateToSearch } = useDiscoverSearch();
  const [selectedQuote, setSelectedQuote] = useState<DiscoveryQuoteDto | null>(null);

  const genre = selectedGenre === "모든 장르" ? undefined : selectedGenre;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useDiscoveryFeedQuery(genre);

  const { toggle } = useScrapMutation();

  const handleFetchNext = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const sentinelRef = useInfiniteScroll(handleFetchNext);

  const quotes = data?.pages.flatMap((page) => page.quotes) ?? [];

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="bg-key-point-50">
        <div className="px-5 pt-15">
          <DiscoverSearchBar onSubmit={(query) => navigateToSearch(query)} />
        </div>
        <GenreFilterChips selected={selectedGenre} onChange={setSelectedGenre} />
      </div>

      <div ref={sentinelRef} className="min-h-0 flex-1 overflow-y-auto px-5">
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <span className="caption1 text-gray-300">불러오는 중...</span>
          </div>
        )}

        {!isLoading &&
          quotes.map((quote) => (
            <PostListItem key={quote.quoteId}>
              <PostListItem.Header>
                <PostAuthorProfile
                  author={{
                    id: String(quote.recommendedUserId),
                    nickname: quote.recommendedUserNickname,
                  }}
                  createdAt={formatRelativeTime(quote.recommendedAt)}
                />
                <BookmarkButton
                  isBookmarked={quote.isScrapped}
                  onToggle={() => toggle(quote.quoteId, quote.isScrapped)}
                />
              </PostListItem.Header>
              <PostListItem.Body onClick={() => setSelectedQuote(quote)}>
                <PostListItem.Content
                  content={quote.content}
                  book={{ title: quote.title, author: quote.author }}
                />
                <PostListItem.Tags
                  emotionTag={quote.needTag ? `# ${quote.needTag.label}` : undefined}
                  toneTag={`# ${quote.emotion.label}`}
                  mood={getMood(quote.emotion.value)}
                />
              </PostListItem.Body>
            </PostListItem>
          ))}

        {!isLoading && quotes.length === 0 && (
          <div className="flex items-center justify-center py-20">
            <span className="caption1 text-gray-300">아직 추천된 문장이 없어요.</span>
          </div>
        )}

        {isFetchingNextPage && (
          <div className="flex items-center justify-center py-4">
            <span className="caption1 text-gray-300">불러오는 중...</span>
          </div>
        )}
      </div>

      {selectedQuote && (
        <PostShareModal
          post={{
            id: String(selectedQuote.quoteId),
            author: {
              id: String(selectedQuote.recommendedUserId),
              nickname: selectedQuote.recommendedUserNickname,
            },
            content: selectedQuote.content,
            book: { title: selectedQuote.title, author: selectedQuote.author },
            date: "",
            mood: getMood(selectedQuote.emotion.value),
            emotionTag: selectedQuote.needTag ? `# ${selectedQuote.needTag.label}` : "",
            toneTag: `# ${selectedQuote.emotion.label}`,
            isBookmarked: selectedQuote.isScrapped,
            createdAt: formatRelativeTime(selectedQuote.recommendedAt),
          }}
          isOpen={true}
          onClose={() => setSelectedQuote(null)}
        />
      )}
    </div>
  );
};
