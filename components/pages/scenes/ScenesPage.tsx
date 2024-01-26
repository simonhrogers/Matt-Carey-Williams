import {  useState } from 'react'

import type { ScenesPagePayload } from '@/types'
import IndexExhibition from '@/components/shared/IndexExhibition'
import Filters from '@/components/shared/Filters'

export interface ScenesPageProps {
  data: ScenesPagePayload | null
}

export function ScenesPage({ data }: ScenesPageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { scenes = [], title = '' } = data ?? {}

  const currentDate = new Date()

  const filterScenes = (filter) => scenes.filter(scene => {
    const startDate = new Date(scene.duration.start)
    const endDate = new Date(scene.duration.end)
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
      name: 'Current Scene',
      value: 'current',
      items: filterScenes('current'),
    },
    {
      name: 'Upcoming Scenes',
      value: 'upcoming',
      items: filterScenes('upcoming'),
    },
    {
      name: 'Past Scenes',
      value: 'past',
      items: filterScenes('past'),
    },
  ])

  const [activeFilter, setActiveFilter] = useState(filters.find(filter => filter.items.length > 0) ?? filters[0])

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
          />
        ))}
      </div>
    </div>
  )
}

export default ScenesPage
