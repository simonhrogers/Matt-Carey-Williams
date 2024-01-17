import CustomPortableText from "./CustomPortableText"
import SanityImage from "./SanityImage"

export function ExhibitionPageContent({exhibition, activeIndex, canShowContent}) {
  return (
    <div className={`exhibition-page-content ${canShowContent ? 'visible' : 'invisible'}`}>
      {exhibition.images.map((image, index) => {
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
      <div className={`item ${exhibition.images.length + 1 === activeIndex ? 'active' : ''}`}>
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