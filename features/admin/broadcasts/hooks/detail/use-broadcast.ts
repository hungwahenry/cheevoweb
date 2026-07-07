import { useQuery } from "@tanstack/react-query";
import { getBroadcast } from "../../api/detail/get-broadcast";

export function useBroadcast(id: string) {
  return useQuery({
    queryKey: ["broadcast", id],
    queryFn: () => getBroadcast(id),
    enabled: Boolean(id),
  });
}
