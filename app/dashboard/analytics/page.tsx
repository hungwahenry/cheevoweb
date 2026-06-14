import { PageHeader } from "@/components/layout/page-header";
import { AnalyticsView } from "@/features/analytics/components/analytics-view";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        description="Revenue, payments and engagement trends."
      />
      <AnalyticsView />
    </div>
  );
}
