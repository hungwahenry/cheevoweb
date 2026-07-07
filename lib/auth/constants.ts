/** Plain constants — safe to import from Proxy, Client, or Server. No runtime deps. */
export const SESSION_COOKIE = "cheevo_admin_session"

/** 30 days — matches the backend token TTL. */
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30
