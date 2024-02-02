'use client'

import type { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'
import Link from 'next/link'
import { useRef, useState } from 'react'

// import { ProjectListItem } from '@/components/pages/contact/ProjectListItem'
import { Header } from '@/components/shared/Header'
import { resolveHref } from '@/sanity/lib/utils'
import type { ContactPagePayload } from '@/types'
import SharedMenu from '@/components/shared/SharedMenu'
import CustomPortableText from '@/components/shared/CustomPortableText'
import SanityImage from '@/components/shared/SanityImage'
import PageHead from '@/components/shared/PageHead'

export interface ContactPageProps {
  data: ContactPagePayload | null
  settings: any
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function ContactPage({ data, settings, encodeDataAttribute }: ContactPageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { overview = [], showcaseProjects = [], title = '', address = [], staffMembers = [] } = data ?? {}

  return (
    <div className="contact-page">
      <PageHead data={data} settings={settings} />
      <SharedMenu />
      <div className="content">
        {address && (
          <div className="address">
            <h2>Address</h2>
            <CustomPortableText 
              value={address}
            />
          </div>
        )}
        <div className="staff-members">
          {staffMembers && staffMembers.map((staffMember, key) => (
            <div className="staff-member" key={key}>
              <div className="image-wrapper">
                <SanityImage
                  image={staffMember.image}
                  alt={staffMember.name}
                  aspectRatio="1"
                />
              </div>
              <div className="text">
                <div className="title">
                  <h2>{staffMember.name}</h2>
                  <h3>{staffMember.title}</h3>
                </div>  
                <CustomPortableText 
                  value={staffMember.body}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ContactPage
