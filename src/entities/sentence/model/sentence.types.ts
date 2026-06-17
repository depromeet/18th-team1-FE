export interface RecommendedSentence {
  id: string;
  quote: string;
  bookTitle: string;
  bookAuthor: string;
  date?: string;
}

export interface SentenceQuote {
  quoteId: number;
  bookId: number;
  content: string;
  title: string;
  author: string;
  image: string;
  link?: string;
}

export interface SentenceTag {
  id: number;
  label: string;
  type: string;
  emotionRangeId: number;
}

export interface StartRecommendationRequest {
  emotionValue: number | null;
  emotionTagIds: number[];
  needTagId: number | null;
  feelingText: string | null;
  diaryText: string | null;
}

export interface StartRecommendationResponse {
  recommendationId: number;
  quote: SentenceQuote;
  emotionTags: SentenceTag[];
  needTags: SentenceTag[];
}

export interface TodayStatusResponse {
  hasOngoingRecommendation: boolean;
  ongoingRecommendationId: number | null;
  canCreateTodayRecommendation: boolean;
}

export interface TagDto {
  id: number;
  label: string;
  type: string;
  emotionRangeId?: number | null;
  displayGroup?: string | null;
}

export interface RecommendationDetailResponse {
  recommendationId: number;
  quote: SentenceQuote;
  emotionValue: number;
  emotionTags: TagDto[];
  needTag: TagDto | null;
  feelingText: string | null;
  diaryText: string | null;
  recommendationDate: string;
}
