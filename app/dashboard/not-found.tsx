import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DashboardNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <div className="space-y-1.5">
        <p className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
          404
        </p>
        <h1 className="text-xl font-semibold tracking-tight">Page not found</h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          This admin page doesn&apos;t exist or has moved.
        </p>
      </div>
      <Button asChild>
        <Link href="/dashboard">Back to dashboard</Link>
      </Button>
    </div>
  )
}
