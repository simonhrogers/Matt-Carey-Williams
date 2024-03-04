import { resolveHref } from "@/sanity/lib/utils"
import Link from "next/link"
import type { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'
import RomanNumeral from "./RomanNumeral"
import Duration from "./Duration"
import SanityImage from "./SanityImage"


export interface IndexExhibitionProps {
  exhibition: Episode | Scene
  label: string
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function IndexExhibition({ exhibition, label, encodeDataAttribute }: IndexExhibitionProps) {

  const { 
    title = '',
    names = [],
    number = 1,
    location = '',
    duration = {
      start: '',
      end: '',
    },
    coverImage = null,
  } = exhibition || {}
  const name = names?.length === 1 ? names[0] : null
  const { start, end } = duration

  return coverImage && (
    <Link
      key={exhibition._id}
      href={resolveHref(exhibition._type, exhibition.slug) ?? '/'}
      data-sanity={encodeDataAttribute?.([
        exhibition._type,
        exhibition._id,
        'slug',
      ])}
      className="index-exhibition"
      scroll={false}
    >
      <div className="text">
        {number ? (<>{label} <RomanNumeral number={number} />: </>) : null}{name ? <span>{name},</span> : null} <span className="title">{title}</span><br />
        at {location}, {(
          <Duration
            startDate={start} 
            endDate={end}
          />
        )}
      </div>
      <div className="image-wrapper">
        {coverImage && (
          <SanityImage
            image={coverImage}
            alt={exhibition.title}
            aspectRatio="0.75"
          />
        
        )}
      </div>
    </Link>
  )
}

export default IndexExhibition