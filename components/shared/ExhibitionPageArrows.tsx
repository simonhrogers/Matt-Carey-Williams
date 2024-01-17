import LongArrow from "./LongArrow"


export function ExhibitionPageArrows({exhibition, activeIndex, setActiveIndex, canShowArrows}) {

  const showLeftArrow = activeIndex > 0
  const showRightArrow = activeIndex < exhibition.images.length + 1

  const handleLeftClick = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1)
    }
  }

  const handleRightClick = () => {
    if (activeIndex < exhibition.images.length + 1) {
      setActiveIndex(activeIndex + 1)
    }
  }

  return canShowArrows ? (
    <div className="exhibition-page-arrows">
      <div 
        className={`left ${showLeftArrow ? 'show' : ''}`}
        onClick={handleLeftClick}
      >
        <LongArrow direction={'left'} />
      </div>
      <div 
        className={`right ${showRightArrow ? 'show' : ''}`}
        onClick={handleRightClick}
      >
        <LongArrow />
      </div>
    </div>
  ) : null
}

export default ExhibitionPageArrows