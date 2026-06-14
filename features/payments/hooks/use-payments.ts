import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { listPayments } from "../api/list-payments";
import type { ListPaymentsParams } from "../types";

export function usePayments(params: ListPaymentsParams) {
  return useQuery({
    queryKey: ["payments", params],
    queryFn: () => listPayments(params),
    placeholderData: keepPreviousData,
  });
}
