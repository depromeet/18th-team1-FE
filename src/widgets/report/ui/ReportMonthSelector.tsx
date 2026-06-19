"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useUserProfileQuery, useUserSignupDateQuery } from "@/entities/user";
import { MonthPicker } from "@/features/month-picker";
import { IcDateDropdown } from "@/shared/ui/icons";

interface ReportMonthSelectorProps {
  year: number;
  month: number;
  userId?: number;
}

const getCurrentMonth = () => {
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth() + 1 };
};

export const ReportMonthSelector = ({ year, month, userId }: ReportMonthSelectorProps) => {
  const router = useRouter();
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const isSharedView = userId !== undefined;
  const { data: userProfile } = useUserProfileQuery(!isSharedView);
  const { data: signupDateInfo } = useUserSignupDateQuery(userId ?? 0, isSharedView);

  const { year: maxYear, month: maxMonth } = getCurrentMonth();
  const signupDateString = isSharedView ? signupDateInfo?.signupDate : userProfile?.createdAt;
  const signupDate = signupDateString ? new Date(signupDateString) : undefined;

  const handleMonthChange = (dateStr: string) => {
    const [selectedYear, selectedMonth] = dateStr.split("-");
    const query = isSharedView ? `?userId=${userId}` : "";
    router.push(`/report/${selectedYear}/${selectedMonth}${query}`);
  };

  return (
    <>
      <button
        type="button"
        className="inline-flex items-center self-start gap-1.5 mt-2 mb-4 mx-5"
        onClick={() => setIsPickerOpen(true)}
      >
        <h2 className="title2 text-gray-700">{month}월</h2>
        <IcDateDropdown size={30} className="text-gray-300" />
      </button>
      <MonthPicker
        isOpen={isPickerOpen}
        selectedValue={`${year}-${String(month).padStart(2, "0")}`}
        minYear={signupDate?.getFullYear()}
        minMonth={signupDate ? signupDate.getMonth() + 1 : undefined}
        maxYear={maxYear}
        maxMonth={maxMonth}
        onClose={() => setIsPickerOpen(false)}
        onChange={handleMonthChange}
      />
    </>
  );
};
