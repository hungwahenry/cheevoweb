import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { listAnnouncements } from "../api/list-announcements";
import type { ListAnnouncementsParams } from "../types";

export function useAnnouncements(params: ListAnnouncementsParams) {
  return useQuery({
    queryKey: ["announcements", params],
    queryFn: () => listAnnouncements(params),
    placeholderData: keepPreviousData,
  });
}
