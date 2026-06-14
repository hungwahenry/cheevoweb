import { PageHeader } from "@/components/layout/page-header";
import { AnnouncementsTable } from "@/features/announcements/components/announcements-table";

export default function AnnouncementsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Announcements" description="Platform broadcasts — system notices and marketing." />
      <AnnouncementsTable />
    </div>
  );
}
