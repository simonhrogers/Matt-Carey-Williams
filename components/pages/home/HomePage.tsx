'use client'

import type { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'
import Link from 'next/link'
import { useRef, useState } from 'react'

import { ProjectListItem } from '@/components/pages/home/ProjectListItem'
import { Header } from '@/components/shared/Header'
import { resolveHref } from '@/sanity/lib/utils'
import type { HomePagePayload } from '@/types'

import Lottie from "lottie-react"
import Logo from 'assets/svg/Logo.svg'
import LogoAnimation from "assets/svg/Logo.json"
import Soon from 'assets/svg/Soon.svg'
import Patience from 'assets/svg/Patience.svg'
import PatienceAnimation from "assets/svg/Patience.json"



export interface HomePageProps {
  data: HomePagePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function HomePage({ data, encodeDataAttribute }: HomePageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { overview = [], showcaseProjects = [], title = '' } = data ?? {}


  const logoRef = useRef()
  const [logoDirection, setLogoDirection] = useState(1)
  const patienceRef = useRef()
  const [patienceDirection, setPatienceDirection] = useState(1)


  return (
    <div className="homepage">
      <div className="title">Matt Carey-Williams</div>
      <div className="subtitle">Coming Soon</div>
      <div className="lol">Patience is a virtue</div>
      {/* <Logo 
        class="title-svg"
        aria-label="Matt Carey-Williams"
      /> */}
      <Lottie 
        lottieRef={logoRef}
        animationData={LogoAnimation}
        loop={false}
        autoplay={true}
        // onDataReady={() => (logoRef.current.play())}
        onComplete={() => {
          if (logoDirection === -1) {
            setLogoDirection(1)
            logoRef.current.setDirection(1)
            logoRef.current.play()
          } else {
            setPatienceDirection(1)
            patienceRef.current.setDirection(1)
            patienceRef.current.play()
          }
        }}
        className="title-lottie"
        aria-label="Matt Carey-Williams"
      />
      <Lottie 
        lottieRef={patienceRef}
        animationData={PatienceAnimation}
        loop={false}
        autoplay={false}
        // onDataReady={() => (logoRef.current.play())}
        onComplete={() => {
          if (patienceDirection === 1) {
            setTimeout(() => {
              setPatienceDirection(-1)
              patienceRef.current.setDirection(-1)
              patienceRef.current.play()
            }, 2500)
          } else {
            setLogoDirection(-1)
            logoRef.current.setDirection(-1)
            logoRef.current.play()
          }
        }}
        className="subtitle-lottie"
        aria-label="Coming Soon"
      />
      {/* <Soon 
        class="subtitle-svg"
        aria-label="Coming Soon"
      />
      <Patience 
        class="lol-svg"
        aria-label="Patience is a virtue"
      /> */}
      {/* <div className="title-unkerned">Matt Carey-Williams</div>
      <div className="subtitle-unkerned">Coming Soon</div>
      <div className="lol-unkerned">Patience is a virtue</div> */}
      {/* Header */}
      {/* {title && <Header centered title={title} description={overview} />} */}
      {/* Showcase projects */}
      {/* {showcaseProjects && showcaseProjects.length > 0 && (
        <div className="mx-auto max-w-[100rem] rounded-md border">
          {showcaseProjects.map((project, key) => {
            const href = resolveHref(project._type, project.slug)
            if (!href) {
              return null
            }
            return (
              <Link
                key={key}
                href={href}
                data-sanity={encodeDataAttribute?.([
                  'showcaseProjects',
                  key,
                  'slug',
                ])}
              >
                <ProjectListItem project={project} odd={key % 2} />
              </Link>
            )
          })}
        </div>
      )} */}
    </div>
  )
}

export default HomePage
