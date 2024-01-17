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

  const [filters, setFilters] = useState([
    {
      name: 'All Writings',
      value: 'all',
    },
    {
      name: 'Writings on Episodes',
      value: 'episodes',
    },
    {
      name: 'Writings on Scenes',
      value: 'scenes',
    },
  ])
  
  return (
    <div className="writings-page">
      <div className="filters">
        {filters.map((filter, key) => (
          <div key={key} className="filter">
            <button
              onClick={() => {
                // console.log('clicked')
              }}
            >
              {filter.name}
            </button>
          </div>
        ))}
      </div>
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
