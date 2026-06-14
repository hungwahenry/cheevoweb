import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BroadcastDetail } from "@/features/broadcasts/components/detail/broadcast-detail";

export default async function BroadcastDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/dashboard/broadcasts">
          <ChevronLeft className="size-4" />
          Broadcasts
        </Link>
      </Button>
      <BroadcastDetail id={id} />
    </div>
  );
}
