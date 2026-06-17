import { useEffect, useState } from "react";

interface UseMonthPickerParams {
  isOpen: boolean;
  selectedValue?: string;
  minYear?: number;
  minMonth?: number;
  maxYear?: number;
  maxMonth?: number;
  onChange?: (date: string) => void;
  onClose: () => void;
}

const parseValue = (value?: string) => {
  if (value) {
    const [y, m] = value.split("-");
    return { year: Number(y), month: Number(m) };
  }
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth() + 1 };
};

export const useMonthPicker = ({
  isOpen,
  selectedValue,
  minYear,
  minMonth,
  maxYear,
  maxMonth,
  onChange,
  onClose,
}: UseMonthPickerParams) => {
  const now = new Date();
  const upperYear = maxYear ?? now.getFullYear();
  const upperMonth = maxMonth ?? now.getMonth() + 1;

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
    if (displayYear > upperYear) return true;
    if (displayYear === upperYear && month > upperMonth) return true;
    if (minYear !== undefined) {
      if (displayYear < minYear) return true;
      if (displayYear === minYear && month < (minMonth ?? 1)) return true;
    }
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

  const isPrevYearDisabled = minYear !== undefined && displayYear <= minYear;
  const isNextYearDisabled = displayYear >= upperYear;

  return {
    displayYear,
    isPrevYearDisabled,
    isNextYearDisabled,
    goToPrevYear: () => setDisplayYear((y) => y - 1),
    goToNextYear: () => setDisplayYear((y) => y + 1),
    isDisabled,
    isSelected,
    handleMonthClick,
    handleSave,
  };
};
