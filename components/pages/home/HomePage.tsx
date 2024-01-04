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

export interface HomePageProps {
  data: HomePagePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function HomePage({ data, encodeDataAttribute }: HomePageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { title = '', episode = {}, scene = {}, writing = {} } = data ?? {}

  return (
    <div className="home-page">
      {/* episode */}
      {episode ? (
        <IndexExhibition 
          exhibition={episode}
          label="Episode"
          encodeDataAttribute={encodeDataAttribute}
        />
      ) : null}
      {/* scene */}
      {scene ? (
        <IndexExhibition 
          exhibition={scene}
          label="Scene"
          encodeDataAttribute={encodeDataAttribute}
        />
      ) : null}
      {writing ? (
        <IndexWriting
          writing={writing}
          encodeDataAttribute={encodeDataAttribute}
        />
      ) : null}
      {/* Header */}
      {/* {title && <Header centered title={title} description={overview} />} */}
      {/* Showcase projects */}
      {/* {showcaseProjects && showcaseProjects.length > 0 && (
        <div className="mx-auto max-w-[100rem] rounded-md border">
          {showcaseProjects.map((project, key) => {
            const href = resolveHref(project._type, project.slug)
            if (!href) {
              return null
            }
            return (
              <Link
                key={key}
                href={href}
                data-sanity={encodeDataAttribute?.([
                  'showcaseProjects',
                  key,
                  'slug',
                ])}
              >
                <ProjectListItem project={project} odd={key % 2} />
              </Link>
            )
          })}
        </div>
      )} */}
    </div>
  )
}

export default HomePage
