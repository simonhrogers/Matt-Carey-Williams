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

  const pathname = usePathname()
  const show = pathname === '/about' || pathname === '/contact'

  return show ? (
    <div className="shared-menu">
      {menuItems.map((item, key) => (
        <Link
          key={key}
          href={item.slug}
          className={`item ${pathname === item.slug ? 'active' : ''}`}
        >
          {item.title}
        </Link>
      ))}
    </div>
  ) : null
}

export default SharedMenu