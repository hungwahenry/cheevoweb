import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { listAuditLog } from "../api/list-audit-log";
import type { ListAuditParams } from "../types";

export function useAuditLog(params: ListAuditParams) {
  return useQuery({
    queryKey: ["audit-log", params],
    queryFn: () => listAuditLog(params),
    placeholderData: keepPreviousData,
  });
}
