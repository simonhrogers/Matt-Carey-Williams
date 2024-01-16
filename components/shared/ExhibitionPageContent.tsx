import CloseButton from "./CloseButton"
import CustomPortableText from "./CustomPortableText"
import ExhibitionPageTitleCard from "./ExhibitionPageTitleCard"
import SanityImage from "./SanityImage"

export function ExhibitionPageContent({exhibition, activeIndex}) {
  return (
    <div className="exhibition-page-content">
      {exhibition.images.map((image, index) => {
        return (
          <div 
            className={`item ${index + 1 === activeIndex ? 'active' : ''}`}
            key={index}
          >
            <div className="image-wrapper">
              <SanityImage
                image={image}
                alt={image.alt}
              />
            </div>
          </div>
        )
      })}
      <div 
        className={`item ${exhibition.images.length + 1 === activeIndex ? 'active' : ''}`}
      >
        <div className="text-scroll-wrapper">
          <div className="text-wrapper">
            <div className="text">
              <CustomPortableText 
                value={exhibition.body} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExhibitionPageContent