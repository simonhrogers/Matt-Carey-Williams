import { toPlainText } from '@portabletext/react'
import { Metadata, ResolvingMetadata } from 'next'
import dynamicC from 'next/dynamic'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { ScenePage } from '@/components/pages/scenes/ScenePage'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'
import { loadScene } from '@/sanity/loader/loadQuery'
const ScenePreview = dynamicC(
  () => import('@/components/pages/scenes/ScenePreview'),
)

type Props = {
  params: { slug: string }
}

export const dynamic = 'force-dynamic'

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { data: scene } = await loadScene(params.slug)
  const ogImage = urlForOpenGraphImage(scene?.coverImage)

  return {
    title: scene?.title,
    description: scene?.overview
      ? toPlainText(scene.overview)
      : (await parent).description,
    openGraph: ogImage
      ? {
          images: [ogImage, ...((await parent).openGraph?.images || [])],
        }
      : {},
  }
}

export function generateStaticParams() {
  return generateStaticSlugs('scene')
}

export default async function SceneSlugRoute({ params }: Props) {
  const initial = await loadScene(params.slug)

  if (draftMode().isEnabled) {
    return <ScenePreview params={params} initial={initial} />
  }

  if (!initial.data) {
    notFound()
  }

  return <ScenePage data={initial.data} />
}