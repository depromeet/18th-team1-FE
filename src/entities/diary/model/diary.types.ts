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

export interface DiaryDetail {
  id: number;
  createdAt: string;
  quoteContent: string;
  title: string;
  author: string;
  emotionIntensity: EmotionIntensity;
  emotions: string[];
  content?: string | null;
  coverImageUrl: string;
  diaryImageUrl?: string | null;
  aladinLink?: string;
}
