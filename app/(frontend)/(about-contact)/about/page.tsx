import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import Link from 'next/link'

import { AboutPage } from '@/components/pages/about/AboutPage'
import { studioUrl } from '@/sanity/lib/api'
import { loadAboutPage } from '@/sanity/loader/loadQuery'
const AboutPagePreview = dynamic(
  () => import('@/components/pages/about/AboutPagePreview'),
)

export default async function IndexRoute() {
  const initial = await loadAboutPage()

  if (draftMode().isEnabled) {
    return <AboutPagePreview initial={initial} />
  }

  if (!initial.data) {
    return (
      <div className="text-center">
        You don&rsquo;t have a aboutpage yet,{' '}
        <Link href={`${studioUrl}/desk/about`} className="underline">
          create one now
        </Link>
        !
      </div>
    )
  }

  return <AboutPage data={initial.data} />
}
