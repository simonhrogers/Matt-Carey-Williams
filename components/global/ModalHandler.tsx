'use client'

// import { useRouter } from 'next/router'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

// import styles from './ModalHandler.module.scss'
import delQuery from '@/utils/delQuery'
import Close from '@/assets/svg/Close.svg'
import ModalHandlerNewsletter from './ModalHandlerNewsletter'
import CloseButton from '../shared/CloseButton'

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
        <CloseButton
          handleClose={handleClose}
        />
        {newsletter && (
          <ModalHandlerNewsletter />
        )}
      </div>
    </div>
  )
}