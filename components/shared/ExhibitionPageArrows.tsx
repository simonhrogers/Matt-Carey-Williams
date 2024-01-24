import { useState } from "react"
import LongArrow from "./LongArrow"
import { set } from "date-fns"


export function ExhibitionPageArrows({exhibition, activeIndex, setActiveIndex, canShowArrows}) {

  const { images = [] } = exhibition || {}

  const showLeftArrow = activeIndex > 0
  const showRightArrow = activeIndex < images.length + 1

  const handleLeftClick = () => {
    if (showLeftArrow) {
      setActiveIndex(activeIndex - 1)
    } else {
      setActiveIndex(images.length + 1)
    }
  }

  const handleRightClick = () => {
    if (showRightArrow) {
      setActiveIndex(activeIndex + 1)
    } else {
      setActiveIndex(0)
    }
  }

  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 })
  const [mouseDirection, setMouseDirection] = useState('right')
  const [showArrowButton, setShowArrowButton] = useState(true)
  const [trulyShowArrowButton, setTrulyShowArrowButton] = useState(true)

  const evaluateMouseDirection = (e) => {
    // console.log(e);
    // if (!showLeftArrow) setMouseDirection('right')
    // else if (!showRightArrow) setMouseDirection('left')
    // else setMouseDirection(e.clientX > window.innerWidth / 2 ? 'right' : 'left')
    setMouseDirection(e.clientX > window.innerWidth / 2 ? 'right' : 'left')
  }

  const updateMousePosition = (e) => {
    setMousePosition({ x: e.pageX, y: e.pageY })
    evaluateMouseDirection(e)
  }

  const handleClick = (e) => {
    // if (!showLeftArrow) handleRightClick()
    // else if (!showRightArrow) handleLeftClick()
    // else if (e.clientX > window.innerWidth / 2) {
    //   handleRightClick()
    // } else {
    //   handleLeftClick()
    // }
    if (e.clientX > window.innerWidth / 2) {
      handleRightClick()
    } else {
      handleLeftClick()
    }
  }

  return canShowArrows ? (
    // <div className="exhibition-page-arrows">
    //   <div 
    //     className={`left ${showLeftArrow ? 'show' : ''}`}
    //     onClick={handleLeftClick}
    //   >
    //     <LongArrow direction={'left'} />
    //   </div>
    //   <div 
    //     className={`right ${showRightArrow ? 'show' : ''}`}
    //     onClick={handleRightClick}
    //   >
    //     <LongArrow />
    //   </div>
    // </div>
    <div
      onMouseMove={(e) => updateMousePosition(e)}
      onMouseEnter={() => setShowArrowButton(true)}
      onMouseLeave={() => setShowArrowButton(false)}
      onClick={(e)=>handleClick(e)} 
      className={`exhibition-page-arrows`}
    >
      <div 
        className={`arrowButton ${mouseDirection === 'right' ? 'right' : 'left'}`}
        style={{
          top: mousePosition.y,
          left: mousePosition.x,
          opacity: showArrowButton && trulyShowArrowButton ? 1 : 0
        }}
      >
        {mouseDirection === 'right' ? ( 
          <div className={`right ${showRightArrow ? 'show' : ''}`}>
            <LongArrow />
          </div>
        ) : (
          <div className={`left ${showLeftArrow ? 'show' : ''}`}>
            <LongArrow direction={'left'} />
          </div>
        )}
      </div>
    </div>

  ) : null
}

export default ExhibitionPageArrows