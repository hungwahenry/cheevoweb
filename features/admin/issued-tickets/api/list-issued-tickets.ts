import { api } from "@/lib/api/client";
import type { Paginated } from "@/lib/api/types";
import type { IssuedTicket, ListIssuedTicketsParams } from "../types";

export function listIssuedTickets(
  params: ListIssuedTicketsParams,
): Promise<Paginated<IssuedTicket>> {
  return api.get<Paginated<IssuedTicket>>("/admin/issued-tickets", {
    page: params.page,
    per_page: params.per_page,
    status: params.status,
    event_id: params.event_id,
    q: params.q,
  });
}
