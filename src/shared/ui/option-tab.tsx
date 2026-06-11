"use client";

import { cn } from "@/shared/lib/utils";

interface OptionTabProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const OptionTab = ({ options, value, onChange, className }: OptionTabProps) => (
  <div className={cn("flex gap-2.5", className)}>
    {options.map((option) => (
      <button
        key={option.value}
        type="button"
        className={cn(
          "body3 rounded-full transition-colors w-15.75 h-8.25",
          value === option.value
            ? "bg-gray-700 text-gray-0"
            : "border border-gray-200 bg-background text-gray-500",
        )}
        onClick={() => onChange(option.value)}
      >
        {option.label}
      </button>
    ))}
  </div>
);
