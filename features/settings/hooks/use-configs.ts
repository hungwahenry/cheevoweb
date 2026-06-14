import { useQuery } from "@tanstack/react-query";
import { listConfigs } from "../api/list-configs";

export function useConfigs() {
  return useQuery({ queryKey: ["system-configs"], queryFn: listConfigs });
}
