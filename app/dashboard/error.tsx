"use client"

import * as Sentry from "@sentry/nextjs"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <div className="space-y-1.5">
        <h1 className="text-xl font-semibold tracking-tight">
          Something went wrong
        </h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          This page hit an unexpected error. Try again, or reload the panel.
        </p>
        {error.digest ? (
          <p className="text-xs text-muted-foreground/60">
            Ref: {error.digest}
          </p>
        ) : null}
      </div>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  )
}
