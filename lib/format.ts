import { format } from "date-fns";

export function formatDate(iso: string | null, pattern = "d MMM yyyy"): string {
  if (!iso) return "—";
  return format(new Date(iso), pattern);
}

export function formatDateTime(iso: string | null): string {
  return formatDate(iso, "d MMM yyyy, HH:mm");
}

/** Minor units (kobo) → Naira. */
export function formatMoney(minor: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(minor / 100);
}
