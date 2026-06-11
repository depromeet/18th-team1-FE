import { useState } from "react";

export const GENRE_FILTERS = [
  "전체",
  "한국소설",
  "일본소설",
  "영미소설",
  "판타지",
  "고전문학",
  "인문",
  "철학",
  "에세이･시",
  "영화･드라마 원작",
] as const;
export type GenreFilter = (typeof GENRE_FILTERS)[number];

export const useDiscoverFilter = () => {
  const [selectedGenre, setSelectedGenre] = useState<GenreFilter>("전체");

  return { selectedGenre, setSelectedGenre };
};
