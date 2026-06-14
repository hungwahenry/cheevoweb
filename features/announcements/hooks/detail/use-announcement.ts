import { useQuery } from "@tanstack/react-query";
import { getAnnouncement } from "../../api/detail/get-announcement";

export function useAnnouncement(id: string) {
  return useQuery({
    queryKey: ["announcement", id],
    queryFn: () => getAnnouncement(id),
    enabled: Boolean(id),
  });
}
