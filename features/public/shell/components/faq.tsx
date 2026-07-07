export type FaqItem = { q: string; a: string }

/** Static (SEO-friendly) FAQ with FAQPage structured data. */
export function Faq({
  title = "Questions?",
  items,
}: {
  title?: string
  items: FaqItem[]
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  }

  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
      <h2 className="text-3xl font-black tracking-[-0.03em] md:text-4xl">
        {title}
      </h2>
      <div className="mt-8 divide-y divide-border border-t border-border">
        {items.map((item) => (
          <details key={item.q} className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold md:text-lg">
              {item.q}
              <span className="text-2xl leading-none text-foreground/40 transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 max-w-2xl leading-7 text-foreground/65">
              {item.a}
            </p>
          </details>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  )
}
