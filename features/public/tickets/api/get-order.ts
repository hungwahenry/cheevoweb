import "server-only"
import { publicFetch } from "@/lib/api/public-fetch"
import type { OrderView } from "@/features/public/checkout/types"

export function getGuestOrder(token: string): Promise<OrderView> {
  return publicFetch<OrderView>(`orders/token/${token}`, { cache: "no-store" })
}
