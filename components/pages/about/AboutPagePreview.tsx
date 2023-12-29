'use client'

import { type QueryResponseInitial } from '@sanity/react-loader/rsc'

import { aboutPageQuery } from '@/sanity/lib/queries'
import { useQuery } from '@/sanity/loader/useQuery'
import { AboutPagePayload } from '@/types'

import AboutPage from './AboutPage'

type Props = {
  initial: QueryResponseInitial<AboutPagePayload | null>
}

export default function AboutPagePreview(props: Props) {
  const { initial } = props
  const { data, encodeDataAttribute } = useQuery<AboutPagePayload | null>(
    aboutPageQuery,
    {},
    { initial },
  )

  if (!data) {
    return (
      <div className="text-center">
        Please start editing your About document to see the preview!
      </div>
    )
  }

  return <AboutPage data={data} encodeDataAttribute={encodeDataAttribute} />
}
