/** Clears the session via the BFF logout route (revokes the backend token + drops the cookie). */
export async function logout(): Promise<void> {
  await fetch("/api/auth/logout", { method: "POST" });
}
