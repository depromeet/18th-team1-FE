"use client";

import { useState } from "react";
import { IcSearch } from "@/shared/ui/icons";

interface DiscoverSearchBarProps {
  onSubmit: (value: string) => void;
}

export const DiscoverSearchBar = ({ onSubmit }: DiscoverSearchBarProps): React.ReactElement => {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (trimmed) onSubmit(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="flex h-[46px] items-center rounded-full border border-gray-200 bg-background pl-4.75 pr-3.75">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="문장을 검색해보세요"
        className="body1 flex-1 bg-transparent text-gray-700 placeholder:text-gray-300 outline-none"
      />
      <button type="button" onClick={handleSubmit} className="shrink-0">
        <IcSearch size={24} className="text-gray-300" />
      </button>
    </div>
  );
};
