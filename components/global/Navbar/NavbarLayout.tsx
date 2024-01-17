'use client'

import Link from 'next/link'

import { resolveHref } from '@/sanity/lib/utils'
import type { MenuItem, SettingsPayload } from '@/types'

import Menu from "assets/svg/Menu.svg"
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { LogoWrapper } from '@/components/shared/LogoWrapper'


interface NavbarProps {
  data: SettingsPayload
}
export default function Navbar(props: NavbarProps) {
  const { data } = props
  // const menuItems = data?.menuItems || ([] as MenuItem[])

  const menuItems = [
    {
      title: 'Episodes',
      slug: 'episodes',
      _type: 'page',
    },
    {
      title: 'Scenes',
      slug: 'scenes',
      _type: 'page',
    },
    {
      title: 'Writing',
      slug: 'writing',
      _type: 'page',
    },
    {
      title: 'About',
      slug: 'about',
      _type: 'page',
      children: [
        {
          title: 'Contact',
          slug: 'contact',
          _type: 'page',
        },
      ]
    },
  ] as MenuItem[]

  const pathname = usePathname()
  const activeParentPath = menuItems.find(item => item.slug === pathname.split('/')[1])?.slug

  const [isPhoneMenuActive, setIsPhoneMenuActive] = useState(false)

  const openPhoneMenu = () => {
    setIsPhoneMenuActive(true)
  }

  const closePhoneMenu = () => {
    setIsPhoneMenuActive(false)
  }

  const handleClick = (page) => {
    if (page.slug === pathname) {
      setIsPhoneMenuActive(false)
    }
  }

  useEffect(() => {
    closePhoneMenu()
  }, [pathname])

  // make header disappear on scroll down

  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)

  const handleScroll = () => {
    const currentScrollPos = window.scrollY
    const visible = (currentScrollPos <= 100 || prevScrollPos > currentScrollPos && currentScrollPos > 100)
    setPrevScrollPos(currentScrollPos)
    setVisible(visible)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollPos, visible, handleScroll])

  return (
    <div className={`navbar ${(visible || isPhoneMenuActive) ? 'visible' : 'hidden'} ${isPhoneMenuActive ? 'active' : ''}`}>
      <LogoWrapper
        shouldAnimate={true}
        formatAsLink={true}
        showLocation={true}
      />
      <button
        className={`phone-menu-button ${isPhoneMenuActive ? 'active' : ''}`}
        onClick={isPhoneMenuActive ? closePhoneMenu : openPhoneMenu}
        aria-label={isPhoneMenuActive ? 'Close Menu' : 'Open Menu'}
      >
        <Menu className={`svg ${isPhoneMenuActive ? 'active' : ''}`} />
      </button>
      <div className={`menu-items ${isPhoneMenuActive ? 'active' : ''}`}>
        {menuItems && menuItems.map((menuItem, key) => {
          const href = resolveHref(menuItem?._type, menuItem?.slug)
          if (!href) {
            return null
          }
          return (
            <Link
              key={key}
              className={`
                menu-item 
                ${(`/${menuItem.slug}` === pathname || menuItem.children?.some(item => `/${item.slug}` === pathname) || menuItem.slug === activeParentPath) ? 'active' : ''}

              `}
              href={href}
            >
              {menuItem.title}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
