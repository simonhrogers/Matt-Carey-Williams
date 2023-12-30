'use client'

import type { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'
import Link from 'next/link'
import { useRef, useState } from 'react'

import { ProjectListItem } from '@/components/pages/home/ProjectListItem'
import { Header } from '@/components/shared/Header'
import { resolveHref } from '@/sanity/lib/utils'
import type { HomePagePayload } from '@/types'

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
          {episode.title}
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
          {scene.title}
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
