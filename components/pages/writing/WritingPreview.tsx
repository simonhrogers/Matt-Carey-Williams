'use client'

import { type QueryResponseInitial } from '@sanity/react-loader/rsc'

import { projectBySlugQuery } from '@/sanity/lib/queries'
import { useQuery } from '@/sanity/loader/useQuery'
import { WritingPayload } from '@/types'

import WritingPage from './WritingPage'

type Props = {
  params: { slug: string }
  initial: QueryResponseInitial<WritingPayload | null>
}

export default function WritingPreview(props: Props) {
  const { params, initial } = props
  const { data, encodeDataAttribute } = useQuery<WritingPayload | null>(
    projectBySlugQuery,
    params,
    { initial },
  )

  return <WritingPage data={data!} encodeDataAttribute={encodeDataAttribute} />
}
