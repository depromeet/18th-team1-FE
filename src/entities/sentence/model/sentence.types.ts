export interface RecommendedSentence {
  id: string;
  quote: string;
  bookTitle: string;
  bookAuthor: string;
  date?: string;
}

export interface TodaySentenceExistsResponse {
  exists: boolean;
}

export interface SentenceQuote {
  quoteId: number;
  bookId: number;
  content: string;
  title: string;
  author: string;
  image: string;
}

export interface SentenceTag {
  id: number;
  label: string;
  type: string;
  emotionRangeId: number;
}

export interface SentenceQuotesRequest {
  emotionTagIds: number[];
  toneTagIds: number[];
  userContext?: string;
}

export interface SentenceQuotesResponse {
  dailyRecommendationId: number;
  quote: SentenceQuote;
  emotionTags: SentenceTag[];
  toneTags: SentenceTag[];
}
