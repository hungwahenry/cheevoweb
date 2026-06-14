import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ReportDetail } from "@/features/reports/components/detail/report-detail";

export default async function ReportDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/dashboard/reports">
          <ChevronLeft className="size-4" />
          Reports
        </Link>
      </Button>
      <ReportDetail id={id} />
    </div>
  );
}
