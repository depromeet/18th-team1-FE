import { httpClient } from "@/shared/api/http-client";

import type { CalendarCardVariant } from "../model/calendar-share.types";

export const fetchCalendarCardImage = (
  year: number,
  month: number,
  variant: CalendarCardVariant,
): Promise<Blob> => httpClient.getBlob(`/calendars/${year}/${month}/share?variant=${variant}`);
