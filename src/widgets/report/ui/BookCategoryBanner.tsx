import Image from "next/image";

import type { MonthlyBookSummary } from "@/entities/report";

interface BookCategoryBannerProps {
  month: number;
  genre: string;
  books: MonthlyBookSummary[];
}

export const BookCategoryBanner = ({ month, genre, books }: BookCategoryBannerProps) => {
  return (
    <div className="bg-key-primary relative h-45 overflow-hidden">
      <div className="absolute left-5 top-5">
        <p className="subhead4 text-key-secondary">{month}월의 책 카테고리</p>
        <p className="title2 text-key-secondary">{genre}</p>
      </div>
      {books[0] && (
        <div className="absolute right-33.25 top-25.5 -rotate-12 rounded-[4px] overflow-hidden w-19 h-26">
          <Image
            src={books[0].bookCoverImageUrl}
            alt={books[0].title}
            fill
            className="object-cover"
          />
        </div>
      )}
      {books[1] && (
        <div className="absolute right-18 top-26.5 rotate-4 rounded-[4px] overflow-hidden w-15.5 h-21.25 z-10">
          <Image
            src={books[1].bookCoverImageUrl}
            alt={books[1].title}
            fill
            className="object-cover"
          />
        </div>
      )}
      {books[2] && (
        <div className="absolute -right-1.25 top-20.5 rotate-7 rounded-[4px] overflow-hidden w-20.25 h-27.75">
          <Image
            src={books[2].bookCoverImageUrl}
            alt={books[2].title}
            fill
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
};
