'use client'

// import { useRouter } from 'next/router'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

// import styles from './ModalHandler.module.scss'
import delQuery from '@/utils/delQuery'
import Close from 'assets/svg/cross.svg'
import ModalHandlerNewsletter from './ModalHandlerNewsletter'

export default function ModalHandler() {

  // const router = useRouter()
  // const { query, asPath } = router
  const router = useRouter()
  const asPath = usePathname()
  const query = useSearchParams()
  const asPathWithoutQuery = delQuery(asPath)

  console.log(query)
  
  const handleClose = () => {
    router.push(asPathWithoutQuery, undefined, { shallow: true })
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