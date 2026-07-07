import { useQuery } from "@tanstack/react-query";
import { getReport } from "../../api/detail/get-report";

export function useReport(id: string) {
  return useQuery({
    queryKey: ["report", id],
    queryFn: () => getReport(id),
    enabled: Boolean(id),
  });
}
