"use client";

import type { ChangeEvent, SyntheticEvent } from "react";
import { useState } from "react";

import { cn } from "@/shared/lib/utils";
import { Text } from "@/shared/ui/text";

import { MAX_DIARY_CHAR } from "../model/useDiaryWrite";

const MIN_TEXTAREA_HEIGHT = 153;

const adjustHeight = (el: HTMLTextAreaElement): void => {
  el.style.height = "auto";
  el.style.height = `${Math.max(el.scrollHeight, MIN_TEXTAREA_HEIGHT)}px`;
};

interface DiaryTextInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const DiaryTextInput = ({ value, onChange }: DiaryTextInputProps): React.ReactElement => {
  const [isFocused, setIsFocused] = useState(false);
  const charCount = value.length;
  const isAtMax = charCount >= MAX_DIARY_CHAR;

  const handleInput = (e: SyntheticEvent<HTMLTextAreaElement>): void => {
    adjustHeight(e.currentTarget);
  };

  return (
    <div className={cn("flex w-full flex-col items-end", isAtMax ? "gap-2.5" : "gap-3.25")}>
      <div
        className={cn(
          "min-h-45.75 w-full rounded-lg border bg-gray-50 px-4 pb-4 pt-3",
          isFocused ? "border-gray-200" : "border-transparent",
        )}
      >
        <textarea
          style={{ minHeight: MIN_TEXTAREA_HEIGHT }}
          className="w-full resize-none overflow-hidden bg-transparent text-[16px] leading-[1.4] text-gray-700 outline-none placeholder:text-gray-300"
          placeholder="오늘 하루, 이 문장이 어떻게 다가오나요?"
          value={value}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>): void => onChange(e.target.value)}
          onInput={handleInput}
          onFocus={(): void => setIsFocused(true)}
          onBlur={(): void => setIsFocused(false)}
        />
      </div>
      <div className="flex w-full items-center justify-between">
        {isAtMax ? (
          <Text variant="caption2" className="text-destructive">
            300자까지만 작성 가능해요
          </Text>
        ) : (
          <span />
        )}
        <Text as="span" color="gray-300" className="text-[15px] leading-[1.4]">
          {charCount}/{MAX_DIARY_CHAR}
        </Text>
      </div>
    </div>
  );
};
