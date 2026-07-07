import { api } from "@/lib/api/client"
import type { AuditEntry, Paginated } from "@/lib/api/types"
import type { ListAuditParams } from "../types"

export function listAuditLog(
  params: ListAuditParams
): Promise<Paginated<AuditEntry>> {
  return api.get<Paginated<AuditEntry>>("/admin/audit-log", {
    page: params.page,
    per_page: params.per_page,
    action: params.action,
    target_type: params.target_type,
  })
}
