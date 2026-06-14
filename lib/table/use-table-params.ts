"use client";

import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

/**
 * URL-synced pagination + search shared by every list view. Feature-specific
 * filters are layered on top by each feature with their own nuqs params.
 */
export function useTableParams(defaultPerPage = 25) {
  return useQueryStates(
    {
      page: parseAsInteger.withDefault(1),
      per_page: parseAsInteger.withDefault(defaultPerPage),
      q: parseAsString.withDefault(""),
    },
    { history: "push", clearOnDefault: true },
  );
}
