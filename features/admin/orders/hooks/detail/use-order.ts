import { useQuery } from "@tanstack/react-query";
import { getOrder } from "../../api/detail/get-order";

export function useOrder(id: string) {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrder(id),
    enabled: Boolean(id),
  });
}
