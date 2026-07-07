const TOKEN_KEY = "cheevo:order-token"

/** Survives the full-page redirect out to the payment provider and back. */
export const activeCheckout = {
  set(token: string) {
    try {
      sessionStorage.setItem(TOKEN_KEY, token)
    } catch {
      // sessionStorage unavailable (private mode); the emailed link is the fallback.
    }
  },
  get(): string | null {
    try {
      return sessionStorage.getItem(TOKEN_KEY)
    } catch {
      return null
    }
  },
  clear() {
    try {
      sessionStorage.removeItem(TOKEN_KEY)
    } catch {
      // no-op
    }
  },
}
