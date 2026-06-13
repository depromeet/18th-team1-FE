"use client";

import { useState } from "react";

import { IcCloseCircle } from "@/shared/ui/icons";

interface NicknameInputFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  placeholder?: string;
  maxLength?: number;
  errorMessage?: string;
}

export const NicknameInputField = ({
  value,
  onChange,
  onClear,
  placeholder,
  maxLength = 10,
  errorMessage,
}: NicknameInputFieldProps): React.ReactElement => {
  const [isFocused, setIsFocused] = useState(false);

  const hasError = !!errorMessage;
  const hasValue = value.length > 0;
  const showClearButton = (isFocused || hasError) && hasValue && !!onClear;
  const displayCount = hasValue ? value.length : (placeholder?.length ?? 0);

  const borderClass = hasError
    ? "border-sub-error"
    : isFocused
      ? "border-gray-500"
      : hasValue
        ? "border-gray-200"
        : "border-lightgray1";

  return (
    <div className="flex flex-col gap-0.75">
      <div
        className={`flex h-13 items-center gap-2.5 rounded-[4px] border bg-background pl-3.75 pr-2.5 ${borderClass}`}
      >
        <input
          type="text"
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          maxLength={maxLength}
          className="body1 min-w-0 flex-1 text-gray-700 outline-none placeholder:text-midgray1"
        />
        {showClearButton && (
          <button
            type="button"
            aria-label="텍스트 지우기"
            onMouseDown={(e) => e.preventDefault()}
            onClick={onClear}
            className="shrink-0"
          >
            <IcCloseCircle size={30} className="text-gray-500" />
          </button>
        )}
      </div>
      <div className={`flex items-start ${hasError ? "justify-between" : "justify-end"}`}>
        {hasError && <p className="caption3 flex-1 text-sub-error">* {errorMessage}</p>}
        <p className={`caption3 text-right ${hasError ? "text-sub-error" : "text-midgray1"}`}>
          {displayCount}/{maxLength}
        </p>
      </div>
    </div>
  );
};
