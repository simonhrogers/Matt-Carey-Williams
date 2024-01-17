'use client'

import type { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'
import Link from 'next/link'
import { useRef, useState } from 'react'

import { ProjectListItem } from '@/components/pages/home/ProjectListItem'
import { Header } from '@/components/shared/Header'
import { resolveHref } from '@/sanity/lib/utils'
import type { WritingsPagePayload } from '@/types'
import IndexWriting from '@/components/shared/IndexWriting'
import Filters from '@/components/shared/Filters'

export interface WritingsPageProps {
  data: WritingsPagePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function WritingsPage({ data, encodeDataAttribute }: WritingsPageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { writings = [], title = '' } = data ?? {}

  const [filters] = useState([
    {
      name: 'All Writings',
      value: 'all',
      writings: writings,
    },
    {
      name: 'Writings on Episodes',
      value: 'episode',
      writings: writings.filter(writing => writing.referenceType === 'episode'),
    },
    {
      name: 'Writings on Scenes',
      value: 'scene',
      writings: writings.filter(writing => writing.referenceType === 'scene'),
    },
  ])

  const [activeFilter, setActiveFilter] = useState(filters[0])
  
  return (
    <div className="writings-page">
      <Filters
        filters={filters}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <div className="writings">
        {activeFilter?.writings.map((writing, key) => (
          <IndexWriting
            key={key}
            writing={writing}
            encodeDataAttribute={encodeDataAttribute}
          />
        ))}
      </div>
    </div>
  )
}

export default WritingsPage
