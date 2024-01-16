'use client'

import { useEffect, useState, useCallback, useContext } from "react"
import { useRouter } from "next/navigation"
import { OriginContext } from "@/components/global/OriginTracker";
import CloseButton from "./CloseButton"
import ExhibitionPageTitleCard from "./ExhibitionPageTitleCard"
import ExhibitionPageContent from "./ExhibitionPageContent"
import ExhibitionPageArrows from "./ExhibitionPageArrows"

export function ExhibitionPage({exhibition, label}) {

  const [activeIndex, setActiveIndex] = useState(0)

  // useEffect(() => {
  //   console.log('activeIndex', activeIndex)
  // }, [activeIndex])

  const currentItem = activeIndex > 0 && activeIndex <= exhibition.images.length ? exhibition.images[activeIndex - 1] : null
  const currentItemLayout = currentItem ? currentItem.layout : null

  const router = useRouter()
  const isWithinPage = useContext(OriginContext)

  const handleClose = useCallback(() => {
    if (isWithinPage) router.back()
    else router.push('/')
  }, [isWithinPage, router])

  return (
    <div className="exhibition-page-wrapper">
      <div className={`exhibition-page ${currentItemLayout}`}>
        <CloseButton 
          handleClose={handleClose}
        />
        <ExhibitionPageTitleCard
          exhibition={exhibition}
          label={label}
          activeIndex={activeIndex}
        />
        <ExhibitionPageContent 
          exhibition={exhibition}
          activeIndex={activeIndex}
        />
        <ExhibitionPageArrows
          exhibition={exhibition}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      </div>
    </div>
  )
}

export default ExhibitionPage