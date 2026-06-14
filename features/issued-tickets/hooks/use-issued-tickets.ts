import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { listIssuedTickets } from "../api/list-issued-tickets";
import type { ListIssuedTicketsParams } from "../types";

export function useIssuedTickets(params: ListIssuedTicketsParams) {
  return useQuery({
    queryKey: ["issued-tickets", params],
    queryFn: () => listIssuedTickets(params),
    placeholderData: keepPreviousData,
  });
}
