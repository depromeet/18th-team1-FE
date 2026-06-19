export interface QuoteResponse {
  quoteId: number;
  bookId: number;
  content: string;
  title: string;
  author: string;
  image: string;
}

export interface MonthlyRecommendation {
  recommendationId: number;
  createdAt: string;
  quoteContent: string;
}

export interface HomeSummaryResponse {
  todayRecommendations: MonthlyRecommendation[];
  monthlyRecommendations: MonthlyRecommendation[];
  totalRecommendationCount: number;
}
