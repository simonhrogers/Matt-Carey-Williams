import { useEffect, useState } from "react"
import Duration from "./Duration"
import { LogoWrapper } from "./LogoWrapper"
import RomanNumeral from "./RomanNumeral"


export function ExhibitionPageTitleCard({exhibition, label, activeIndex, setCanShowArrows}) {

  const { names } = exhibition
  const name = names?.length === 1 ? names[0] : null

  const numThingsToAnimateIn = 3 + (names.length ? names.length + 1 : 0)
  
  const [numThingsAnimatedIn, setNumThingsAnimatedIn] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setNumThingsAnimatedIn((prevNum) => {
        if (prevNum < numThingsToAnimateIn) {
          return prevNum + 1
        } else {
          setCanShowArrows(true)
          clearInterval(timer)
          return prevNum
        }
      })
    }, 250)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div 
      className={`exhibition-page-title-card-wrapper ${activeIndex === 0 ? 'active' : ''}`}
    >
      <div className="exhibition-page-title-card">
        <div className="logo-location-wrapper">
          <div className={`logo-wrapper-wrapper ${numThingsAnimatedIn >= 1 ? 'visible' : 'invisible'}`}>
            <LogoWrapper
              shouldAnimate={false}
              formatAsLink={false}
              showLocation={false}
            />
          </div>
          <div className={`location ${numThingsAnimatedIn >= 2 ? 'visible' : 'invisible'}`}>
            at {exhibition.location}
          </div>
        </div>
        <div className={`title-date-wrapper ${numThingsAnimatedIn >= 3 ? 'visible' : 'invisible'}`}>
          <div className="title-wrapper">
            {label} <RomanNumeral number={exhibition.number} />: <span className="title">{exhibition.title}</span>
          </div>
          {exhibition.duration && exhibition.duration.start && exhibition.duration.end && (
            <div className="date">
              <Duration
                startDate={exhibition.duration.start} 
                endDate={exhibition.duration.end} 
              />
            </div>
          )}
        </div>
        <div className="names-wrapper">
          <div className={`with ${numThingsAnimatedIn >= 4 ? 'visible' : 'invisible'}`}>
            with
          </div>
          <div className="names">
            {exhibition.names.map((name, key) => {
              return (
                <div key={key} className={`name ${numThingsAnimatedIn >= 4 + (key + 1) ? 'visible' : 'invisible'}`}>
                  {name}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div> 
  )
}

export default ExhibitionPageTitleCard