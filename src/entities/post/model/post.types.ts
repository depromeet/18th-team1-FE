export interface PostAuthor {
  id: string;
  nickname: string;
  avatarUrl?: string;
}

export interface PostBook {
  title: string;
  author: string;
  coverImageUrl?: string;
}

export type PostMood = "good" | "mid" | "bad";

export interface Post {
  id: string;
  author: PostAuthor;
  content: string;
  book: PostBook;
  date: string;
  mood: PostMood;
  emotionTag: string;
  toneTag: string;
  isBookmarked: boolean;
  createdAt: string;
}

export interface PostListResponse {
  posts: Post[];
}

// ── Discovery ────────────────────────────────────────────────────────────────

export interface DiscoveryNeedTag {
  id: number;
  label: string;
}

export interface DiscoveryEmotion {
  value: number;
  label: string;
}

/** 피드 목록 조회 API (GET /discovery/quotes) 응답 아이템 */
export interface DiscoveryQuoteDto {
  quoteId: number;
  bookId: number;
  recommendedUserId: number;
  recommendedUserNickname: string;
  content: string;
  title: string;
  author: string;
  bookCoverImageUrl: string;
  genre: string;
  needTag: DiscoveryNeedTag | null;
  emotion: DiscoveryEmotion;
  recommendedAt: string;
  isScrapped: boolean;
}

/** 검색 API (GET /discovery/quotes/search) 응답 아이템 */
export interface DiscoveryQuoteSearchDto {
  quoteId: number;
  bookId: number;
  recommendedUserId: number;
  recommendedUserNickname: string;
  content: string;
  title: string;
  author: string;
  bookCoverImageUrl: string;
  genre: string;
  needTag: DiscoveryNeedTag | null;
  emotion: DiscoveryEmotion;
  recommendedAt: string;
  isScrapped: boolean;
}

export interface DiscoveryQuoteListResponse {
  quotes: DiscoveryQuoteDto[];
  nextCursor: string | null;
  hasNext: boolean;
}

export interface DiscoveryQuoteSearchListResponse {
  quotes: DiscoveryQuoteSearchDto[];
  nextCursor: string | null;
  hasNext: boolean;
}
