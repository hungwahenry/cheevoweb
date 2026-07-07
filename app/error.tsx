"use client"

import * as Sentry from "@sentry/nextjs"
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
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
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6 py-16 text-center">
      <Link href="/" aria-label="Cheevo" className="inline-flex">
        <Image
          src="/images/logo.png"
          alt="Cheevo"
          width={1024}
          height={300}
          className="h-7 w-auto"
        />
      </Link>

      <p className="text-sm font-medium tracking-[0.18em] text-primary uppercase">
        Error
      </p>

      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Something went wrong
        </h1>
        <p className="mx-auto max-w-md text-foreground/60">
          An unexpected error occurred. Please try again &mdash; if it keeps
          happening, come back in a little while.
        </p>
        {error.digest ? (
          <p className="text-xs text-foreground/40">Ref: {error.digest}</p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button size="lg" onClick={() => reset()}>
          Try again
        </Button>
        <Button asChild size="lg" variant="ghost">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </main>
  )
}
