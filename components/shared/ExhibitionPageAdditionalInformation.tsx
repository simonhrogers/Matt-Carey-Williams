import { useState } from "react"
import CustomPortableText from "./CustomPortableText"
import SanityImage from "./SanityImage"
import Link from "next/link"
import { resolveHref } from "@/sanity/lib/utils"

export function ExhibitionPageAdditionalInformation({exhibition, activeIndex, canShowContent}) {

  const {
    images = [],
    body = [],
  } = exhibition || {}

  const [showAdditionalInformation, setShowAdditionalInformation] = useState(false)

  const toggleAdditionalInformation = () => {
    setShowAdditionalInformation(!showAdditionalInformation)
  }

  const componentVisible = activeIndex === images.length + 1 
  const thereActuallyIsSomeAdditionalInformation = exhibition.pressRelease || exhibition.cv || exhibition.portfolio || exhibition.readMore

  return thereActuallyIsSomeAdditionalInformation ? (
    <div className={`additional-information-wrapper banners ${componentVisible ? 'visible' : ''}`}>
      <div className="additional-information-button banner">
        <button
          className="button"
          aria-label="Additional Information"
          onClick={toggleAdditionalInformation}
        >
          <span>Additional Information</span>
        </button>
      </div>
      {showAdditionalInformation ? (
        <div className="additional-information banner">
          <div className="banner-text">
            {exhibition.pressRelease ? (
              <a 
                className="banner-text-item" 
                href={exhibition.pressRelease.asset.url} 
                target="_blank" 
                download="Press Release"
              >
                Download Press Release
              </a>
            ) : null}
            {exhibition.cv ? (
              <a 
                className="banner-text-item" 
                href={exhibition.cv.asset.url} 
                target="_blank" 
                download="Artist’s CV"
              >
                Download Artist’s CV
              </a>
            ) : null}
            {exhibition.portfolio ? (
              <a 
                className="banner-text-item" 
                href={exhibition.portfolio.asset.url} 
                target="_blank" 
                download="Artist’s Portfolio"
              >
                Download Artist’s Portfolio
              </a>
            ) : null}
            {exhibition.readMore ? (
              <Link 
                className="banner-text-item" 
                href={resolveHref(exhibition.readMore._type, exhibition.readMore.slug) || '/'}
              >
                Read More
              </Link>
            ) : null}
          </div>
          <div className="banner-options">
            <button
              className="banner-option"
              onClick={toggleAdditionalInformation}
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </div>
  ) : null
}

export default ExhibitionPageAdditionalInformation