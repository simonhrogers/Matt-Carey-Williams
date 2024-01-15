'use client'

import { type QueryResponseInitial } from '@sanity/react-loader/rsc'

import { projectBySlugQuery } from '@/sanity/lib/queries'
import { useQuery } from '@/sanity/loader/useQuery'
import { ScenePayload } from '@/types'

import ScenePage from './ScenePage'

type Props = {
  params: { slug: string }
  initial: QueryResponseInitial<ScenePayload | null>
}

export default function ScenePreview(props: Props) {
  const { params, initial } = props
  const { data, encodeDataAttribute } = useQuery<ScenePayload | null>(
    projectBySlugQuery,
    params,
    { initial },
  )

  return <ScenePage data={data!} encodeDataAttribute={encodeDataAttribute} />
}
