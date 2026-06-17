import { useState } from "react";

export const GENRE_FILTERS = [
  "모든 장르",
  "일반문학",
  "시･에세이",
  "추리･미스터리",
  "SF",
  "공포･스릴러",
  "판타지",
  "로맨스",
  "역사",
  "무협",
] as const;
export type GenreFilter = (typeof GENRE_FILTERS)[number];

export const useDiscoverFilter = () => {
  const [selectedGenre, setSelectedGenre] = useState<GenreFilter>("모든 장르");

  return { selectedGenre, setSelectedGenre };
};
