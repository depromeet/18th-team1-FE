export interface QuoteResponse {
  quoteId: number;
  bookId: number;
  content: string;
  title: string;
  author: string;
  image: string;
}

export interface MonthlyDiaryResponse {
  diaryId: number;
  createdAt: string;
  quoteContent: string;
}

export interface HomeSummaryResponse {
  todayDiary: MonthlyDiaryResponse | null;
  monthlyDiaries: MonthlyDiaryResponse[];
  totalDiaryCount: number;
}
