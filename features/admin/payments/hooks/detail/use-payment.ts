import { useQuery } from "@tanstack/react-query"
import { getPayment } from "../../api/detail/get-payment"

export function usePayment(id: string) {
  return useQuery({
    queryKey: ["payment", id],
    queryFn: () => getPayment(id),
    enabled: Boolean(id),
  })
}
