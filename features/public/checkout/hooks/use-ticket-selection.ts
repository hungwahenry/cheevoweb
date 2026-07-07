import { useCallback, useMemo, useState } from "react"
import type { CheckoutItem } from "../types"

export function useTicketSelection() {
  const [quantities, setQuantities] = useState<Record<string, number>>({})

  // The selector clamps to each ticket's availability max; the store just holds it.
  const setQuantity = useCallback((ticketId: string, next: number) => {
    setQuantities((current) => ({
      ...current,
      [ticketId]: Math.max(0, next),
    }))
  }, [])

  const items = useMemo<CheckoutItem[]>(
    () =>
      Object.entries(quantities)
        .filter(([, quantity]) => quantity > 0)
        .map(([ticket_id, quantity]) => ({ ticket_id, quantity })),
    [quantities]
  )

  return { quantities, setQuantity, items, hasSelection: items.length > 0 }
}
