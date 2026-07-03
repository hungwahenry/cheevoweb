export type AppTarget = "attendee" | "organizer";

export const STORE_LINKS: Record<AppTarget, { apple: string; google: string }> = {
  attendee: {
    apple: process.env.NEXT_PUBLIC_APP_STORE_URL ?? "",
    google: process.env.NEXT_PUBLIC_PLAY_STORE_URL ?? "",
  },
  organizer: {
    apple: process.env.NEXT_PUBLIC_ORGANIZER_APP_STORE_URL ?? "",
    google: process.env.NEXT_PUBLIC_ORGANIZER_PLAY_STORE_URL ?? "",
  },
} as const;
