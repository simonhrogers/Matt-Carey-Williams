'use client'
import { useState, useCallback, useContext } from "react"
import { useRouter } from "next/navigation"
import { OriginContext } from "@/components/global/OriginTracker";
import CloseButton from "@/components/shared/CloseButton"
import type { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'
import Link from 'next/link'

import { CustomPortableText } from '@/components/shared/CustomPortableText'
import { Header } from '@/components/shared/Header'
import ImageBox from '@/components/shared/ImageBox'
import type { WritingPayload } from '@/types'
import WritingMonthYear from "@/components/shared/WritingMonthYear";
import PageHead from "@/components/shared/PageHead";

export interface WritingPageProps {
  data: WritingPayload | null
  settings: any
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function WritingPage({ data, settings, encodeDataAttribute }: WritingPageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const {
    title,
    author,
    location,
    date,
    body
  } = data ?? {}

  console.log(body);
  


  const router = useRouter()
  const isWithinPage = useContext(OriginContext)

  const handleClose = useCallback(() => {
    if (isWithinPage) router.back()
    else router.push('/')
  }, [isWithinPage, router])

  return (
    <div className="writing-page-wrapper">
      <PageHead data={data} settings={settings} />
      <div className="writing-page">
        <CloseButton 
          handleClose={handleClose}
        />
        <div className="title-wrapper">
          <div className="title">{title}</div>
          <div className="author-date-location">
            <span className="author">{author}</span>, <span className="location">{location}</span>, <WritingMonthYear date={date} />
          </div>
        </div>
        <div className="body-wrapper">
          <CustomPortableText 
            value={body}
            paragraphClasses="body"
          />
        </div>
      </div>
    </div>
  )
}

export default WritingPage