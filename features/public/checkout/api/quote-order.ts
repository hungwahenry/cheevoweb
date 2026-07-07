import { api } from "@/lib/api/client"
import type { CheckoutItem, Quote } from "../types"

export function quoteOrder(
  eventId: string,
  items: CheckoutItem[]
): Promise<Quote> {
  return api.post<Quote>(`/events/${eventId}/guest-orders/quote`, { items })
}
