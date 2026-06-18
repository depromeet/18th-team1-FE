export interface MonthlyBookSummary {
  bookId: number;
  title: string;
  author: string;
  bookCoverImageUrl: string;
  genre: string;
  bookPurchaseLink?: string;
}

export interface MonthlyBookQuote extends MonthlyBookSummary {
  quoteId: number;
  quoteContent: string;
}

export interface EmotionTag {
  tagId: number;
  label: string;
  count: number;
}

export interface MonthlyReport {
  year: number;
  month: number;
  sharedQuoteCount: number;
  mostFrequentGenre: string | null;
  recommendationMessage: string | null;
  monthlyBooks: MonthlyBookSummary[];
  emotionTags: EmotionTag[];
  monthlyBook: MonthlyBookQuote | null;
}
