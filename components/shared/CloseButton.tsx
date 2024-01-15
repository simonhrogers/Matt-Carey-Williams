import Close from 'assets/svg/cross.svg'

export function CloseButton() {
  return (
    <div className="close-button-wrapper">
      <button
        // onClick={() => handleClose()} 
        aria-label='Close'
        className="close-button"
      >
        <Close />
      </button>
    </div>
  )
}

export default CloseButton