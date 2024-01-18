'use client'

// import { useRouter } from 'next/router'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

// import styles from './ModalHandler.module.scss'
import delQuery from '@/utils/delQuery'
import Close from '@/assets/svg/cross.svg'
import ModalHandlerNewsletter from './ModalHandlerNewsletter'

export default function ModalHandler() {

  // const router = useRouter()
  // const { query, pathname } = router
  const router = useRouter()
  const pathname = usePathname()
  const query = useSearchParams()
  const pathnameWithoutQuery = delQuery(pathname)

  // console.log(query)
  
  const handleClose = () => {
    // router.push(pathnameWithoutQuery, undefined, { shallow: true })
    window.history.pushState({}, '', new URL(window.location.origin + `${pathname}`))
  }

  const modal = query.has('modal')
  // const newsletter = query.get('modal') === 'newsletter'
  const newsletter = true

  return (
    <div className="modalHandler">
      <div 
        className={`modalClose ${modal ? `isActive` : ''}`}
        onClick={() => handleClose()}
      />
      <div className={`modal ${modal ? `isActive` : ''}`}>
        <div className="closeButtonWrapper">
          <button
            onClick={() => handleClose()} 
            aria-label='Close'
            className="closeButton"
          >
            <Close />
          </button>
        </div>
        {newsletter && (
          <ModalHandlerNewsletter />
        )}
      </div>
    </div>
  )
}