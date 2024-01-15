'use client'

import { useEffect, useState } from "react"
import CloseButton from "./CloseButton"
import ExhibitionPageTitleCard from "./ExhibitionPageTitleCard"
import ExhibitionPageContent from "./ExhibitionPageContent"

export function ExhibitionPage({exhibition, label}) {

  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    console.log('activeIndex', activeIndex)
  }, [activeIndex])

  return (
    <div className="exhibition-page-wrapper">
      <div className='exhibition-page'>
        <CloseButton 
          // onClose={() => handleClose()}
        />
        <ExhibitionPageTitleCard
          exhibition={exhibition}
          label={label}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
        <ExhibitionPageContent 
          exhibition={exhibition}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      </div>
    </div>
  )
}

export default ExhibitionPage