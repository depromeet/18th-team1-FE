export type ShareType = "today-sentence" | "calendar" | "sentence-pick";

export type CalendarCardVariant = 1 | 2;

export type SentenceShareData = {
  quote: string;
  title: string;
  author: string;
  coverImageUrl?: string;
};

export type CalendarShareStep =
  | { type: "idle" }
  | { type: "type-sheet" }
  | { type: "date-drawer" }
  | { type: "card-drawer"; shareType: ShareType; date?: string; sentenceData?: SentenceShareData };
