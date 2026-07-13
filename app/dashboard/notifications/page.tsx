import { PageHeader } from "@/components/admin/layout/page-header"
import { NotificationsFeed } from "@/features/admin/notifications/components/notifications-feed"

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Alerts"
        description="Critical actions taken by users and organisers across the platform."
      />
      <NotificationsFeed />
    </div>
  )
}
