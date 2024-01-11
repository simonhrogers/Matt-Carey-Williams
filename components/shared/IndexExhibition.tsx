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
  
  console.log(exhibition.pressRelease);

  return (
    <div
      key={exhibition._id}
      // href={resolveHref(exhibition._type, exhibition.slug) ?? '/'}
      data-sanity={encodeDataAttribute?.([
        exhibition._type,
        exhibition._id,
        'slug',
      ])}
      className="index-exhibition"
    >
      <div className="text">
        {label} <RomanNumeral number={exhibition.number} />, <span className="title">{exhibition.title}</span><br />
        at {exhibition.location}, {(
          <Duration
            startDate={exhibition.duration.start} 
            endDate={exhibition.duration.end} 
          />
        )}
        {exhibition.pressRelease ? (
          <p>
            <a href={exhibition.pressRelease.asset.url} target="_blank">
              (Download press release)
            </a>
          </p>
        ) : (
          <p>(Download press release)</p>
        )}
      </div>
      <div className="image-wrapper">
        <SanityImage
          image={exhibition.coverImage}
          alt={exhibition.title}
          aspectRatio="0.75"
        />
      </div>
    </div>
  )
}

export default IndexExhibition