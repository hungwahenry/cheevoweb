import type { EntityRef } from "@/lib/api/types";

export type IssuedTicketStatus = "valid" | "scanned" | "revoked";

export interface IssuedTicket {
  id: string;
  code: string;
  status: IssuedTicketStatus;
  ticket_name: string;
  order_id: string;
  scanned_at: string | null;
  created_at: string;
  holder: EntityRef;
  event: EntityRef;
}

export interface ListIssuedTicketsParams {
  page: number;
  per_page: number;
  status?: IssuedTicketStatus;
  event_id?: string;
  q?: string;
}
