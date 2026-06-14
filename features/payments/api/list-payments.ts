import { api } from "@/lib/api/client";
import type { Paginated } from "@/lib/api/types";
import type { ListPaymentsParams, PaymentRow } from "../types";

export function listPayments(
  params: ListPaymentsParams,
): Promise<Paginated<PaymentRow>> {
  return api.get<Paginated<PaymentRow>>("/admin/payments", {
    page: params.page,
    per_page: params.per_page,
    status: params.status,
    provider: params.provider,
  });
}
