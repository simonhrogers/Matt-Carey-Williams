'use client'

import { CustomPortableText } from '@/components/shared/CustomPortableText'
import { Header } from '@/components/shared/Header'
import PageHead from '@/components/shared/PageHead'
import type { PagePayload } from '@/types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export interface PageProps {
  data: PagePayload | null
  settings: any
}

export function Page({ data, settings }: PageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { body, overview, title } = data ?? {}

  const menuItems = [
    {
      title: 'Privacy Policy',
      slug: '/privacy-policy'
    },
  ]

  const pathname = usePathname()

  return (
    <div className="page-wrapper">
      <PageHead data={data} settings={settings} />
      {/* Header */}
      {/* <Header title={title} description={overview} /> */}
      <div className="shared-menu">
        {menuItems.map((item, key) => (
          <div
            key={key}
            className={`item ${pathname === item.slug ? 'active' : ''}`}
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
