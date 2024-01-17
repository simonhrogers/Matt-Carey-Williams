'use client'

import type { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'
import { useState } from 'react'

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
      items: writings,
    },
    {
      name: 'Writings on Episodes',
      value: 'episode',
      items: writings.filter(writing => writing.referenceType === 'episode'),
    },
    {
      name: 'Writings on Scenes',
      value: 'scene',
      items: writings.filter(writing => writing.referenceType === 'scene'),
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
        {activeFilter?.items.map((writing, key) => (
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
