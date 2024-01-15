'use client'

import { type QueryResponseInitial } from '@sanity/react-loader/rsc'

import { episodesPageQuery } from '@/sanity/lib/queries'
import { useQuery } from '@/sanity/loader/useQuery'
import { EpisodesPagePayload } from '@/types'

import EpisodesPage from './EpisodesPage'

type Props = {
  initial: QueryResponseInitial<EpisodesPagePayload | null>
}

export default function EpisodesPagePreview(props: Props) {
  const { initial } = props
  const { data, encodeDataAttribute } = useQuery<EpisodesPagePayload | null>(
    episodesPageQuery,
    {},
    { initial },
  )

  if (!data) {
    return (
      <div className="text-center">
        Please start editing your Episodes document to see the preview!
      </div>
    )
  }

  return <EpisodesPage data={data} encodeDataAttribute={encodeDataAttribute} />
}
