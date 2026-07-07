import { useQuery } from "@tanstack/react-query";
import { listFlags } from "../api/list-flags";

export function useFlags() {
  return useQuery({ queryKey: ["feature-flags"], queryFn: listFlags });
}
