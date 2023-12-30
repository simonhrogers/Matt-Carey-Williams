'use client'

import type { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'
import Link from 'next/link'
import { useRef, useState } from 'react'

import { ProjectListItem } from '@/components/pages/home/ProjectListItem'
import { Header } from '@/components/shared/Header'
import { resolveHref } from '@/sanity/lib/utils'
import type { EpisodesPagePayload } from '@/types'

export interface EpisodesPageProps {
  data: EpisodesPagePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function EpisodesPage({ data, encodeDataAttribute }: EpisodesPageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { episodes = [], title = '' } = data ?? {}

  return (
    <div className="homepage">
      {episodes.map((episode, key) => {
        const href = resolveHref(episode._type, episode.slug)
        if (!href) {
          return null
        }
        return (
          <Link
            key={key}
            href={href}
            data-sanity={encodeDataAttribute?.([
              'episodes',
              key,
              'slug',
            ])}
          >
            {episode.title}
          </Link>
        )
      })}
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

export default EpisodesPage
