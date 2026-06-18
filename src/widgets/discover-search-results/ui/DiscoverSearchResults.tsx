"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  type DiscoveryQuoteSearchDto,
  PostAuthorProfile,
  PostListItem,
  useDiscoverySearchQuery,
  useGenresQuery,
} from "@/entities/post";
import { GenreFilterDropdown, useDiscoverFilter } from "@/features/discover-filter";
import { SearchHistoryList, useSearchHistory } from "@/features/discover-search";
import { BookmarkButton, useScrapMutation } from "@/features/post-bookmark";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";
import { PostShareModal } from "@/widgets/post-share-modal";
import { DiscoverSearchResultsHeader } from "./DiscoverSearchResultsHeader";

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

interface DiscoverSearchResultsProps {
  initialQuery: string;
}

export const DiscoverSearchResults = ({
  initialQuery,
}: DiscoverSearchResultsProps): React.ReactElement => {
  const router = useRouter();
  const [activeSort, setActiveSort] = useState<"latest" | "scrap">("latest");
  const [selectedQuote, setSelectedQuote] = useState<DiscoveryQuoteSearchDto | null>(null);
  const [inputQuery, setInputQuery] = useState(initialQuery);

  // URL(initialQuery)이 바뀌면(명시적 제출) 로컬 상태 동기화
  useEffect(() => {
    setInputQuery(initialQuery);
  }, [initialQuery]);

  const debouncedQuery = useDebounce(inputQuery, 300);

  const { history, addToHistory, removeFromHistory } = useSearchHistory();
  const { selectedGenreId, setSelectedGenreId } = useDiscoverFilter();

  const { data: genresData } = useGenresQuery();
  const genres = genresData ?? [];

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useDiscoverySearchQuery(debouncedQuery, activeSort, selectedGenreId);

  // 데이터가 전혀 없는 첫 로딩일 때만 500ms 지연 스피너 표시
  // isFetching(키워드 전환 중)은 placeholderData로 이전 결과를 유지하므로 스피너 불필요
  const [showLoading, setShowLoading] = useState(false);
  useEffect(() => {
    if (!isLoading) {
      setShowLoading(false);
      return;
    }
    const timer = setTimeout(() => setShowLoading(true), 500);
    return () => clearTimeout(timer);
  }, [isLoading]);

  const { toggle } = useScrapMutation();

  const handleFetchNext = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const sentinelRef = useInfiniteScroll(handleFetchNext);

  const quotes = data?.pages.flatMap((page) => page.quotes) ?? [];

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
      <DiscoverSearchResultsHeader
        initialQuery={initialQuery}
        onConfirm={handleConfirm}
        onChange={setInputQuery}
      />

      {inputQuery ? (
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
            <GenreFilterDropdown
              genres={genres}
              selectedGenreId={selectedGenreId}
              onSelect={setSelectedGenreId}
            />
          </div>

          {/* Post list */}
          <div ref={sentinelRef} className="min-h-0 flex-1 overflow-y-auto px-5">
            {showLoading && (
              <div className="flex items-center justify-center py-20">
                <span className="body1 text-gray-400">불러오는 중...</span>
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

            {!isLoading && !showLoading && quotes.length === 0 && (
              <div className="flex items-center justify-center py-25">
                <span className="body1 text-gray-400">검색 결과가 없어요.</span>
              </div>
            )}

            {isFetchingNextPage && (
              <div className="flex items-center justify-center py-25">
                <span className="body1 text-gray-400">불러오는 중...</span>
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
              onToggleBookmark={(currentIsBookmarked) =>
                toggle(selectedQuote.quoteId, currentIsBookmarked)
              }
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
