import {  useState } from 'react'

import type { ScenesPagePayload } from '@/types'
import IndexExhibition from '@/components/shared/IndexExhibition'
import Filters from '@/components/shared/Filters'
import PageHead from '@/components/shared/PageHead'

export interface ScenesPageProps {
  data: ScenesPagePayload | null
  settings: any
}

export function ScenesPage({ data, settings }: ScenesPageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { scenes = [], title = '' } = data ?? {}

  console.log('data', data);

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
      <PageHead data={data} settings={settings} />
      <Filters
        filters={filters}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <div className="scenes">
        {activeFilter.items.map((scene, key) => (
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
