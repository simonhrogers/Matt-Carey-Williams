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
import PageHead from '@/components/shared/PageHead'


export interface EpisodesPageProps {
  data: EpisodesPagePayload | null
  settings: any
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function EpisodesPage({ data, settings, encodeDataAttribute }: EpisodesPageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { episodes = [], title = '' } = data ?? {}

  const currentDate = new Date()

  const filterEpisodes = (filter) => episodes.filter(episode => {
    const startDate = new Date(episode.duration.start)
    const endDate = new Date(episode.duration.end)
    if (filter === 'current') {
      return startDate <= currentDate && currentDate <= endDate
    } else if (filter === 'upcoming') {
      return startDate > currentDate
    } else if (filter === 'past') {
      return endDate < currentDate
    }
    return true
  })

  const [filters, setFilters] = useState([
    {
      name: 'Current Episode',
      value: 'current',
      items: filterEpisodes('current'),
    },
    {
      name: 'Upcoming Episodes',
      value: 'upcoming',
      items: filterEpisodes('upcoming'),
    },
    {
      name: 'Past Episodes',
      value: 'past',
      items: filterEpisodes('past'),
    },
  ])

  const [activeFilter, setActiveFilter] = useState(filters.find(filter => filter.items.length > 0) ?? filters[0])

  return (
    <div className="episodes-page">
      <PageHead data={data} settings={settings} />
      <Filters 
        filters={filters}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <div className="episodes">
        {activeFilter.items.map((episode, key) => (
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
