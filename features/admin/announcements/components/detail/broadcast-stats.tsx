"use client";

import { DetailSection, Empty } from "@/components/common/detail-section";
import { StatGrid } from "@/components/common/stat-grid";
import type { AnnouncementDetail } from "../../types";

export function BroadcastStats({ broadcast }: { broadcast: AnnouncementDetail }) {
  return (
    <div className="space-y-6">
      <StatGrid
        stats={[
          { label: "Recipients", value: broadcast.stats.recipients.toLocaleString() },
          { label: "Email", value: broadcast.stats.email.toLocaleString() },
          { label: "Push", value: broadcast.stats.push.toLocaleString() },
          { label: "In-app", value: broadcast.stats.inapp.toLocaleString() },
          { label: "Clicks", value: broadcast.stats.clicks.toLocaleString() },
          { label: "Failed", value: broadcast.stats.failed.toLocaleString() },
        ]}
      />

      <DetailSection title="Message">
        <p className="text-sm whitespace-pre-wrap">{broadcast.body}</p>
      </DetailSection>

      <DetailSection title="Tracked links">
        {broadcast.links.length ? (
          <ul className="space-y-2">
            {broadcast.links.map((link) => (
              <li
                key={link.id}
                className="flex items-center justify-between gap-3 text-sm"
              >
                <span className="text-muted-foreground truncate">
                  {link.url}
                </span>
                <span className="shrink-0 tabular-nums">
                  {link.click_count.toLocaleString()} clicks
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <Empty>No tracked links.</Empty>
        )}
      </DetailSection>
    </div>
  );
}
