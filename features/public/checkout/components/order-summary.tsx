import Link from "next/link"
import { formatMoney } from "@/lib/format"
import type { Quote } from "../types"

function Row({
  label,
  value,
  emphasis,
}: {
  label: string
  value: string
  emphasis?: boolean
}) {
  return (
    <div
      className={
        emphasis
          ? "flex items-center justify-between border-t border-border pt-2 text-base font-semibold"
          : "flex items-center justify-between text-foreground/70"
      }
    >
      <span>{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  )
}

export function OrderSummary({
  subtotal,
  quote,
  isLoading,
  savings,
}: {
  subtotal: number
  quote: Quote | null
  isLoading: boolean
  savings: number
}) {
  const pending = isLoading || !quote

  return (
    <div className="space-y-1.5 text-sm">
      <Row label="Subtotal" value={formatMoney(subtotal)} />
      <Row
        label="Service fee"
        value={pending ? "…" : formatMoney(quote.fees_minor)}
      />
      <Row
        label="Total"
        value={pending ? "…" : formatMoney(quote.total_minor)}
        emphasis
      />
      {savings > 0 ? (
        <p className="pt-1 text-xs text-foreground/60">
          Save {formatMoney(savings)} on fees by buying in the{" "}
          <Link href="/download" className="text-primary hover:underline">
            Cheevo app
          </Link>
          .
        </p>
      ) : null}
    </div>
  )
}
