"use client";

import { useParams, useSearchParams } from "next/navigation";

export const useReportRouteContext = () => {
  const { year, month } = useParams<{ year: string; month: string }>();
  const searchParams = useSearchParams();
  const userIdParam = searchParams.get("userId");

  const parsedYear = Number.parseInt(year, 10);
  const parsedMonth = Number.parseInt(month, 10);
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
