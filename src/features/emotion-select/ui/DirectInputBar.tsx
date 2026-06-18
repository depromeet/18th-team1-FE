import { useState } from "react";

import { IcArrowUp } from "@/shared/ui/icons";

import { useCharLimit } from "../model/useCharLimit";
import { usePlaceholderCycle } from "../model/usePlaceholderCycle";
import { AnimatedPlaceholder } from "./AnimatedPlaceholder";

interface DirectInputBarProps {
  onValidChange: (isEmpty: boolean) => void;
  onSubmit: (value: string) => void;
  isLoading?: boolean;
}

export const DirectInputBar = ({ onValidChange, onSubmit, isLoading }: DirectInputBarProps) => {
  const [value, setValue] = useState("");
  const { placeholderText, animationKey, isExiting } = usePlaceholderCycle(true);
  const { handleChange, handlePaste } = useCharLimit<HTMLInputElement>(
    30,
    (newValue) => {
      setValue(newValue);
      onValidChange(newValue.length === 0);
    },
    "최대 30자까지만 작성 가능해요.",
  );

  const handleSubmit = (): void => {
    onSubmit(value);
  };

  return (
    <div className="flex h-11 w-full items-center justify-between rounded-full bg-white pl-4.25 pr-2.5">
      <div className="relative min-w-0 flex-1">
        <input
          // biome-ignore lint/a11y/noAutofocus: 직접 입력 활성화 시 즉시 입력 유도를 위해 의도적으로 사용
          autoFocus
          className="body1 w-full bg-transparent text-gray-700 outline-none"
          value={value}
          onChange={handleChange}
          onPaste={handlePaste}
        />
        {value.length === 0 && (
          <div
            className="pointer-events-none absolute inset-0 flex items-center transition-opacity duration-300"
            style={{ opacity: isExiting ? 0 : 1 }}
          >
            <AnimatedPlaceholder key={animationKey} text={placeholderText} />
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        disabled={value.length === 0 || isLoading}
        className="ml-2 flex size-7.75 shrink-0 items-center justify-center rounded-full bg-gray-700 disabled:bg-gray-200"
        aria-label="입력 완료"
      >
        <IcArrowUp size={16} className="text-white" />
      </button>
    </div>
  );
};
