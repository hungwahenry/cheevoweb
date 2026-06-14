import { PageHeader } from "@/components/layout/page-header";
import { UsersTable } from "@/features/users/components/users-table";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Users" description="Every account on the platform." />
      <UsersTable />
    </div>
  );
}
