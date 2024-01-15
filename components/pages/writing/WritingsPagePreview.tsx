'use client'

import { type QueryResponseInitial } from '@sanity/react-loader/rsc'

import { writingsPageQuery } from '@/sanity/lib/queries'
import { useQuery } from '@/sanity/loader/useQuery'
import { WritingsPagePayload } from '@/types'

import WritingsPage from './WritingsPage'

type Props = {
  initial: QueryResponseInitial<WritingsPagePayload | null>
}

export default function WritingsPagePreview(props: Props) {
  const { initial } = props
  const { data, encodeDataAttribute } = useQuery<WritingsPagePayload | null>(
    writingsPageQuery,
    {},
    { initial },
  )

  if (!data) {
    return (
      <div className="text-center">
        Please start editing your Writings document to see the preview!
      </div>
    )
  }

  return <WritingsPage data={data} encodeDataAttribute={encodeDataAttribute} />
}
