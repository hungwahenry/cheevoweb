import { format } from "date-fns";

export function formatDate(iso: string | null, pattern = "d MMM yyyy"): string {
  if (!iso) return "—";
  return format(new Date(iso), pattern);
}

export function formatDateTime(iso: string | null): string {
  return formatDate(iso, "d MMM yyyy, HH:mm");
}

export function formatMoney(minor: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(minor / 100);
}

/** An event's start time in its own timezone, for public share pages. */
export function formatEventTime(iso: string | null, tz: string | null): string {
  if (!iso) return "";
  return new Intl.DateTimeFormat("en-NG", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: tz ?? undefined,
  }).format(new Date(iso));
}
