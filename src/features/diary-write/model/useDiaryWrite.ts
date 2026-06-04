"use client";

import { useState } from "react";

export const MAX_DIARY_CHAR = 300;

interface UseDiaryWriteReturn {
  text: string;
  handleTextChange: (value: string) => void;
}

export const useDiaryWrite = (): UseDiaryWriteReturn => {
  const [text, setText] = useState("");

  const handleTextChange = (value: string) => {
    setText(value.slice(0, MAX_DIARY_CHAR));
  };

  return {
    text,
    handleTextChange,
  };
};
