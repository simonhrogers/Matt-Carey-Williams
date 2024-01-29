'use client'

import { useEffect, useState, useCallback, useContext } from "react"
import { useRouter } from "next/navigation"
import { OriginContext } from "@/components/global/OriginTracker";
import CloseButton from "./CloseButton"
import ExhibitionPageTitleCard from "./ExhibitionPageTitleCard"
import ExhibitionPageContent from "./ExhibitionPageContent"
import ExhibitionPageArrows from "./ExhibitionPageArrows"
import { set } from "date-fns";
import ExhibitionPageAdditionalInformation from "./ExhibitionPageAdditionalInformation";

export function ExhibitionPage({exhibition, label}) {

  const [activeIndex, setActiveIndex] = useState(0)
  const [canShowContent, setCanShowContent] = useState(false)

  // useEffect(() => {
  //   console.log('activeIndex', activeIndex)
  // }, [activeIndex])

  const currentItem = activeIndex > 0 && activeIndex <= exhibition.images?.length ? exhibition.images[activeIndex - 1] : null
  const currentItemLayout = currentItem ? currentItem.layout : null

  const router = useRouter()
  const isWithinPage = useContext(OriginContext)

  const handleClose = useCallback(() => {
    if (isWithinPage) router.back()
    else router.push('/')
  }, [isWithinPage, router])

  // Notes on cursor approach: it’s great – but not if you need to accurately represent color. 
  // The color was much darker than it should be in 2016, and there’s no fix 7 years later...
  // Back to doing stupid stuff with JS and SVGs. 

  // const color = '%231C7464'
  // const svg = {
  //   attributes: `xmlns="http://www.w3.org/2000/svg" width="123.8" height="32" viewBox="0 0 123.8 32"`,
  //   styles: `<style type="text/css">.st0{fill:none;stroke:LightSeaGreen;stroke-width:2;stroke-miterlimit:10;}</style>`,
  //   paths: `<g><polyline class="st0" points="107.3,30.9 122.1,16 107.3,1.1"/><line class="st0" x1="0" y1="16" x2="122.1" y2="16"/></g>`
  // }

  return (
    <div 
      className="exhibition-page-wrapper"
      // style={{
      //   '--cursor': `url('data:image/svg+xml;utf8,<svg ${svg.attributes}>${svg.styles}${svg.paths}</svg>') 61 16, auto`
      // } as React.CSSProperties} 
    >
      <div className={`exhibition-page ${currentItemLayout}`}>
        <CloseButton 
          handleClose={handleClose}
        />
        <ExhibitionPageTitleCard
          exhibition={exhibition}
          label={label}
          activeIndex={activeIndex}
          setCanShowArrows={setCanShowContent}
        />
        <ExhibitionPageContent 
          exhibition={exhibition}
          activeIndex={activeIndex}
          canShowContent={canShowContent}
        />
        <ExhibitionPageAdditionalInformation
          exhibition={exhibition}
          activeIndex={activeIndex}
          canShowContent={canShowContent}
        />
        <ExhibitionPageArrows
          exhibition={exhibition}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          canShowArrows={true}
        />
      </div>
    </div>
  )
}

export default ExhibitionPage