import Image from "next/image"
import Link from "next/link"

export function SiteHeader() {
  return (
    <header className="px-6 py-5 md:px-10 md:py-6">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4">
        <Link href="/" aria-label="cheevo" className="inline-flex">
          <Image
            src="/images/logo.png"
            alt="cheevo"
            width={1024}
            height={300}
            priority
            className="h-6 w-auto md:h-7"
          />
        </Link>
        <Link
          href="/organizers"
          className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
        >
          For Organizers
        </Link>
      </div>
    </header>
  )
}
