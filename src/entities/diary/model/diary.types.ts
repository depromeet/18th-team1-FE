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

export interface DiaryListItem {
  id: number;
  createdAt: string;
  content: string | null;
  emotionValue: number;
  quoteContent: string;
  tags: string[];
  coverImageUrl: string;
  author: string;
  title: string;
}

export interface DiaryListResponse {
  start: string;
  end: string;
  diaries: DiaryListItem[];
}

export interface DiaryDetail extends DiaryListItem {
  diaryImageUrl?: string | null;
  aladinLink?: string;
  emotions?: string[];
  purpose?: string;
}
