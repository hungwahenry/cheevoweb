import { format } from "date-fns"

export function formatDate(iso: string | null, pattern = "d MMM yyyy"): string {
  if (!iso) return "—"
  return format(new Date(iso), pattern)
}

export function formatDateTime(iso: string | null): string {
  return formatDate(iso, "d MMM yyyy, HH:mm")
}

export function formatMoney(minor: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(minor / 100)
}

export function formatEventWhen(
  iso: string | null,
  tz: string | null
): string | null {
  if (!iso) return null
  try {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZone: tz ?? undefined,
    }).format(new Date(iso))
  } catch {
    return null
  }
}

export function formatTimeRange(
  start: string | null,
  end: string | null,
  tz: string | null
): string | null {
  if (!start) return null
  const time = (iso: string) => {
    try {
      return new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZone: tz ?? undefined,
      }).format(new Date(iso))
    } catch {
      return ""
    }
  }
  const from = time(start)
  if (!from) return null
  const to = end ? time(end) : ""
  return to ? `${from} – ${to}` : from
}

export function formatEventPrice(
  min: number | null,
  max: number | null,
  currency: string
): string {
  const money = (minor: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(minor / 100)
  if (min == null || min === 0) return "Free"
  if (max != null && max !== min) return `${money(min)} – ${money(max)}`
  return `From ${money(min)}`
}
