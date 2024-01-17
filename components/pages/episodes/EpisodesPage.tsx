'use client'

import type { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'
import Link from 'next/link'
import { useRef, useState } from 'react'

import { ProjectListItem } from '@/components/pages/home/ProjectListItem'
import { Header } from '@/components/shared/Header'
import { resolveHref } from '@/sanity/lib/utils'
import type { EpisodesPagePayload } from '@/types'
import IndexExhibition from '@/components/shared/IndexExhibition'
import Filters from '@/components/shared/Filters'

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

  const [activeFilter, setActiveFilter] = useState(filters[0])

  const filteredEpisodes = activeFilter.value === 'all' ? episodes : episodes.filter(episode => {
    const startDate = new Date(episode.duration.start)
    const endDate = new Date(episode.duration.end)
    if (activeFilter.value === 'current') {
      return startDate <= currentDate && currentDate <= endDate
    } else if (activeFilter.value === 'upcoming') {
      return startDate > currentDate
    } else if (activeFilter.value === 'past') {
      return endDate < currentDate
    }
    return true
  })

  return (
    <div className="episodes-page">
      <Filters 
        filters={filters}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <div className="episodes">
        {filteredEpisodes.map((episode, key) => (
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
