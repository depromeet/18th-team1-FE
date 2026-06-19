"use client";

import { cn } from "@/shared/lib/utils";
import { IcMonthBack, IcMonthNext } from "@/shared/ui/icons";
import { NewButton } from "@/shared/ui/new-button";
import { useMonthPicker } from "../model/useMonthPicker";

const MONTH_ROWS = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
] as const;

interface MonthPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onChange?: (date: string) => void;
  selectedValue?: string;
  minYear?: number;
  minMonth?: number;
  maxYear?: number;
  maxMonth?: number;
}

export const MonthPicker = ({
  isOpen,
  onClose,
  onChange,
  selectedValue,
  minYear,
  minMonth,
  maxYear,
  maxMonth,
}: MonthPickerProps) => {
  const {
    displayYear,
    isPrevYearDisabled,
    isNextYearDisabled,
    goToPrevYear,
    goToNextYear,
    isDisabled,
    isSelected,
    handleMonthClick,
    handleSave,
  } = useMonthPicker({
    isOpen,
    selectedValue,
    minYear,
    minMonth,
    maxYear,
    maxMonth,
    onChange,
    onClose,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button
        type="button"
        className="absolute inset-0 bg-gray-700-50"
        onClick={onClose}
        aria-label="닫기"
      />
      <div className="relative z-10 w-full md:max-w-93.75 overflow-hidden shadow-xl">
        <div className="rounded-t-[20px] bg-gray-0">
          <div className="flex items-center justify-between px-11.25 pb-3 pt-8">
            <button
              type="button"
              onClick={goToPrevYear}
              disabled={isPrevYearDisabled}
              className="flex size-6 items-center justify-center disabled:cursor-default"
              aria-label="이전 연도"
            >
              <IcMonthBack
                size={24}
                className={isPrevYearDisabled ? "text-gray-200" : "text-gray-300"}
              />
            </button>
            <span className="body1 text-gray-600">{displayYear}</span>
            <button
              type="button"
              onClick={goToNextYear}
              disabled={isNextYearDisabled}
              className="flex size-6 items-center justify-center disabled:cursor-default"
              aria-label="다음 연도"
            >
              <IcMonthNext
                size={24}
                className={isNextYearDisabled ? "text-gray-200" : "text-gray-300"}
              />
            </button>
          </div>
          <div className="flex flex-col gap-1.5 px-5 pb-8 pt-5">
            {MONTH_ROWS.map((row) => (
              <div key={row[0]} className="flex items-center justify-between">
                {row.map((month) => {
                  const disabled = isDisabled(month);
                  const selected = isSelected(month);
                  return (
                    <button
                      key={month}
                      type="button"
                      onClick={() => handleMonthClick(month)}
                      aria-disabled={disabled}
                      className={cn(
                        "body1 flex items-center justify-center rounded-md w-17.5 h-11 transition-colors",
                        selected
                          ? "bg-gray-700 text-gray-0"
                          : disabled
                            ? "cursor-default text-gray-200"
                            : "text-gray-600 active:bg-gray-50",
                      )}
                    >
                      {month}월
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <NewButton label="저장" onClick={handleSave} />
      </div>
    </div>
  );
};
