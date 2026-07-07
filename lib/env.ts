import "server-only"

/** Server-only configuration. Never import this from a Client Component. */
export const env = {
  backendUrl: process.env.BACKEND_URL ?? "http://127.0.0.1:3000",
}
