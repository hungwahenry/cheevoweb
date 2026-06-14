import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { OrganisationDetail } from "@/features/organisations/components/detail/organisation-detail";

export default async function OrganisationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/dashboard/organisations">
          <ChevronLeft className="size-4" />
          Organisations
        </Link>
      </Button>
      <OrganisationDetail id={id} />
    </div>
  );
}
