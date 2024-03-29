import Close from '@/assets/svg/Close.svg'

export function CloseButton({handleClose}) {
  return (
    <div className="close-button-wrapper">
      <button
        onClick={handleClose}
        aria-label='Close'
        className="close-button"
      >
        <Close />
      </button>
    </div>
  )
}

export default CloseButton