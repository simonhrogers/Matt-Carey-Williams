import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import Link from 'next/link'

import { ContactPage } from '@/components/pages/contact/ContactPage'
import { studioUrl } from '@/sanity/lib/api'
import { loadContactPage } from '@/sanity/loader/loadQuery'
const ContactPagePreview = dynamic(
  () => import('@/components/pages/contact/ContactPagePreview'),
)

export default async function ContactRoute() {
  const initial = await loadContactPage()

  if (draftMode().isEnabled) {
    return <ContactPagePreview initial={initial} />
  }

  if (!initial.data) {
    return (
      <div className="text-center">
        You don&rsquo;t have a contact page yet,{' '}
        <Link href={`${studioUrl}/desk/contact`} className="underline">
          create one now
        </Link>
        !
      </div>
    )
  }

  return <ContactPage data={initial.data} />
}
