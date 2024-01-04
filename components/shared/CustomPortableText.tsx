import { resolveHref } from '@/sanity/lib/utils'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'

import Link from 'next/link'

export function CustomPortableText({
  paragraphClasses,
  value,
}: {
  paragraphClasses?: string
  value: PortableTextBlock[]
}) {
  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => {
        return <p className={paragraphClasses}>{children}</p>
      },
    },
    marks: {
      link: ({ children, value }) => {
        return (
          <a href={value?.href} rel="noreferrer noopener" target='_blank'>
            {children}
          </a>
        )
      },
      linkInternal: ({ children, value }) => {        
        return (
          <Link
            href={resolveHref(value.type, value.slug) ?? '/'}
          >
            {children}
          </Link>
        )
      }
    },
    // types: {
    //   image: ({
    //     value,
    //   }: {
    //     value: Image & { alt?: string; caption?: string }
    //   }) => {
    //     return (
    //       <div className="my-6 space-y-2">
    //         <ImageBox
    //           image={value}
    //           alt={value.alt}
    //           classesWrapper="relative aspect-[16/9]"
    //         />
    //         {value?.caption && (
    //           <div className="font-sans text-sm text-gray-600">
    //             {value.caption}
    //           </div>
    //         )}
    //       </div>
    //     )
    //   },
    //   timeline: ({ value }) => {
    //     const { items } = value || {}
    //     return <TimelineSection timelines={items} />
    //   },
    // },
  }

  return (
    <div className="portable-text">
      <PortableText components={components} value={value} />
    </div>
  )
}

export default CustomPortableText
