'use client'

import type { PortableTextBlock } from '@portabletext/types'

import { CustomPortableText } from '@/components//shared/CustomPortableText'
import type { SettingsPayload } from '@/types'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

interface FooterProps {
  data: SettingsPayload
}
export default function Footer(props: FooterProps) {
  const { data } = props
  const footer = data?.footer || ([] as PortableTextBlock[])

  const items = [
    {
      title: 'Newsletter',
      href: `${usePathname()}?modal=newsletter`,
      type: 'internal'
    },
    {
      title: 'Contact',
      href: '/contact',
      type: 'internal'
    },
    {
      title: 'Instagram',
      href: 'https://www.instagram.com/thisisnotagallery/',
      type: 'external'
    },
    {
      title: 'Privacy Policy',
      href: '/privacy-policy',
      type: 'internal'
    }
  ]

  return (
    <footer className="footer">
      <div className="footer-items">
        {items.map((item, key) => {
          if (item.type === 'internal') {
            return (
              <Link 
                key={key} 
                href={item.href}
                className="footer-item"
              >
                {item.title}
              </Link>
            )
          } else {
            return (
              <a
                key={key}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-item"
              >
                {item.title}
              </a>
            )
          }
        })}
      </div>
    </footer>
  )
}
