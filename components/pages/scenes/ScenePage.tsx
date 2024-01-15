import type { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'
import Link from 'next/link'

import { CustomPortableText } from '@/components/shared/CustomPortableText'
import type { ScenePayload } from '@/types'
import ExhibitionPage from '@/components/shared/ExhibitionPage'

export interface ScenePageProps {
  data: ScenePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function ScenePage({ data, encodeDataAttribute }: ScenePageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const {
    client,
    coverImage,
    description,
    duration,
    overview,
    site,
    tags,
    title,
  } = data ?? {}

  const startYear = new Date(duration?.start!).getFullYear()
  const endYear = duration?.end ? new Date(duration?.end).getFullYear() : 'Now'

  return (
    <ExhibitionPage 
      exhibition={data}
      label="Scene"
    />
  )
}

export default ScenePage
