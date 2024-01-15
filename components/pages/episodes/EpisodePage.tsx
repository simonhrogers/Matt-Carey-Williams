import type { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'
import Link from 'next/link'

import { CustomPortableText } from '@/components/shared/CustomPortableText'
import { Header } from '@/components/shared/Header'
import ImageBox from '@/components/shared/ImageBox'
import type { EpisodePayload } from '@/types'
import ExhibitionPage from '@/components/shared/ExhibitionPage'

export interface EpisodePageProps {
  data: EpisodePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function EpisodePage({ data, encodeDataAttribute }: EpisodePageProps) {
  // Default to an empty object to allow previews on non-existent documents

  return (
    <ExhibitionPage 
      exhibition={data}
      label="Episode"
    />
  )
}

export default EpisodePage
