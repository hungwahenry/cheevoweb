import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnnouncementDetail } from "@/features/announcements/components/detail/announcement-detail";

export default async function AnnouncementDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/dashboard/announcements">
          <ChevronLeft className="size-4" />
          Announcements
        </Link>
      </Button>
      <AnnouncementDetail id={id} />
    </div>
  );
}
