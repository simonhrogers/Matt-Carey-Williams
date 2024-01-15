import CloseButton from "./CloseButton"
import CustomPortableText from "./CustomPortableText"
import ExhibitionPageTitleCard from "./ExhibitionPageTitleCard"
import SanityImage from "./SanityImage"

export function ExhibitionPageContent({exhibition, activeIndex, setActiveIndex}) {
  return (
    <div className="exhibition-page-content">
      {exhibition.images.map((image, index) => {
        return (
          <div 
            onClick={() => setActiveIndex(index + 1)}
            className={`item ${index + 1 === activeIndex ? 'active' : ''}`}
            key={index}
          >
            <SanityImage
              image={image}
              alt={image.alt}
              // aspectRatio="0.75"
            />
          </div>
        )
      })}
      <div 
        className={`item ${exhibition.images.length + 2 === activeIndex ? 'active' : ''}`}
      >
        <CustomPortableText 
          value={exhibition.body} 
        />
      </div>
    </div>
  )
}

export default ExhibitionPageContent