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
  
  return (
    <Link
      key={exhibition._id}
      href={resolveHref(exhibition._type, exhibition.slug) ?? '/'}
      data-sanity={encodeDataAttribute?.([
        exhibition._type,
        exhibition._id,
        'slug',
      ])}
    >
      {label} <RomanNumeral number={exhibition.number} />, {exhibition.title}<br />
      at {exhibition.location}, {(
        <Duration
          startDate={exhibition.duration.start} 
          endDate={exhibition.duration.end} 
        />
      )}
      <SanityImage
        image={exhibition.coverImage}
        alt={exhibition.title}
      />
    </Link>
  )
}

export default IndexExhibition