import { api } from "@/lib/api/client";
import type { Paginated } from "@/lib/api/types";
import type { ListPayoutsParams, Payout } from "../types";

export function listPayouts(
  params: ListPayoutsParams,
): Promise<Paginated<Payout>> {
  return api.get<Paginated<Payout>>("/admin/payouts", {
    page: params.page,
    per_page: params.per_page,
    status: params.status,
    organisation_id: params.organisation_id,
  });
}
