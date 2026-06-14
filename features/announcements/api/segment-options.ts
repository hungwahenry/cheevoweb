import { api } from "@/lib/api/client";
import type { SegmentOptions } from "../types";

export function getSegmentOptions(): Promise<SegmentOptions> {
  return api.get<SegmentOptions>("/admin/announcements/segment-options");
}
