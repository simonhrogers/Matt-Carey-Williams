'use client'

import { type QueryResponseInitial } from '@sanity/react-loader/rsc'

import { scenesPageQuery } from '@/sanity/lib/queries'
import { useQuery } from '@/sanity/loader/useQuery'
import { ScenesPagePayload } from '@/types'

import ScenesPage from './ScenesPage'

type Props = {
  initial: QueryResponseInitial<ScenesPagePayload | null>
}

export default function ScenesPagePreview(props: Props) {
  const { initial } = props
  const { data, encodeDataAttribute } = useQuery<ScenesPagePayload | null>(
    scenesPageQuery,
    {},
    { initial },
  )

  if (!data) {
    return (
      <div className="text-center">
        Please start editing your Scenes document to see the preview!
      </div>
    )
  }

  return <ScenesPage data={data} encodeDataAttribute={encodeDataAttribute} />
}
