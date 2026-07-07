import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { NewBroadcast } from "@/features/admin/announcements/components/new-broadcast";

export default function NewBroadcastPage() {
  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/dashboard/announcements">
          <ChevronLeft className="size-4" />
          Announcements
        </Link>
      </Button>
      <PageHeader title="New broadcast" description="Compose a system notice or marketing message." />
      <NewBroadcast />
    </div>
  );
}
