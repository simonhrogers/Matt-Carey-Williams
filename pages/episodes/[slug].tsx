import EpisodePage from '@/components/EpisodePage'
import PreviewEpisodePage from '@/components/PreviewEpisodePage'
import { readToken } from '@/sanity/lib/api'
import {
  getAllEpisodesSlugs,
  getClient,
  getEpisode,
  getSettings,
} from '@/sanity/lib/client'
import { Episode, Settings } from '@/sanity/lib/queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'

interface PageProps extends SharedPageProps {
  episode: Episode
  moreEpisodes: Episode[]
  settings?: Settings
}

interface Query {
  [key: string]: string
}

export default function EpisodeSlugRoute(props: PageProps) {
  const { settings, episode, moreEpisodes, draftMode } = props

  if (draftMode) {
    return (
      <PreviewEpisodePage episode={episode} moreEpisodes={moreEpisodes} settings={settings} />
    )
  }

  return <EpisodePage episode={episode} moreEpisodes={moreEpisodes} settings={settings} />
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const [settings, { episode, moreEpisodes }] = await Promise.all([
    getSettings(client),
    getEpisode(client, params.slug),
  ])

  if (!episode) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      episode,
      moreEpisodes,
      settings,
      draftMode,
      token: draftMode ? readToken : '',
    },
  }
}

export const getStaticPaths = async () => {
  const slugs = await getAllEpisodesSlugs()

  return {
    paths: slugs?.map(({ slug }) => `/episodes/${slug}`) || [],
    fallback: 'blocking',
  }
}
