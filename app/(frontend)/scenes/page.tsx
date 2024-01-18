import dynamicC from 'next/dynamic'
import { draftMode } from 'next/headers'
import Link from 'next/link'

import { ScenesPage } from '@/components/pages/scenes/ScenesPage'
import { studioUrl } from '@/sanity/lib/api'
import { loadScenesPage } from '@/sanity/loader/loadQuery'
const ScenesPagePreview = dynamicC(
  () => import('@/components/pages/scenes/ScenesPagePreview'),
)

export const dynamic = 'force-dynamic'

export default async function IndexRoute() {
  const initial = await loadScenesPage()

  if (draftMode().isEnabled) {
    return <ScenesPagePreview initial={initial} />
  }

  if (!initial.data) {
    return (
      <div className="text-center">
        You don&rsquo;t have a scenespage yet,{' '}
        <Link href={`${studioUrl}/desk/scenes`} className="underline">
          create one now
        </Link>
        !
      </div>
    )
  }

  return <ScenesPage data={initial.data} />
}
