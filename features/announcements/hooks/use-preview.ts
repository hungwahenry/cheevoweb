import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { previewBroadcast } from "../api/preview-broadcast";
import type { BroadcastKind, Segment } from "../types";

export function usePreview(kind: BroadcastKind, audience: Segment) {
  return useQuery({
    queryKey: ["preview", kind, audience],
    queryFn: () => previewBroadcast(kind, audience),
    placeholderData: keepPreviousData,
    staleTime: 10_000,
  });
}
