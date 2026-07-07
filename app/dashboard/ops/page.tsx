import { PageHeader } from "@/components/layout/page-header";
import { OpsCommands } from "@/features/admin/ops/components/ops-commands";
import { OpsHealth } from "@/features/admin/ops/components/ops-health";

export default function OpsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Ops" description="System health and maintenance commands." />
      <OpsHealth />
      <div className="space-y-3">
        <h2 className="text-sm font-medium">Maintenance commands</h2>
        <OpsCommands />
      </div>
    </div>
  );
}
