import CloseButton from "./CloseButton"
import ExhibitionPageTitleCard from "./ExhibitionPageTitleCard"



export function ExhibitionPage({exhibition, label}) {
  return (
    <div className="exhibition-page-wrapper">
      <div className='exhibition-page'>
        <CloseButton 
          // onClose={() => handleClose()}
        />
        <ExhibitionPageTitleCard
          exhibition={exhibition}
          label={label}
        />
      </div>
    </div>
  )
}

export default ExhibitionPage