import { useEffect, useState } from "react"
import LongArrow from "./LongArrow"
import { createPortal } from "react-dom"

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
    setMouseDirection(e.clientX > window.innerWidth / 2 ? 'right' : 'left')
  }

  const updateMousePosition = (e) => {
    setMousePosition({ x: e.pageX, y: e.pageY })
    evaluateMouseDirection(e)
  }

  const handleClick = (e) => {
    console.log('click');
    console.log(e);
    console.log(activeIndex);
    console.log(images.length);
    
    
    if (e.clientX > window.innerWidth / 2) {
      console.log('right click');
      handleRightClick()
    } else {
      console.log('left click');
      handleLeftClick()
    }
  }

  // useEffect(() => {
  //   document.addEventListener('mousemove', updateMousePosition)
  //   document.addEventListener('click', handleClick)
  //   return () => {
  //     document.removeEventListener('mousemove', updateMousePosition)
  //     document.removeEventListener('click', handleClick)
  //   }
  // }, [])

  

  return (
    <div
      onMouseMove={(e) => updateMousePosition(e)}
      onMouseEnter={() => setShowArrowButton(true)}
      onMouseLeave={() => setShowArrowButton(false)}
      onClick={(e)=>handleClick(e)} 
      className={`exhibition-page-arrows`}
      id="exhibition-page-arrows"
    >
      {canShowArrows && document ? (createPortal(
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
        </div>,
        document.body
      )) : null}
    </div>
  )
}

export default ExhibitionPageArrows