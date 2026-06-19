interface DiaryQuoteSectionProps {
  quoteContent: string;
}

export const DiaryQuoteSection = ({ quoteContent }: DiaryQuoteSectionProps) => (
  <div className="flex flex-col gap-3">
    <p className="body3 text-gray-400">추천 받은 문장</p>
    <p className="subhead4 text-gray-700">{quoteContent}</p>
  </div>
);
