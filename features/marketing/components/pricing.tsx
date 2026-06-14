import { formatMoney } from "@/lib/format";
import type { Pricing } from "../types";

export function PricingSection({ pricing }: { pricing: Pricing }) {
  const serviceFee =
    pricing.feePct > 0
      ? `${pricing.feePct}%${
          pricing.feeFlatMinor > 0 ? ` + ${formatMoney(pricing.feeFlatMinor)}` : ""
        }`
      : "Low & flat";

  const cards = [
    {
      title: "Service fee",
      value: serviceFee,
      body: "Charged per ticket sold. Free events stay free.",
    },
    {
      title: "Payouts",
      value: `T+${pricing.settleDays} days`,
      body: "Withdraw to your bank after a short settlement window.",
    },
    {
      title: "To start",
      value: "₦0",
      body: "No monthly fees — you only pay when you sell.",
    },
  ];

  return (
    <section className="px-6 py-16 md:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Pricing
          </span>
          <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
            Free to start. You only pay when you sell.
          </h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-foreground/10 bg-card p-6"
            >
              <p className="text-sm text-foreground/55">{card.title}</p>
              <p className="mt-1 text-2xl font-bold tracking-tight">
                {card.value}
              </p>
              <p className="mt-2 text-sm text-foreground/60">{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
