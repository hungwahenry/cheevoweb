import { api } from "@/lib/api/client"
import type { CheckoutItem, CreateResult } from "../types"

export type GuestBuyer = {
  email: string
  firstName?: string
  lastName?: string
}

export function createOrder(
  eventId: string,
  buyer: GuestBuyer,
  items: CheckoutItem[]
): Promise<CreateResult> {
  return api.post<CreateResult>(`/events/${eventId}/guest-orders`, {
    email: buyer.email,
    first_name: buyer.firstName || undefined,
    last_name: buyer.lastName || undefined,
    items,
    callback_url: `${window.location.origin}/checkout/return`,
  })
}
