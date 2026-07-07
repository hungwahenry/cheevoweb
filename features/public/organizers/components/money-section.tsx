import { formatMoney } from "@/lib/format"
import type { Pricing } from "@/features/public/pricing/types"

export function MoneySection({ pricing }: { pricing: Pricing }) {
  const pct = pricing.percentageBps / 100
  const ticketMinor = 500_000
  const feeMinor =
    pricing.flatMinor +
    Math.round((ticketMinor * pricing.percentageBps) / 10_000)
  const totalMinor = ticketMinor + feeMinor

  const items = [
    {
      value: `${formatMoney(pricing.flatMinor)} + ${pct}%`,
      title: "Service fee",
      body: "Added at checkout — your buyers pay it, not you. You keep 100% of your ticket price.",
    },
    {
      value: `T+${pricing.holdWindowDays} days`,
      title: "Payouts",
      body: "From a cleared sale to your Nigerian bank account. No 30-day hold.",
    },
    {
      value: "₦0",
      title: "To start",
      body: "No subscription, no setup fee, no monthly bill.",
    },
  ]

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
      <div className="max-w-2xl">
        <p className="text-[11px] font-medium tracking-[0.22em] text-foreground/55 uppercase">
          What it costs
        </p>
        <h2 className="mt-4 text-[clamp(1.875rem,4vw,3rem)] leading-[1.1] font-bold tracking-[-0.025em]">
          Free to start. You only pay when you sell.
        </h2>
        <p className="mt-5 text-base text-foreground/65 md:text-lg">
          No subscription, no setup fees. The service fee is added at checkout —
          your buyers see it, and you keep 100% of your ticket price.
        </p>
      </div>

      <div className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
        {items.map((item) => (
          <div key={item.title} className="flex flex-col gap-2">
            <span className="text-4xl font-black tracking-tight md:text-5xl">
              {item.value}
            </span>
            <span className="text-sm font-semibold">{item.title}</span>
            <span className="text-sm leading-relaxed text-foreground/55">
              {item.body}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-14 max-w-2xl text-sm text-foreground/45">
        Worked example: a {formatMoney(ticketMinor)} ticket → your buyer pays{" "}
        {formatMoney(totalMinor)} ({formatMoney(feeMinor)} service fee). You
        receive the full {formatMoney(ticketMinor)}.
      </p>
    </section>
  )
}
