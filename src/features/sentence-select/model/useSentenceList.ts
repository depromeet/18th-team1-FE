"use client";

import { useState } from "react";

interface UseSentenceListReturn {
  selectedId: number;
  handleSelect: (id: number) => void;
}

export const useSentenceList = (initialQuoteId: number): UseSentenceListReturn => {
  const [selectedId, setSelectedId] = useState(initialQuoteId);

  const handleSelect = (id: number): void => {
    setSelectedId(id);
  };

  return { selectedId, handleSelect };
};
