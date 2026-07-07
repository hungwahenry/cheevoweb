export type CheckoutItem = { ticket_id: string; quantity: number }

export type QuoteLine = {
  ticket_id: string
  ticket_name: string
  quantity: number
  unit_price_minor: number
  subtotal_minor: number
}

export type Quote = {
  subtotal_minor: number
  fees_minor: number
  total_minor: number
  currency: string
  items: QuoteLine[]
}

export type CreateResult = {
  order: { id: string; status: string; total_minor: number }
  access_token: string | null
  authorization_url: string | null
}

export type IssuedTicketView = {
  id: string
  code: string
  status: "valid" | "scanned" | "revoked"
  event_id: string
  scanned_at: string | null
  created_at: string
}

export type OrderView = {
  id: string
  event_id: string
  status: "pending" | "paid" | "cancelled" | "refunded"
  subtotal_minor: number
  fees_minor: number
  total_minor: number
  currency: string
  paid_at: string | null
  created_at: string
  items?: {
    id: string
    ticket_name: string
    quantity: number
    unit_price_minor: number
    subtotal_minor: number
  }[]
  issued_tickets?: IssuedTicketView[]
}
