"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import "./globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="antialiased">
        <main className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6 py-16 text-center">
          {/* Plain <img>: global-error replaces the root layout, so keep this
          boundary free of next/image and other app context. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.png" alt="cheevo" className="h-7 w-auto" />

          <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
            Error
          </p>

          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Something went wrong
            </h1>
            <p className="mx-auto max-w-md text-foreground/60">
              An unexpected error occurred. Please reload the page.
            </p>
            {error.digest ? (
              <p className="text-xs text-foreground/40">Ref: {error.digest}</p>
            ) : null}
          </div>

          <button
            onClick={() => reset()}
            className="rounded-4xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
