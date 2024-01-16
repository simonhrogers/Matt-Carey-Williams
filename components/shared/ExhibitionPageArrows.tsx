import LongArrow from "./LongArrow"


export function ExhibitionPageArrows({exhibition, activeIndex, setActiveIndex}) {
  return (
    <div className="exhibition-page-arrows">
      <div 
        className="left"
        onClick={() => setActiveIndex(activeIndex - 1)}
      >
        <LongArrow />
      </div>
      <div 
        className="right"
        onClick={() => setActiveIndex(activeIndex + 1)}
      >
        <LongArrow />
      </div>
    </div>
  )
}

export default ExhibitionPageArrows