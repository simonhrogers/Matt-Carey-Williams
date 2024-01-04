'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function SharedMenu() {

  const menuItems = [
    {
      title: 'About',
      slug: '/about'
    },
    {
      title: 'Contact',
      slug: '/contact'
    },
  ]

  return (
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
  )
}

export default SharedMenu