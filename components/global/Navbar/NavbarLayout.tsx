'use client'

import Link from 'next/link'

import { resolveHref } from '@/sanity/lib/utils'
import type { MenuItem, SettingsPayload } from '@/types'

import Lottie from "lottie-react"
import Logo from 'assets/svg/Logo.svg'
import LogoAnimation from "assets/svg/Logo.json"
import { useRef } from 'react'

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
    },
  ] as MenuItem[]

  const logoRef = useRef()

  return (
    <div className="navbar">
      <div className='title-wrapper'>
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
        <div className="location">
          At Cork Street
        </div>
      </div>
      <div className="menu-items">
        {menuItems && menuItems.map((menuItem, key) => {
          const href = resolveHref(menuItem?._type, menuItem?.slug)
          if (!href) {
            return null
          }
          return (
            <Link
              key={key}
              className={'menu-item'}
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
