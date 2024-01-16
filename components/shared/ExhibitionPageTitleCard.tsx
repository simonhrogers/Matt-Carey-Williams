import Duration from "./Duration"
import { LogoWrapper } from "./LogoWrapper"
import RomanNumeral from "./RomanNumeral"


export function ExhibitionPageTitleCard({exhibition, label, activeIndex}) {

  const { names } = exhibition
  const name = names?.length === 1 ? names[0] : null

  return (
    <div 
      className={`exhibition-page-title-card-wrapper ${activeIndex === 0 ? 'active' : ''}`}
    >
      <div className="exhibition-page-title-card">
        <div className="logo-location-wrapper">
          <LogoWrapper
            shouldAnimate={false}
            formatAsLink={false}
            showLocation={false}
          />
          <div className="location">at {exhibition.location}</div>
        </div>
        <div className="title-date-wrapper">
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
          <div className="with">
            with
          </div>
          <div className="names">
            {exhibition.names.map((name, key) => {
              return (
                <div key={key} className="name">
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