import Image from "next/image";

import type { MonthlyBookQuote } from "@/entities/report";
import { IcLink } from "@/shared/ui/icons";

interface MonthlyBookSectionProps {
  month: number;
  book: MonthlyBookQuote;
}

export const MonthlyBookSection = ({ month, book }: MonthlyBookSectionProps) => {
  return (
    <div className="w-full flex flex-col">
      <div className="bg-key-primary px-5 pt-5">
        <div className="flex items-center justify-between">
          <p className="subhead4 text-key-secondary">{month}월의 책</p>
          {book.bookPurchaseLink && (
            <a
              href={book.bookPurchaseLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full bg-gray-600-15 px-3 py-2 cursor-pointer"
            >
              <IcLink size={16} className="text-gray-700-50" />
              <span className="caption2 text-gray-700-50">책 링크</span>
            </a>
          )}
        </div>
        <div className="flex justify-center pt-7 -mb-8.75 relative z-10">
          <div className="relative h-65 w-41.5 rounded-lg overflow-hidden shadow-lg">
            <Image src={book.bookCoverImageUrl} alt={book.title} fill className="object-cover" />
          </div>
        </div>
      </div>
      <div className="bg-key-primary-100 px-5 pt-5 pb-10 flex flex-col gap-4 z-100">
        <div className="flex flex-wrap items-center gap-2.5">
          <p className="title2 text-gray-0">{book.title}</p>
          <p className="subhead2 text-gray-0">{book.author}</p>
        </div>
        <p className="body1 text-gray-0">"{book.quoteContent}"</p>
      </div>
    </div>
  );
};
