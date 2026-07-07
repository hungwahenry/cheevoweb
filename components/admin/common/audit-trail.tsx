import { formatDateTime } from "@/lib/format"
import type { AuditEntry } from "@/lib/api/types"

export function AuditTrail({ entries }: { entries: AuditEntry[] }) {
  if (entries.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No admin actions recorded.
      </p>
    )
  }

  return (
    <ul className="space-y-3">
      {entries.map((entry) => (
        <li key={entry.id} className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm font-medium">{entry.action}</p>
            {entry.reason && (
              <p className="truncate text-sm text-muted-foreground">
                {entry.reason}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              by {entry.admin.label}
            </p>
          </div>
          <time className="shrink-0 text-xs text-muted-foreground">
            {formatDateTime(entry.created_at)}
          </time>
        </li>
      ))}
    </ul>
  )
}
