export const STORE_LINKS = {
  apple: process.env.NEXT_PUBLIC_APP_STORE_URL ?? "",
  google: process.env.NEXT_PUBLIC_PLAY_STORE_URL ?? "",
} as const;
