import "server-only";
import { publicFetch } from "@/lib/api/public-fetch";
import type { Pricing } from "../types";

export async function getPricing(): Promise<Pricing> {
  const config = await publicFetch<Record<string, unknown>>("config", {
    next: { revalidate: 600 },
  }).catch(() => ({}) as Record<string, unknown>);

  const num = (key: string, fallback: number): number =>
    typeof config[key] === "number" ? (config[key] as number) : fallback;

  return {
    flatMinor: num("orders.fee_flat_minor", 10000),
    percentageBps: num("orders.fee_percentage_bps", 500),
    holdWindowDays: num("payouts.hold_window_days", 2),
    tier1NairaCeiling: num("payouts.transfer_fee_tier_1_naira", 5000),
    tier2NairaCeiling: num("payouts.transfer_fee_tier_2_naira", 50000),
    tier1Minor: num("payouts.transfer_fee_tier_1_minor", 1000),
    tier2Minor: num("payouts.transfer_fee_tier_2_minor", 2500),
    tier3Minor: num("payouts.transfer_fee_tier_3_minor", 5000),
  };
}
