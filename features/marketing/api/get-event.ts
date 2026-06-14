import "server-only";
import { ApiError } from "@/lib/api/errors";
import { publicFetch } from "@/lib/api/public-fetch";
import type { PublicEvent } from "../types";

export async function getPublicEvent(slug: string): Promise<PublicEvent | null> {
  try {
    return await publicFetch<PublicEvent>(`events/${encodeURIComponent(slug)}`, {
      next: { revalidate: 120, tags: ["events", `event:${slug}`] },
    });
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}
