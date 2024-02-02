import { Suspense, useEffect, useState } from "react"
import LongArrow from "./LongArrow"
import { createPortal } from "react-dom"

export function ExhibitionPageArrows({exhibition, activeIndex, setActiveIndex, canShowArrows, currentItemLayout}) {

  const { images = [] } = exhibition || {
    images: [],
  }

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
    setMouseDirection(e.clientX > window.innerWidth / 2 ? 'right' : 'left')
  }

  const updateMousePosition = (e) => {
    setMousePosition({ x: e.pageX, y: e.pageY })
    evaluateMouseDirection(e)
  }

  const handleClick = (e) => {
    if (e.clientX > window.innerWidth / 2) {
      handleRightClick()
    } else {
      handleLeftClick()
    }
  }  

  return typeof window !== "undefined" ? (
    <div
      onMouseMove={(e) => updateMousePosition(e)}
      onMouseEnter={() => setShowArrowButton(true)}
      onMouseLeave={() => setShowArrowButton(false)}
      onClick={(e)=>handleClick(e)} 
      className={`exhibition-page-arrows`}
      id="exhibition-page-arrows"
    >
      <Suspense fallback={<div></div>}>
        {canShowArrows ? (createPortal(
          <div 
            className={`arrowButton ${mouseDirection === 'right' ? 'right' : 'left'} ${currentItemLayout}`}
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
          </div>,
          document.body
        )) : null}
      </Suspense>
    </div>
  ) : null
}

export default ExhibitionPageArrows