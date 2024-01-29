import { useEffect, useState } from "react"
import Duration from "./Duration"
import { LogoWrapper } from "./LogoWrapper"
import RomanNumeral from "./RomanNumeral"


export function ExhibitionPageTitleCard({exhibition, label, activeIndex, setCanShowArrows}) {

  const { 
    title = '',
    names = [],
    number = 1,
    location = '',
    duration = {
      start: null,
      end: null,
    },
  } = exhibition || {
    title: '',
    names: [],
    number: 1,
    location: '',
    duration: {
      start: null,
      end: null,
    },
  }
  const name = names?.length === 1 ? names[0] : 0
  const { start, end } = duration
  const numThingsToAnimateIn = 3 + (names?.length ? names.length + 1 : 0)
  const [numThingsAnimatedIn, setNumThingsAnimatedIn] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setNumThingsAnimatedIn((prevNum) => {
        if (prevNum < numThingsToAnimateIn) {
          return prevNum + 1
        } else {
          clearInterval(timer)
          return prevNum
        }
      })
      if (numThingsAnimatedIn >= numThingsToAnimateIn) {
        setCanShowArrows(true)
      }
    }, 333)
    return () => {
      clearInterval(timer)
    }
  }, [numThingsToAnimateIn, setCanShowArrows, numThingsAnimatedIn])

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
            at {location}
          </div>
        </div>
        <div className={`title-date-wrapper ${numThingsAnimatedIn >= 3 ? 'visible' : 'invisible'}`}>
          <div className="title-wrapper">
            {label} <RomanNumeral number={number} />: <span className="title">{title}</span>
          </div>

            <div className="date">
              <Duration
                startDate={start} 
                endDate={end} 
              />
            </div>

        </div>
        <div className="names-wrapper">
          <div className={`with ${numThingsAnimatedIn >= 4 ? 'visible' : 'invisible'}`}>
            with
          </div>
          <div className={`
            names 
            ${names?.length === 1 ? 'single' : ''}
            ${names?.length <= 10 && names?.length > 1 ? 'two-to-ten' : ''}
            ${names?.length > 10 && names?.length <= 20 ? 'eleven-to-twenty' : ''}
            ${names?.length > 20 ? 'twenty-one-plus' : ''}
          `}>
            {names?.map((name, key) => {
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