import { useState } from "react";

export const useDiscoverFilter = () => {
  const [selectedGenreId, setSelectedGenreId] = useState<number | undefined>(undefined);

  return { selectedGenreId, setSelectedGenreId };
};
