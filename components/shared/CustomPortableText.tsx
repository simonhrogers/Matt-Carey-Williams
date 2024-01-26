import { resolveHref } from '@/sanity/lib/utils'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'

import Link from 'next/link'
import SanityImage from './SanityImage'

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
      pullquote: ({ children }) => {
        return <blockquote>{children}</blockquote>
      }
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
            scroll={false}
          >
            {children}
          </Link>
        )
      }
    },
    types: {
      image: ({value}) => {
        console.log(value);
        
        return (
          <div className="portable-text-image-wrapper">
            <div 
              className="image-wrapper"
              style={{
                paddingTop: `${(value?.height / value?.width) * 100}%`
              }}
            >
              <SanityImage
                image={value}
                alt={value.alt}
              />
            </div>
            {value?.caption && (
              <div className="caption">
                <CustomPortableText
                  value={value.caption}
                />
              </div>
            )}
          </div>
        )
      },
    },
  }

  return (
    <div className="portable-text">
      <PortableText components={components} value={value} />
    </div>
  )
}

export default CustomPortableText
