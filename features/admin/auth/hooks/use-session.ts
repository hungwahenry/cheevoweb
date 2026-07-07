import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/me";

export const sessionKey = ["session"] as const;

/** The signed-in admin. Route access is already gated by the proxy cookie check. */
export function useSession() {
  return useQuery({
    queryKey: sessionKey,
    queryFn: getMe,
    retry: false,
    staleTime: 5 * 60_000,
  });
}
