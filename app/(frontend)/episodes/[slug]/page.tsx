import { toPlainText } from '@portabletext/react'
import { Metadata, ResolvingMetadata } from 'next'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { EpisodePage } from '@/components/pages/episodes/EpisodePage'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'
import { loadEpisode } from '@/sanity/loader/loadQuery'
const EpisodePreview = dynamic(
  () => import('@/components/pages/episodes/EpisodePreview'),
)

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { data: episode } = await loadEpisode(params.slug)
  const ogImage = urlForOpenGraphImage(episode?.coverImage)

  return {
    title: episode?.title,
    description: episode?.overview
      ? toPlainText(episode.overview)
      : (await parent).description,
    openGraph: ogImage
      ? {
          images: [ogImage, ...((await parent).openGraph?.images || [])],
        }
      : {},
  }
}

export function generateStaticParams() {
  return generateStaticSlugs('episodes')
}

export default async function EpisodeSlugRoute({ params }: Props) {
  const initial = await loadEpisode(params.slug)

  if (draftMode().isEnabled) {
    return <EpisodePreview params={params} initial={initial} />
  }

  if (!initial.data) {
    notFound()
  }

  return <EpisodePage data={initial.data} />
}