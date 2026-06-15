import Image from "next/image";
import Link from "next/link";
import type { PublicPageSummary } from "../../types";

export function SiteFooterBar({
  pages,
  crossLink,
}: {
  pages: PublicPageSummary[];
  crossLink: { href: string; label: string };
}) {
  return (
    <div className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 pt-8 md:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Image
            src="/images/logo.png"
            alt="cheevo"
            width={1024}
            height={300}
            className="h-6 w-auto self-start sm:self-center"
          />
          <nav className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-foreground/65">
            <Link
              href={crossLink.href}
              className="transition-colors hover:text-foreground"
            >
              {crossLink.label}
            </Link>
            {pages.map((page) => (
              <Link
                key={page.slug}
                href={`/pages/${page.slug}`}
                className="transition-colors hover:text-foreground"
              >
                {page.title}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-8 text-xs text-foreground/45">
          © {new Date().getFullYear()} cheevo · Made in Nigeria
        </p>
      </div>
    </div>
  );
}
