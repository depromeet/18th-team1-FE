"use client";

import { useSearchParams } from "next/navigation";

export const useReportRouteContext = () => {
  const searchParams = useSearchParams();
  const yearParam = searchParams.get("year");
  const monthParam = searchParams.get("month");
  const userIdParam = searchParams.get("userId");

  const parsedYear = Number.parseInt(yearParam ?? "", 10);
  const parsedMonth = Number.parseInt(monthParam ?? "", 10);
  const isValidReportMonth =
    Number.isInteger(parsedYear) &&
    Number.isInteger(parsedMonth) &&
    parsedMonth >= 1 &&
    parsedMonth <= 12;

  const parsedUserId = userIdParam ? Number.parseInt(userIdParam, 10) : undefined;
  const isSharedView = parsedUserId !== undefined && Number.isInteger(parsedUserId);

  return {
    year: parsedYear,
    month: parsedMonth,
    userId: isSharedView ? parsedUserId : undefined,
    isSharedView,
    isValidReportMonth,
  };
};
