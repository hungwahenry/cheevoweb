import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { EventDetail } from "@/features/admin/events/components/detail/event-detail"

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/dashboard/events">
          <ChevronLeft className="size-4" />
          Events
        </Link>
      </Button>
      <EventDetail id={id} />
    </div>
  )
}
