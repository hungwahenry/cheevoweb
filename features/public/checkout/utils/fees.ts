import type { PublicTicket } from "@/features/public/events/types"

export type AppFee = { flatMinor: number; percentageBps: number }

export function subtotalMinor(
  tickets: PublicTicket[],
  quantities: Record<string, number>
): number {
  return tickets.reduce(
    (sum, ticket) => sum + ticket.gross_price * (quantities[ticket.id] ?? 0),
    0
  )
}

/** What this order's fee would be in the app — used to show the web-vs-app saving. */
export function appFeeMinor(subtotal: number, fee: AppFee): number {
  if (subtotal === 0) return 0
  return fee.flatMinor + Math.round((subtotal * fee.percentageBps) / 10_000)
}

export function savingsMinor(
  webFeeMinor: number,
  subtotal: number,
  fee: AppFee
): number {
  return Math.max(0, webFeeMinor - appFeeMinor(subtotal, fee))
}
