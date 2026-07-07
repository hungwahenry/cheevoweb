import type { AuditEntry, EntityRef } from "@/lib/api/types";

export type OrderStatus = "pending" | "paid" | "cancelled" | "refunded";

export interface OrderCore {
  id: string;
  status: OrderStatus;
  subtotal_minor: number;
  fees_minor: number;
  total_minor: number;
  currency: string;
  items_count: number;
  paid_at: string | null;
  cancelled_at: string | null;
  refunded_at: string | null;
  created_at: string;
}

export interface OrderRow extends OrderCore {
  buyer: EntityRef;
  event: EntityRef;
  ref: EntityRef;
}

export interface OrderItem {
  id: string;
  ticket_name: string;
  quantity: number;
  unit_price_minor: number;
  subtotal_minor: number;
}

export interface OrderIssuedTicket {
  id: string;
  code: string;
  status: string;
}

export interface OrderDetail extends OrderCore {
  buyer: EntityRef;
  event: EntityRef;
  payment: EntityRef | null;
  items: OrderItem[];
  issued_tickets: OrderIssuedTicket[];
  audit_trail: AuditEntry[];
}

export interface ListOrdersParams {
  page: number;
  per_page: number;
  status?: OrderStatus;
  event_id?: string;
}
