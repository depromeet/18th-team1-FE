"use client";

import { useEffect, useState } from "react";
import { cn } from "@/shared/lib/utils";
import { IcMonthBack, IcMonthNext } from "@/shared/ui/icons";
import { NewButton } from "@/shared/ui/new-button";

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
}

const parseValue = (value?: string) => {
  if (value) {
    const [y, m] = value.split("-");
    return { year: Number(y), month: Number(m) };
  }
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth() + 1 };
};

export const MonthPicker = ({ isOpen, onClose, onChange, selectedValue }: MonthPickerProps) => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  const [displayYear, setDisplayYear] = useState(() => parseValue(selectedValue).year);
  const [selectedYear, setSelectedYear] = useState(() => parseValue(selectedValue).year);
  const [selectedMonth, setSelectedMonth] = useState(() => parseValue(selectedValue).month);

  useEffect(() => {
    if (isOpen) {
      const { year, month } = parseValue(selectedValue);
      setDisplayYear(year);
      setSelectedYear(year);
      setSelectedMonth(month);
    }
  }, [isOpen, selectedValue]);

  const isDisabled = (month: number) => {
    if (displayYear > currentYear) return true;
    if (displayYear === currentYear && month > currentMonth) return true;
    return false;
  };

  const isSelected = (month: number) => displayYear === selectedYear && month === selectedMonth;

  const handleMonthClick = (month: number) => {
    if (isDisabled(month)) return;
    setSelectedYear(displayYear);
    setSelectedMonth(month);
  };

  const handleSave = () => {
    const value = `${selectedYear}-${String(selectedMonth).padStart(2, "0")}`;
    onChange?.(value);
    onClose();
  };

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
              onClick={() => setDisplayYear((y) => y - 1)}
              className="flex size-6 items-center justify-center"
              aria-label="이전 연도"
            >
              <IcMonthBack size={24} className="text-gray-300" />
            </button>
            <span className="body1 text-gray-600">{displayYear}</span>
            <button
              type="button"
              onClick={() => setDisplayYear((y) => y + 1)}
              disabled={displayYear >= currentYear}
              className="flex size-6 items-center justify-center disabled:cursor-default"
              aria-label="다음 연도"
            >
              <IcMonthNext
                size={24}
                className={displayYear >= currentYear ? "text-gray-200" : "text-gray-300"}
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
                        "body1 flex items-center justify-center rounded-md px-7.5 py-2.5 transition-colors",
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
