import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6 py-16 text-center">
      <Link href="/" aria-label="cheevo" className="inline-flex">
        <Image
          src="/images/logo.png"
          alt="cheevo"
          width={1024}
          height={300}
          priority
          className="h-7 w-auto"
        />
      </Link>

      <p className="text-sm font-medium tracking-[0.18em] text-primary uppercase">
        404
      </p>

      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Page not found
        </h1>
        <p className="mx-auto max-w-md text-foreground/60">
          The page you&rsquo;re looking for doesn&rsquo;t exist or may have
          moved.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button asChild size="lg">
          <Link href="/">Back to home</Link>
        </Button>
        <Button asChild size="lg" variant="ghost">
          <Link href="/download">Get the app</Link>
        </Button>
      </div>
    </main>
  )
}
