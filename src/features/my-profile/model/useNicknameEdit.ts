"use client";

import { useState } from "react";

const MAX_LENGTH = 10;

export const useNicknameEdit = (initialNickname = "") => {
  const [value, setValue] = useState("");

  const validationError =
    value.length > 0 && value.trim().length < 2 ? "닉네임을 2~10글자로 입력해주세요." : "";

  const isValid = value.trim().length >= 2 && value !== initialNickname;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= MAX_LENGTH) setValue(e.target.value);
  };

  const handleClear = () => setValue("");

  return { value, isValid, validationError, handleChange, handleClear, maxLength: MAX_LENGTH };
};
