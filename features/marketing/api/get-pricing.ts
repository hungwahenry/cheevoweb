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
    feePct: num("orders.fee_percentage_bps", 0) / 100,
    feeFlatMinor: num("orders.fee_flat_minor", 0),
    settleDays: num("payouts.hold_window_days", 2),
  };
}
