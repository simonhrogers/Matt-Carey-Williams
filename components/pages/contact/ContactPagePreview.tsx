'use client'

import { type QueryResponseInitial } from '@sanity/react-loader/rsc'

import { contactPageQuery } from '@/sanity/lib/queries'
import { useQuery } from '@/sanity/loader/useQuery'
import { ContactPagePayload } from '@/types'

import ContactPage from './ContactPage'

type Props = {
  initial: QueryResponseInitial<ContactPagePayload | null>
}

export default function ContactPagePreview(props: Props) {
  const { initial } = props
  const { data, encodeDataAttribute } = useQuery<ContactPagePayload | null>(
    contactPageQuery,
    {},
    { initial },
  )

  if (!data) {
    return (
      <div className="text-center">
        Please start editing your Contact document to see the preview!
      </div>
    )
  }

  return <ContactPage data={data} encodeDataAttribute={encodeDataAttribute} />
}
