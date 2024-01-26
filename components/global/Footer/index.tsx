'use client'

import type { PortableTextBlock } from '@portabletext/types'
import { CustomPortableText } from '@/components//shared/CustomPortableText'
import type { SettingsPayload } from '@/types'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { useRouter } from 'next/router'

export default function Footer() {

  const items = [
    {
      title: 'Newsletter',
      href: `${usePathname()}?modal=newsletter`,
      type: 'newsletter'
    },
    {
      title: 'Contact',
      href: '/contact',
      type: 'internal'
    },
    {
      title: 'Instagram',
      href: 'https://www.instagram.com/matt_careywilliams/',
      type: 'external'
    },
    {
      title: 'Privacy Policy',
      href: '/privacy-policy',
      type: 'internal'
    }
  ]

  const pathname = usePathname()
  const router = useRouter()

  const openModal = () => {
    router.push(`${pathname}?modal=newsletter`, undefined, { shallow: true })
  }

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
                scroll={false}
              >
                {item.title}
              </Link>
            )
          } else if (item.type === 'newsletter') {
            return (
              <button
                key={key}
                className="footer-item"
                onClick={(e) => {
                  openModal()
                }}
              >
                Newsletter
              </button>
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
