export type EmotionIntensity = "HIGH" | "MID" | "LOW";

export interface Diary {
  diaryId: number;
  day: number;
  sentence: string;
  temperature: number;
  dotColor: string;
}

export interface TodayDiary {
  temperature: number;
  temperatureColor: string;
  quote: string;
  bookTitle: string;
  bookAuthor: string;
  note: string;
}

export interface RecommendationQuote {
  quoteId: number;
  bookId: number;
  content: string;
  title: string;
  author: string;
  image: string;
  link: string;
}

export interface RecommendationTag {
  id: number;
  label: string;
  type: string;
}

export interface RecommendationListItem {
  recommendationId: number;
  recommendationDate: string;
  emotionValue: number;
  emotionRangeName: string;
  quote: RecommendationQuote;
}

export interface RecommendationListResponse {
  start: string;
  end: string;
  recommendations: RecommendationListItem[];
}

export interface RecommendationDetailResponse {
  recommendationId: number;
  quote: RecommendationQuote;
  emotionValue: number;
  emotionTags: RecommendationTag[];
  needTag: RecommendationTag | null;
  feelingText: string | null;
  diaryText: string | null;
  recommendationDate: string;
}
