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
