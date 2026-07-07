import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { listReports } from "../api/list-reports";
import type { ListReportsParams } from "../types";

export function useReports(params: ListReportsParams) {
  return useQuery({
    queryKey: ["reports", params],
    queryFn: () => listReports(params),
    placeholderData: keepPreviousData,
  });
}
