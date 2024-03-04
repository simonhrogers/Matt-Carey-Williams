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
      imagesGroup: ({value}) => {
        return (
          <div className="portable-text-images-group">
            <div className="captions-desktop">
              {value?.images?.map((image, index) => {
                return (
                  <div key={index} className="caption-desktop">

                    <CustomPortableText
                      value={image.caption}
                    />
                  </div>
                )
              })}
            </div>
            <div className="images">
              {value?.images?.map((image, index) => {
                return (
                  <div key={index} className="image-wrapper-wrapper">
                    <div
                      key={index}
                      className="image-wrapper"
                      style={{
                        paddingTop: `${(image?.height / image?.width) * 100}%`
                      }}
                    >
                      <SanityImage
                        image={image}
                        alt={image.alt}
                      />
                    </div>
                    {image?.caption && (
                      <div className="caption-phone">
                        <CustomPortableText
                          value={image.caption}
                        />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )
      }
    },
  }

  return (
    <div className="portable-text">
      <PortableText components={components} value={value} />
    </div>
  )
}

export default CustomPortableText

// import { PortableText, PortableTextComponents } from '@portabletext/react'
// import { resolveHref } from '@/sanity/lib/utils'
// import Link from 'next/link'

// // import styles from './CustomPortableText.module.scss'

// export function CustomPortableText({
//   paragraphClasses,
//   value,
// }: {
//   paragraphClasses?: string
//   value: any[]
// }) {
//   const components: PortableTextComponents = {
//     block: {
//       normal: ({ children }) => {
//         return <p className={paragraphClasses}>{children}</p>
//       },
//     },
//     marks: {
//       link: ({ children, value }) => {
//         return (
//           <a href={value?.href} rel="noreferrer noopener" target='_blank'>
//             {children}
//           </a>
//         )
//       },
//       linkInternal: ({ children, value }) => {        
//         return (
//           <Link
//             href={resolveHref(value.type, value.slug)}
//           >
//             {children}
//           </Link>
//         )
//       }
//     },
//     // types: {
//     //   image: ({
//     //     value,
//     //   }: {
//     //     value: Image & { alt?: string; caption?: string }
//     //   }) => {
//     //     return (
//     //       <div className="my-6 space-y-2">
//     //         <ImageBox
//     //           image={value}
//     //           alt={value.alt}
//     //           classesWrapper="relative aspect-[16/9]"
//     //         />
//     //         {value?.caption && (
//     //           <div className="font-sans text-sm text-gray-600">
//     //             {value.caption}
//     //           </div>
//     //         )}
//     //       </div>
//     //     )
//     //   },
//     // },
//   }

//   return (
//     <div className="portable-text">
//       <PortableText components={components} value={value} />
//     </div>
//   )
// }

// export default CustomPortableText