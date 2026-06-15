export interface ScrappedQuote {
  quoteId: number;
  bookId: number;
  bookCoverImageUrl: string;
  content: string;
  title: string;
  author: string;
  scrappedAt: string;
}

export interface ScrappedQuotesResponse {
  totalCount: number;
  quotes: ScrappedQuote[];
  nextCursor: string | null;
  hasNext: boolean;
}
