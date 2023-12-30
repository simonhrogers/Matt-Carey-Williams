'use client'

import type { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'
import Link from 'next/link'
import { useRef, useState } from 'react'

import { ProjectListItem } from '@/components/pages/home/ProjectListItem'
import { Header } from '@/components/shared/Header'
import { resolveHref } from '@/sanity/lib/utils'
import type { EpisodesPagePayload } from '@/types'
import IndexExhibition from '@/components/shared/IndexExhibition'

export interface EpisodesPageProps {
  data: EpisodesPagePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function EpisodesPage({ data, encodeDataAttribute }: EpisodesPageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { episodes = [], title = '' } = data ?? {}

  const [filters, setFilters] = useState([
    {
      name: 'Current Episode',
      value: 'current',
    },
    {
      name: 'Upcoming Episodes',
      value: 'upcoming',
    },
    {
      name: 'Past Episodes',
      value: 'past',
    },
  ])

  return (
    <div className="episodes-page">
      <div className="filters">
        {filters.map((filter, key) => (
          <div key={key} className="filter">
            <button
              onClick={() => {
                console.log('clicked')
              }}
            >
              {filter.name}
            </button>
          </div>
        ))}
      </div>
      <div className="episodes">
        {episodes.map((episode, key) => (
          <IndexExhibition
            key={key}
            exhibition={episode}
            label='Episode'
            encodeDataAttribute={encodeDataAttribute}
          />
        ))}
      </div>
    </div>
  )
}

export default EpisodesPage
