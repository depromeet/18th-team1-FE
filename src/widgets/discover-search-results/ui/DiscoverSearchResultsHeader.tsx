"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IcBack, IcDelete } from "@/shared/ui/icons";

interface DiscoverSearchResultsHeaderProps {
  initialQuery: string;
  onConfirm: (value: string) => void;
  onChange?: (value: string) => void;
}

export const DiscoverSearchResultsHeader = ({
  initialQuery,
  onConfirm,
  onChange,
}: DiscoverSearchResultsHeaderProps): React.ReactElement => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState(initialQuery);
  const hasMounted = useRef(false);

  useEffect(() => {
    setInputValue(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    if (inputValue === "") router.push("/discover?search=");
  }, [inputValue, router]);

  const handleChange = (value: string) => {
    setInputValue(value);
    onChange?.(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onConfirm(inputValue);
  };

  const handleBack = () => router.push("/discover");

  const handleClear = () => setInputValue("");

  return (
    <div className="bg-key-point-50 px-5 pt-15 pb-5">
      <div className="flex items-center">
        <button type="button" onClick={handleBack} className="shrink-0">
          <IcBack size={28} className="text-gray-600" />
        </button>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="문장을 검색해보세요"
          className="subhead2 min-w-0 flex-1 bg-transparent text-center text-gray-700 placeholder:text-gray-400 focus:placeholder-transparent outline-none"
          // biome-ignore lint/a11y/noAutofocus: intentional focus for search screen
          autoFocus={!initialQuery}
        />
        <div className="flex size-7 shrink-0 items-center justify-center">
          {inputValue && (
            <button type="button" onClick={handleClear}>
              <IcDelete size={20} className="text-gray-400" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
