import { httpClient } from "@/shared/api/http-client";

import type { CalendarCardVariant } from "../model/calendar-share.types";

export const fetchCalendarCardImage = (
  year: number,
  month: number,
  variant: CalendarCardVariant,
): Promise<Blob> => {
  const type = variant === 1 ? 4 : 5;
  return httpClient.getBlob(`/images/share/calendar?type=${type}&year=${year}&month=${month}`);
};
