import { resolveHref } from "@/sanity/lib/utils"
import Link from "next/link"
import type { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'
import RomanNumeral from "./RomanNumeral"
import Duration from "./Duration"
import SanityImage from "./SanityImage"
import { CustomPortableText } from "./CustomPortableText"
import LongArrow from "./LongArrow"


export interface IndexWritingProps {
  writing: Writing
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function IndexWriting({ writing, encodeDataAttribute }: IndexWritingProps) {
  
  return (
    <Link
      key={writing._id}
      href={resolveHref(writing._type, writing.slug) ?? '/'}
      data-sanity={encodeDataAttribute?.([
        'writing',
        writing._id,
        'slug',
      ])}
    >
      {writing.title}
      <CustomPortableText value={writing.excerpt} />
      <LongArrow /> Continue reading
    </Link>
  )
}

export default IndexWriting