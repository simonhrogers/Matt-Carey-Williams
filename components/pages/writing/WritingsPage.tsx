'use client'

import type { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'
import Link from 'next/link'
import { useRef, useState } from 'react'

import { ProjectListItem } from '@/components/pages/home/ProjectListItem'
import { Header } from '@/components/shared/Header'
import { resolveHref } from '@/sanity/lib/utils'
import type { WritingsPagePayload } from '@/types'
import IndexWriting from '@/components/shared/IndexWriting'

export interface WritingsPageProps {
  data: WritingsPagePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function WritingsPage({ data, encodeDataAttribute }: WritingsPageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { writings = [], title = '' } = data ?? {}

  // console.log(writings)
  
  return (
    <div className="writings-page">
      {writings.map((writing, key) => (
        <IndexWriting
          key={key}
          writing={writing}
          encodeDataAttribute={encodeDataAttribute}
        />
      ))}
    </div>
  )
}

export default WritingsPage
