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
import PageHead from '@/components/shared/PageHead'

export interface AboutPageProps {
  data: AboutPagePayload | null
  settings: any
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function AboutPage({ data, settings, encodeDataAttribute }: AboutPageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { overview = [], showcaseProjects = [], title = '', body = [] } = data ?? {}

  return (
    <div className="about-page">
      <PageHead data={data} settings={settings} />
      <SharedMenu />
      {body && (
        <CustomPortableText 
          value={body} 
          paragraphClasses="about"
        />
      )}
    </div>
  )
}

export default AboutPage
