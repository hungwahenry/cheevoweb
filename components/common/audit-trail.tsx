import { formatDateTime } from "@/lib/format";
import type { AuditEntry } from "@/lib/api/types";

export function AuditTrail({ entries }: { entries: AuditEntry[] }) {
  if (entries.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">
        No admin actions recorded.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {entries.map((entry) => (
        <li key={entry.id} className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm font-medium">{entry.action}</p>
            {entry.reason && (
              <p className="text-muted-foreground truncate text-sm">
                {entry.reason}
              </p>
            )}
            <p className="text-muted-foreground text-xs">by {entry.admin.label}</p>
          </div>
          <time className="text-muted-foreground shrink-0 text-xs">
            {formatDateTime(entry.created_at)}
          </time>
        </li>
      ))}
    </ul>
  );
}
