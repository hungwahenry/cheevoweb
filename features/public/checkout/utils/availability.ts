import type { PublicTicket } from "@/features/public/events/types"

const MAX_PER_TICKET_CAP = 20
const ENDING_SOON_MS = 48 * 60 * 60 * 1000

export type TicketStatus = {
  buyable: boolean
  max: number
  label: string | null
  startsAt: string | null
  endsSoonAt: string | null
  remaining: number | null
}

export function ticketStatus(
  ticket: PublicTicket,
  now: number | null
): TicketStatus {
  const base = {
    startsAt: null,
    endsSoonAt: null,
    remaining: ticket.remaining,
  }

  if (ticket.status !== "on_sale") {
    return { ...base, buyable: false, max: 0, label: "Not on sale" }
  }

  if (ticket.sold_out) {
    return { ...base, buyable: false, max: 0, label: "Sold out" }
  }

  if (now !== null) {
    if (
      ticket.sales_starts_at &&
      new Date(ticket.sales_starts_at).getTime() > now
    ) {
      return {
        ...base,
        buyable: false,
        max: 0,
        startsAt: ticket.sales_starts_at,
        label: null,
      }
    }
    if (
      ticket.sales_ends_at &&
      new Date(ticket.sales_ends_at).getTime() <= now
    ) {
      return { ...base, buyable: false, max: 0, label: "Sales ended" }
    }
  }

  const endsSoon =
    now !== null &&
    ticket.sales_ends_at !== null &&
    new Date(ticket.sales_ends_at).getTime() - now <= ENDING_SOON_MS

  const max = Math.max(
    1,
    Math.min(
      MAX_PER_TICKET_CAP,
      ticket.max_per_order ?? MAX_PER_TICKET_CAP,
      ticket.max_per_user ?? MAX_PER_TICKET_CAP,
      ticket.remaining ?? MAX_PER_TICKET_CAP
    )
  )

  return {
    buyable: true,
    max,
    label: null,
    startsAt: null,
    endsSoonAt: endsSoon ? ticket.sales_ends_at : null,
    remaining: ticket.remaining,
  }
}
