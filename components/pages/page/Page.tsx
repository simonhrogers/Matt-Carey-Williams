'use client'

import { CustomPortableText } from '@/components/shared/CustomPortableText'
import { Header } from '@/components/shared/Header'
import type { PagePayload } from '@/types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export interface PageProps {
  data: PagePayload | null
}

export function Page({ data }: PageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { body, overview, title } = data ?? {}

  const menuItems = [
    {
      title: 'Privacy Policy',
      slug: '/privacy-policy'
    },
  ]

  return (
    <div className="page-wrapper">
      {/* Header */}
      {/* <Header title={title} description={overview} /> */}
      <div className="shared-menu">
        {menuItems.map((item, key) => (
          <div
            key={key}
            className={`item ${usePathname() === item.slug ? 'active' : ''}`}
          >
            {item.title}
          </div>
        ))}
      </div>
      <div className="page">
        {/* Body */}
        {body && (
          <div className="portable-text-wrapper">
            <CustomPortableText
              value={body}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Page
