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

export interface ScenesPageProps {
  data: ScenesPagePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function ScenesPage({ data, encodeDataAttribute }: ScenesPageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { scenes = [], title = '' } = data ?? {}
  
  return (
    <div className="homepage">
      {scenes.map((scene, key) => (
        <IndexExhibition
          key={key}
          exhibition={scene}
          label='Scene'
          encodeDataAttribute={encodeDataAttribute}
        />
      ))}
    </div>
  )
}

export default ScenesPage
