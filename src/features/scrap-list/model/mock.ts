export interface ScrapItem {
  id: string;
  coverImageUrl: string;
  quote: string;
  bookTitle: string;
  author: string;
}

export const MOCK_SCRAP_ITEMS: ScrapItem[] = [
  {
    id: "1",
    coverImageUrl: "/images/book-ex.jpeg",
    quote:
      "타인의 시선에서 벗어날 용기가 없다면, 영원히 남의 인생을 살게 된다.타인의 시선에서 벗어날 용기가 없다면, 영원히 남의 인생을 살게 된다.",
    bookTitle: "미움받을 용기",
    author: "알프레드 아들러",
  },
  {
    id: "2",
    coverImageUrl: "/images/book.webp",
    quote: "우리는 매 순간 자신이 선택한 삶을 살고 있다.",
    bookTitle: "미움받을 용기",
    author: "알프레드 아들러",
  },
  {
    id: "3",
    coverImageUrl: "/images/book-ex2.jpg",
    quote: "행복이란 누군가에게 공헌하고 있다는 실감이다. 특별할 필요는 없다.",
    bookTitle: "미움받을 용기",
    author: "알프레드 아들러",
  },
  {
    id: "4",
    coverImageUrl: "/images/book.webp",
    quote: "변할 수 없는 것을 받아들이는 평온함을 주소서.",
    bookTitle: "미움받을 용기",
    author: "알프레드 아들러",
  },
];
