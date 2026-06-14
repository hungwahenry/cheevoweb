import type { PublicPage } from "../types";

export function CmsArticle({ page }: { page: PublicPage }) {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:py-20">
      <h1 className="text-3xl font-black tracking-tight md:text-4xl">
        {page.title}
      </h1>
      <div
        className="mt-8 max-w-none space-y-4 text-foreground/80 [&_a]:text-primary [&_a]:underline [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_li]:my-1 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6"
        dangerouslySetInnerHTML={{ __html: page.body_html }}
      />
    </article>
  );
}
