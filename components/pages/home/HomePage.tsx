import type { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'
import Link from 'next/link'

import { ProjectListItem } from '@/components/pages/home/ProjectListItem'
import { Header } from '@/components/shared/Header'
import { resolveHref } from '@/sanity/lib/utils'
import type { HomePagePayload } from '@/types'

import Logo from 'assets/svg/Logo.svg'
import Soon from 'assets/svg/Soon.svg'
import Patience from 'assets/svg/Patience.svg'

export interface HomePageProps {
  data: HomePagePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function HomePage({ data, encodeDataAttribute }: HomePageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { overview = [], showcaseProjects = [], title = '' } = data ?? {}

  return (
    <div className="homepage">
      <div className="title">Matt Carey-Williams</div>
      <div className="subtitle">Coming Soon</div>
      <div className="lol">Patience is a virtue</div>
      <Logo class="title-svg"/>
      <Soon class="subtitle-svg"/>
      <Patience class="lol-svg"/>
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
