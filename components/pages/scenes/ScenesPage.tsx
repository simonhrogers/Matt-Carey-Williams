'use client'

import type { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'
import Link from 'next/link'
import { useRef, useState } from 'react'

import { ProjectListItem } from '@/components/pages/home/ProjectListItem'
import { Header } from '@/components/shared/Header'
import { resolveHref } from '@/sanity/lib/utils'
import type { ScenesPagePayload } from '@/types'
import scene from '@/sanity/schemas/documents/scene'

export interface ScenesPageProps {
  data: ScenesPagePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function ScenesPage({ data, encodeDataAttribute }: ScenesPageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { scenes = [], title = '' } = data ?? {}

  // console.log('ScenesPage.tsx: ScenesPageProps: data: ', data);
  
  return (
    <div className="homepage">
      {scenes.map((scene, key) => {
        const href = resolveHref(scene._type, scene.slug)
        if (!href) {
          return null
        }
        return (
          <Link
            key={key}
            href={href}
            data-sanity={encodeDataAttribute?.([
              'scenes',
              key,
              'slug',
            ])}
          >
            {scene.title}
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

export default ScenesPage
