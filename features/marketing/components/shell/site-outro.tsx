import type { AppTarget } from "../../config/store-links";
import type { PublicPageSummary } from "../../types";
import { DownloadCta } from "./download-cta";
import { SiteFooterBar } from "./site-footer-bar";

export function SiteOutro({
  pages,
  title,
  body,
  crossLink,
  app = "attendee",
}: {
  pages: PublicPageSummary[];
  title: string;
  body: string;
  crossLink: { href: string; label: string };
  app?: AppTarget;
}) {
  return (
    <footer className="pb-12 pt-20 md:pt-28">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-[clamp(2.25rem,6vw,4rem)] font-black leading-[1.02] tracking-[-0.035em]">
          {title}
        </h2>
        <p className="mt-5 text-base text-foreground/65 md:text-lg">{body}</p>
        <DownloadCta app={app} className="mt-8 justify-center" />
      </div>

      <div className="mt-24">
        <SiteFooterBar pages={pages} crossLink={crossLink} />
      </div>
    </footer>
  );
}
