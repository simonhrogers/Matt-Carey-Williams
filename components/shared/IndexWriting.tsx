import { resolveHref } from "@/sanity/lib/utils"
import Link from "next/link"
import type { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'
import RomanNumeral from "./RomanNumeral"
import Duration from "./Duration"
import SanityImage from "./SanityImage"
import { CustomPortableText } from "./CustomPortableText"
import LongArrow from "./LongArrow"
import WritingMonthYear from "./WritingMonthYear"


export interface IndexWritingProps {
  writing: Writing
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function IndexWriting({ writing, encodeDataAttribute }: IndexWritingProps) {
  
  return (
    <div className="index-writing">
      <div className="index-writing-inner">
        <Link
          key={writing._id}
          href={resolveHref(writing._type, writing.slug) ?? '/'}
          data-sanity={encodeDataAttribute?.([
            'writing',
            writing._id,
            'slug',
          ])}
          scroll={false}
        >
          <div className="title">{writing.title} (<WritingMonthYear date={writing.date} />)</div>
          <CustomPortableText 
            value={writing.excerpt} 
            paragraphClasses="excerpt"
          />
          <div className="continue-reading">
            <LongArrow /> Continue reading
          </div>
        </Link>
      </div>
    </div>
  )
}

export default IndexWriting