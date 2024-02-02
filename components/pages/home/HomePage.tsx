'use client'

import type { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'
import Link from 'next/link'
import { useRef, useState } from 'react'

import { ProjectListItem } from '@/components/pages/home/ProjectListItem'
import { Header } from '@/components/shared/Header'
import { resolveHref } from '@/sanity/lib/utils'
import type { HomePagePayload } from '@/types'
import Duration from '@/components/shared/Duration'
import RomanNumeral from '@/components/shared/RomanNumeral'
import BlockContent from '@/sanity/schemas/objects/blockContent'
import { CustomPortableText } from '@/components/shared/CustomPortableText'
import SanityImage from '@/components/shared/SanityImage'
import LongArrow from '@/components/shared/LongArrow'
import { IndexExhibition } from '@/components/shared/IndexExhibition'
import IndexWriting from '@/components/shared/IndexWriting'
import PageHead from '@/components/shared/PageHead'

export interface HomePageProps {
  data: HomePagePayload | null
  settings: any
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function HomePage({ data, settings, encodeDataAttribute }: HomePageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { title = '', featuredItems = [] } = data ?? {}

  console.log('data', data);
  

  return (
    <div className="home-page">
      <PageHead data={data} settings={settings} />
      {featuredItems.map((item, index) => {
        if (item._type === 'episode') {
          return (
            <IndexExhibition
              key={index}
              exhibition={item}
              label="Episode"
              encodeDataAttribute={encodeDataAttribute}
            />
          )
        } else if (item._type === 'scene') {
          return (
            <IndexExhibition 
              key={index}
              exhibition={item}
              label="Scene"
              encodeDataAttribute={encodeDataAttribute}
            />
          )
        } else if (item._type === 'writing') {
          return (
            <IndexWriting
              key={index}
              writing={item}
              encodeDataAttribute={encodeDataAttribute}
            />
          )
        }
      })}
    </div>
  )
}

export default HomePage
