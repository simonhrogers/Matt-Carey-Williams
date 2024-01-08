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
    <div className="page">
      {/* Header */}
      {/* <Header title={title} description={overview} /> */}
      <div className="shared-menu">
        {menuItems.map((item, key) => (
          <Link
            key={key}
            href={item.slug}
            className={`item ${usePathname() === item.slug ? 'active' : ''}`}
          >
            {item.title}
          </Link>
        ))}
      </div>
      {/* Body */}
      {body && (
        <CustomPortableText
          paragraphClasses="font-serif max-w-3xl text-gray-600 text-xl"
          value={body}
        />
      )}
    </div>
  )
}

export default Page
