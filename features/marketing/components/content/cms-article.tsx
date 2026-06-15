import type { PublicPage, PublicPageSummary } from "../../types";
import { SiteFooterBar } from "../shell/site-footer-bar";
import { SiteHeader } from "../shell/site-header";

const PROSE = [
  "max-w-none text-foreground/80",
  "[&_p]:mt-4 [&_p]:leading-relaxed",
  "[&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-foreground",
  "[&_h3]:mt-8 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground",
  "[&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5",
  "[&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5",
  "[&_li]:leading-relaxed",
  "[&_a]:text-primary [&_a]:underline",
  "[&_strong]:font-semibold [&_strong]:text-foreground",
].join(" ");

export function CmsArticle({
  page,
  pages,
}: {
  page: PublicPage;
  pages: PublicPageSummary[];
}) {
  return (
    <main className="flex min-h-svh flex-col bg-background text-foreground">
      <SiteHeader />

      <article className="mx-auto w-full max-w-2xl flex-1 px-6 py-14 md:py-20">
        <h1 className="text-3xl font-black tracking-tight md:text-4xl">
          {page.title}
        </h1>
        <div
          className={`mt-10 ${PROSE}`}
          dangerouslySetInnerHTML={{ __html: page.body_html }}
        />
      </article>

      <div className="pb-12">
        <SiteFooterBar pages={pages} crossLink={{ href: "/", label: "Home" }} />
      </div>
    </main>
  );
}
