import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getPublicPage } from "@/features/public/pages/api/get-page"
import { listPublicPages } from "@/features/public/pages/api/list-pages"
import { CmsArticle } from "@/features/public/pages/components/cms-article"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const page = await getPublicPage(slug)
  if (!page) return { title: "Not found — cheevo" }
  return {
    title: `${page.title} — cheevo`,
    description: page.meta_description ?? undefined,
  }
}

export default async function CmsPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [page, pages] = await Promise.all([
    getPublicPage(slug),
    listPublicPages().catch(() => []),
  ])
  if (!page) notFound()
  return <CmsArticle page={page} pages={pages} />
}
