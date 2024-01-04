'use client'

import type { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'
import Link from 'next/link'
import { useRef, useState } from 'react'

// import { ProjectListItem } from '@/components/pages/about/ProjectListItem'
import { Header } from '@/components/shared/Header'
import { resolveHref } from '@/sanity/lib/utils'
import type { AboutPagePayload } from '@/types'
import CustomPortableText from '@/components/shared/CustomPortableText'
import SharedMenu from '@/components/shared/SharedMenu'

export interface AboutPageProps {
  data: AboutPagePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function AboutPage({ data, encodeDataAttribute }: AboutPageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { overview = [], showcaseProjects = [], title = '', body = [] } = data ?? {}

  console.log('data', data);

  return (
    <div className="about-page">
      {/* <SharedMenu /> */}
      {body && (
        <CustomPortableText 
          value={body} 
          paragraphClasses="about"
        />
      )}
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

export default AboutPage
