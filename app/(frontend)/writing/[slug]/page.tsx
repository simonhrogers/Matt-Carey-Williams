import { toPlainText } from '@portabletext/react'
import { Metadata, ResolvingMetadata } from 'next'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { WritingPage } from '@/components/pages/writing/WritingPage'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'
import { loadWriting } from '@/sanity/loader/loadQuery'
const WritingPreview = dynamic(
  () => import('@/components/pages/writing/WritingPreview'),
)

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { data: writing } = await loadWriting(params.slug)
  const ogImage = urlForOpenGraphImage(writing?.coverImage)

  return {
    title: writing?.title,
    description: writing?.overview
      ? toPlainText(writing.overview)
      : (await parent).description,
    openGraph: ogImage
      ? {
          images: [ogImage, ...((await parent).openGraph?.images || [])],
        }
      : {},
  }
}

export function generateStaticParams() {
  return generateStaticSlugs('writing')
}

export default async function WritingSlugRoute({ params }: Props) {
  const initial = await loadWriting(params.slug)

  if (draftMode().isEnabled) {
    return <WritingPreview params={params} initial={initial} />
  }

  if (!initial.data) {
    notFound()
  }

  return <WritingPage data={initial.data} />
}