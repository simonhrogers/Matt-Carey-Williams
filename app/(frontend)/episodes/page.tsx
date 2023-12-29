import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import Link from 'next/link'

import { EpisodesPage } from '@/components/pages/episodes/EpisodesPage'
import { studioUrl } from '@/sanity/lib/api'
import { loadEpisodesPage } from '@/sanity/loader/loadQuery'
const EpisodesPagePreview = dynamic(
  () => import('@/components/pages/episodes/EpisodesPagePreview'),
)

export default async function IndexRoute() {
  const initial = await loadEpisodesPage()

  if (draftMode().isEnabled) {
    return <EpisodesPagePreview initial={initial} />
  }

  if (!initial.data) {
    return (
      <div className="text-center">
        You don&rsquo;t have a episodespage yet,{' '}
        <Link href={`${studioUrl}/desk/episodes`} className="underline">
          create one now
        </Link>
        !
      </div>
    )
  }

  return <EpisodesPage data={initial.data} />
}
