import { useState } from "react"
import CustomPortableText from "./CustomPortableText"
import SanityImage from "./SanityImage"
import Link from "next/link"

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

  return (
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
            <a className="banner-text-item" href="/path/to/press-release" download="Press Release">Download Press Release</a>
            <a className="banner-text-item" href="/path/to/artist-cv" download="Artist’s CV">Download Artist’s CV</a>
            <a className="banner-text-item" href="/path/to/artist-portfolio" download="Artist’s Portfolio">Download Artist’s Portfolio</a>
            <Link className="banner-text-item" href="/path/to/writing">Read More</Link>
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
  )
}

export default ExhibitionPageAdditionalInformation