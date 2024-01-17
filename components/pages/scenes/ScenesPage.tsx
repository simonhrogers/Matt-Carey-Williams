'use client'

import type { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'
import Link from 'next/link'
import { useRef, useState } from 'react'

import { ProjectListItem } from '@/components/pages/home/ProjectListItem'
import { Header } from '@/components/shared/Header'
import { resolveHref } from '@/sanity/lib/utils'
import type { ScenesPagePayload } from '@/types'
import scene from '@/sanity/schemas/documents/scene'
import IndexExhibition from '@/components/shared/IndexExhibition'
import Filters from '@/components/shared/Filters'

export interface ScenesPageProps {
  data: ScenesPagePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function ScenesPage({ data, encodeDataAttribute }: ScenesPageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { scenes = [], title = '' } = data ?? {}
  
  const [filters, setFilters] = useState([
    {
      name: 'Current Scene',
      value: 'current',
    },
    {
      name: 'Upcoming Scenes',
      value: 'upcoming',
    },
    {
      name: 'Past Scenes',
      value: 'past',
    },
  ])

  const [activeFilter, setActiveFilter] = useState(filters[0])

  return (
    <div className="scenes-page">
      <Filters
        filters={filters}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <div className="scenes">
        {scenes.map((scene, key) => (
          <IndexExhibition
            key={key}
            exhibition={scene}
            label='Scene'
            encodeDataAttribute={encodeDataAttribute}
          />
        ))}
      </div>
    </div>
  )
}

export default ScenesPage
