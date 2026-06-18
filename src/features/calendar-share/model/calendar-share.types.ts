export type ShareType = "today-sentence" | "calendar" | "sentence-pick";

export type CalendarCardVariant = 1 | 2;

export type CalendarShareStep =
  | { type: "idle" }
  | { type: "type-sheet" }
  | { type: "date-drawer" }
  | { type: "card-drawer"; shareType: ShareType; date?: string };
