'use client'

import { use, useEffect, useState } from "react"
import CustomPortableText from "./CustomPortableText"
import SanityImage from "./SanityImage"
import Link from "next/link"
import { createPortal } from 'react-dom';

export function ExhibitionPageContent({exhibition, activeIndex, canShowContent}) {

  const {
    images = [],
    body = [],
  } = exhibition || {}

  const [portal, setPortal] = useState(null)

  const handlePortal = () => {
    const portal = document.getElementById('exhibition-page-arrows') || null
    setPortal(portal)
  }

  useEffect(() => {
    handlePortal()
  }, [])

  return (
    <div className={`exhibition-page-content ${canShowContent ? 'visible' : 'invisible'}`}>
      {images.map((image, index) => {
        return (
          <div 
            className={`item ${index + 1 === activeIndex ? 'active' : ''} ${image.layout}`}
            key={index}
          >
            <div className="image-wrapper">
              <SanityImage
                image={image}
                alt={image.alt}
                aspectRatio={image.layout === 'fullBleed' ? 0.75 : null}
              />
            </div>
            <div className="image-text">
              <div className="caption">
                {image.caption ? <CustomPortableText 
                  value={image.caption} 
                /> : null}
              </div>
              {image.credit ? <div className="credit">
                <CustomPortableText 
                  value={image.credit} 
                />
              </div> : null}
            </div>
          </div>
        )
      })}
      <div className={`item ${images.length + 1 === activeIndex ? 'active' : ''}`}>
        <div className="text-scroll-wrapper">
          <div className="text-wrapper">
            <div className="text">
              <CustomPortableText 
                value={body} 
              />
            </div>
          </div>
        </div>
      {/* {portal && createPortal(
        <div className="text-scroll-wrapper">
          <div className="text-wrapper">
            <div className="text">
              <CustomPortableText 
                value={body} 
              />
            </div>
          </div>
        </div>,
        portal
      )} */}
      </div>
    </div>
  )
}

export default ExhibitionPageContent