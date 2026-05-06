export type EmotionIntensity = "HIGH" | "MID" | "LOW";

export interface Diary {
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

export interface DiaryDetail {
  quoteContent: string;
  title: string;
  author: string;
  emotions: string[];
  content?: string | null;
  coverImageUrl: string;
  diaryImageUrl?: string | null;
}
