import { PageHeader } from "@/components/layout/page-header";
import { ActionItems } from "@/features/analytics/components/action-items";
import { OverviewCards } from "@/features/analytics/components/overview-cards";
import { RevenueChart } from "@/features/analytics/components/revenue-chart";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" description="Platform overview at a glance." />
      <ActionItems />
      <OverviewCards />
      <RevenueChart />
    </div>
  );
}
