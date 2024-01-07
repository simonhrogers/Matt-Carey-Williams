'use client'

import Link from 'next/link'

import { resolveHref } from '@/sanity/lib/utils'
import type { MenuItem, SettingsPayload } from '@/types'

import Lottie from "lottie-react"
import Logo from 'assets/svg/Logo.svg'
import LogoAnimation from "assets/svg/Logo.json"
import Menu from "assets/svg/Menu.svg"
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import NavbarLocation from './NavbarLocation'

interface NavbarProps {
  data: SettingsPayload
}
export default function Navbar(props: NavbarProps) {
  const { data } = props
  // const menuItems = data?.menuItems || ([] as MenuItem[])

  const menuItems = [
    // {
    //   title: 'Episodes',
    //   slug: 'episodes',
    //   _type: 'page',
    // },
    // {
    //   title: 'Scenes',
    //   slug: 'scenes',
    //   _type: 'page',
    // },
    // {
    //   title: 'Writing',
    //   slug: 'writing',
    //   _type: 'page',
    // },
    {
      title: 'About',
      slug: 'about',
      _type: 'page',
    },
    // {
    //   title: 'Contact',
    //   slug: 'contact',
    //   _type: 'page',
    // },
  ] as MenuItem[]

  const logoRef = useRef()

  const pathname = usePathname()
  console.log(pathname)

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
    const visible = (currentScrollPos < 50 || prevScrollPos > currentScrollPos)
    setPrevScrollPos(currentScrollPos)
    setVisible(visible)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollPos, visible, handleScroll])

  return (
    <div className={`navbar ${(visible || isPhoneMenuActive) ? 'visible' : 'hidden'} ${isPhoneMenuActive ? 'active' : ''}`}>
      <Link 
        className='title-wrapper'
        href='/'
      >
        <div className="title">Matt Carey-Williams</div>
        <Lottie 
          lottieRef={logoRef}
          animationData={LogoAnimation}
          loop={false}
          autoplay={true}
          // onDataReady={() => (logoRef.current.play())}
          onComplete={() => {}}
          className="title-lottie"
          aria-label="Matt Carey-Williams"
        />
        <NavbarLocation /> 
      </Link>
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
                menu-item ${`/${menuItem.slug}` === pathname ? 'active' : ''}
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
