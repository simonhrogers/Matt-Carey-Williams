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

export interface HomePageProps {
  data: HomePagePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function HomePage({ data, encodeDataAttribute }: HomePageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { title = '', episode = {}, scene = {}, writing = {} } = data ?? {}

  return (
    <div className="homepage">
      {/* episode */}
      {episode ? (
        <Link
          key={episode._id}
          href={resolveHref(episode._type, episode.slug) ?? '/'}
          data-sanity={encodeDataAttribute?.([
            'episode',
            episode._id,
            'slug',
          ])}
        >
          <SanityImage
            image={episode.coverImage}
            alt={episode.title}
          />
          Episode <RomanNumeral number={episode.number} />, {episode.title}<br />
          at {episode.location}, {(
            <Duration 
              startDate={episode.duration.start} 
              endDate={episode.duration.end} 
            />
          )}
        </Link>
      ) : null}
      {/* scene */}
      {scene ? (
        <Link
          key={scene._id}
          href={resolveHref(scene._type, scene.slug) ?? '/'}
          data-sanity={encodeDataAttribute?.([
            'episode',
            scene._id,
            'slug',
          ])}
        >
          <SanityImage
            image={scene.coverImage}
            alt={scene.title}
          />
          Scene <RomanNumeral number={scene.number} />, {scene.title}<br />
          at {scene.location}, {(
            <Duration 
              startDate={scene.duration.start} 
              endDate={scene.duration.end}
            />
          )}
        </Link>
      ) : null}
      {writing ? (
        <Link
          key={writing._id}
          href={resolveHref(writing._type, writing.slug) ?? '/'}
          data-sanity={encodeDataAttribute?.([
            'episode',
            writing._id,
            'slug',
          ])}
        >
          {writing.title}
          <CustomPortableText value={writing.excerpt} />
          <LongArrow /> Continue reading
        </Link>
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
