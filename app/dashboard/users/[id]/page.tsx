import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserDetail } from "@/features/users/components/detail/user-detail";

export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/dashboard/users">
          <ChevronLeft className="size-4" />
          Users
        </Link>
      </Button>
      <UserDetail id={id} />
    </div>
  );
}
