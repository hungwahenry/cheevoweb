import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getPayments } from "../api/payments";

export function usePayments(days: number) {
  return useQuery({
    queryKey: ["analytics", "payments", days],
    queryFn: () => getPayments(days),
    placeholderData: keepPreviousData,
  });
}
