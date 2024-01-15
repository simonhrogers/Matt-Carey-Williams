'use client'

import { type QueryResponseInitial } from '@sanity/react-loader/rsc'

import { projectBySlugQuery } from '@/sanity/lib/queries'
import { useQuery } from '@/sanity/loader/useQuery'
import { EpisodePayload } from '@/types'

import EpisodePage from './EpisodePage'

type Props = {
  params: { slug: string }
  initial: QueryResponseInitial<EpisodePayload | null>
}

export default function EpisodePreview(props: Props) {
  const { params, initial } = props
  const { data, encodeDataAttribute } = useQuery<EpisodePayload | null>(
    projectBySlugQuery,
    params,
    { initial },
  )

  return <EpisodePage data={data!} encodeDataAttribute={encodeDataAttribute} />
}
