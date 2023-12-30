import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import Link from 'next/link'

import { WritingsPage } from '@/components/pages/writing/WritingsPage'
import { studioUrl } from '@/sanity/lib/api'
import { loadWritingsPage } from '@/sanity/loader/loadQuery'
const WritingsPagePreview = dynamic(
  () => import('@/components/pages/writing/WritingsPagePreview'),
)

export default async function IndexRoute() {
  const initial = await loadWritingsPage()

  if (draftMode().isEnabled) {
    return <WritingsPagePreview initial={initial} />
  }

  if (!initial.data) {
    return (
      <div className="text-center">
        You don&rsquo;t have a writings page yet,{' '}
        <Link href={`${studioUrl}/desk/writing`} className="underline">
          create one now
        </Link>
        !
      </div>
    )
  }

  return <WritingsPage data={initial.data} />
}
