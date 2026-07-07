import { ApiError } from "@/lib/api/errors";
import type { Welcome } from "../../types";

export interface UpdateWelcomePayload {
  headline?: string;
  subheadline?: string;
  background?: File | null;
  removeBackground?: boolean;
}

/** Multipart update — text fields plus an optional background image (forwarded via the proxy). */
export async function updateWelcome(
  payload: UpdateWelcomePayload,
): Promise<Welcome> {
  const form = new FormData();
  if (payload.headline !== undefined) form.set("headline", payload.headline);
  if (payload.subheadline !== undefined)
    form.set("subheadline", payload.subheadline);
  if (payload.background) form.set("background", payload.background);
  if (payload.removeBackground) form.set("remove_background", "true");

  const response = await fetch("/api/v1/admin/welcome", {
    method: "POST",
    body: form,
  });
  const json = await response.json();

  if (!response.ok) {
    throw new ApiError(
      json.message ?? "Update failed.",
      response.status,
      json.code,
      json.errors,
    );
  }

  return json.data as Welcome;
}
