import type { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'
import Link from 'next/link'

import { CustomPortableText } from '@/components/shared/CustomPortableText'
import { Header } from '@/components/shared/Header'
import ImageBox from '@/components/shared/ImageBox'
import type { EpisodePayload } from '@/types'
import ExhibitionPage from '@/components/shared/ExhibitionPage'
import PageHead from '@/components/shared/PageHead'

export interface EpisodePageProps {
  data: EpisodePayload | null
  settings: any
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function EpisodePage({ data, settings, encodeDataAttribute }: EpisodePageProps) {
  // Default to an empty object to allow previews on non-existent documents

  return (
    <>
      <PageHead data={data} settings={settings} />
      <ExhibitionPage 
        exhibition={data}
        label="Episode"
      />
    </>
  )
}

export default EpisodePage
