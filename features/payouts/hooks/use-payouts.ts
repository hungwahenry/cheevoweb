import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { listPayouts } from "../api/list-payouts";
import type { ListPayoutsParams } from "../types";

export function usePayouts(params: ListPayoutsParams) {
  return useQuery({
    queryKey: ["payouts", params],
    queryFn: () => listPayouts(params),
    placeholderData: keepPreviousData,
  });
}
