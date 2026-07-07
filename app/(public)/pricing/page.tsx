import type { Metadata } from "next"
import { getPricing } from "@/features/public/pricing/api/get-pricing"
import { listPublicPages } from "@/features/public/pages/api/list-pages"
import { Faq } from "@/features/public/shell/components/faq"
import { SiteFooterBar } from "@/features/public/shell/components/site-footer-bar"
import { SiteHeader } from "@/features/public/shell/components/site-header"
import { StoreButton } from "@/features/public/shell/components/store-button"
import { formatMoney } from "@/lib/format"

export const metadata: Metadata = {
  title: "cheevo pricing — Free to start, you only pay when you sell",
  description:
    "No subscription or setup fee. A small service fee is added at checkout — your buyers pay it and you keep 100% of your ticket price. Payouts land in your bank.",
}

export default async function Pricing() {
  const [pricing, pages] = await Promise.all([
    getPricing(),
    listPublicPages().catch(() => []),
  ])

  const pct = pricing.percentageBps / 100
  const ticketMinor = 500_000
  const feeMinor =
    pricing.flatMinor +
    Math.round((ticketMinor * pricing.percentageBps) / 10_000)
  const totalMinor = ticketMinor + feeMinor

  const points = [
    {
      value: `${formatMoney(pricing.flatMinor)} + ${pct}%`,
      title: "Service fee",
      body: "Added at checkout — your buyers pay it, not you. You keep 100% of your ticket price.",
    },
    {
      value: `T+${pricing.holdWindowDays} days`,
      title: "Payouts",
      body: "From a cleared sale to your bank account. No 30-day hold.",
    },
    {
      value: "₦0",
      title: "To start",
      body: "No subscription, no setup fee, no monthly bill. Free events are free to host.",
    },
  ]

  return (
    <main className="flex min-h-svh flex-col bg-background text-foreground">
      <SiteHeader />

      <div className="mx-auto w-full max-w-5xl flex-1 px-6 py-14 md:px-10 md:py-20">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-10">
          <div className="flex flex-col">
            <p className="text-[11px] font-medium tracking-[0.22em] text-foreground/55 uppercase">
              Pricing
            </p>
            <h1 className="mt-5 text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.02] font-black tracking-[-0.035em]">
              Free to start. You only pay when you sell.
            </h1>
            <p className="mt-5 max-w-md text-base text-foreground/65 md:text-lg">
              No subscription, no setup fees. The service fee is added at
              checkout — your buyers see it, and you keep 100% of your ticket
              price.
            </p>

            <div className="mt-10 flex flex-col gap-6">
              {points.map((item) => (
                <div key={item.title}>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black tracking-tight md:text-3xl">
                      {item.value}
                    </span>
                    <span className="text-sm font-semibold">{item.title}</span>
                  </div>
                  <p className="mt-1 max-w-md text-sm leading-relaxed text-foreground/55">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <img
              src="/screenshots/org/dashboard.png"
              alt="Your earnings and payouts in the cheevo organizer app"
              className="w-[400px] max-w-full"
            />
          </div>
        </div>

        <div className="mt-16 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
          <p className="text-[11px] font-medium tracking-[0.22em] text-primary uppercase">
            Worked example
          </p>
          <p className="mt-3 text-foreground/80">
            A {formatMoney(ticketMinor)} ticket → your buyer pays{" "}
            {formatMoney(totalMinor)} ({formatMoney(feeMinor)} service fee). You
            receive the full{" "}
            <span className="font-semibold text-foreground">
              {formatMoney(ticketMinor)}
            </span>
            .
          </p>
          <p className="mt-4 text-xs text-foreground/50">
            Payout transfer fees: {formatMoney(pricing.tier1Minor)} on payouts
            up to {formatMoney(pricing.tier1NairaCeiling * 100)},{" "}
            {formatMoney(pricing.tier2Minor)} up to{" "}
            {formatMoney(pricing.tier2NairaCeiling * 100)}, then{" "}
            {formatMoney(pricing.tier3Minor)}.
          </p>
        </div>

        <div className="mt-14">
          <h2 className="text-xl font-bold tracking-tight md:text-2xl">
            Start selling
          </h2>
          <p className="mt-2 max-w-md text-sm text-foreground/60">
            Create your event, add tickets, and publish — all from the cheevo
            Organizer app.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <StoreButton store="apple" app="organizer" />
            <StoreButton store="google" app="organizer" />
          </div>
        </div>

        <Faq
          title="Pricing FAQ"
          items={[
            {
              q: "Who pays the service fee?",
              a: "Your buyers — it's added on top at checkout. You always receive the full face value of every ticket you sell.",
            },
            {
              q: "Is there a fee for free events?",
              a: "No. Free and RSVP events are completely free to host.",
            },
            {
              q: "When do I get my money?",
              a: `Sales clear after a short ${pricing.holdWindowDays}-day hold, then you request a payout straight to your bank from the app.`,
            },
          ]}
        />
      </div>

      <div className="pb-12">
        <SiteFooterBar
          pages={pages}
          crossLink={{ href: "/organizers", label: "For organizers" }}
        />
      </div>
    </main>
  )
}
