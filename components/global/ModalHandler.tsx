import { useRouter } from 'next/router'
import delQuery from '@/utils/delQuery'
import ModalHandlerNewsletter from './ModalHandlerNewsletter'
import CloseButton from '../shared/CloseButton'

export default function ModalHandler() {

  const router = useRouter()
  const { query, asPath } = router
  const asPathWithoutQuery = delQuery(asPath)

  const handleClose = () => {
    router.push(asPathWithoutQuery, undefined, { shallow: true })
  }

  const newsletter = true

  return (
    <div className="modalHandler">
      <div 
        className={`modalClose ${query.modal ? `isActive` : ''}`}
        onClick={() => handleClose()}
      />
      <div className={`modal ${query.modal ? `isActive` : ''}`}>
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