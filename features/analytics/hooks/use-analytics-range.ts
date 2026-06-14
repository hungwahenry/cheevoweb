"use client";

import { parseAsInteger, parseAsStringLiteral, useQueryStates } from "nuqs";

export const RANGE_DAYS = [7, 30, 90, 365] as const;
export const RANGE_INTERVALS = ["day", "week", "month"] as const;

export function useAnalyticsRange() {
  return useQueryStates(
    {
      days: parseAsInteger.withDefault(30),
      interval: parseAsStringLiteral(RANGE_INTERVALS).withDefault("day"),
    },
    { history: "push", clearOnDefault: true },
  );
}
