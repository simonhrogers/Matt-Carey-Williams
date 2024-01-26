import EpisodePage from '@/components/pages/episodes/EpisodePage'
import { readToken } from '@/sanity/lib/api'
import {
  getAllEpisodesSlugs,
  getClient,
  getEpisodeBySlug,
  getSettings,
} from '@/sanity/lib/client'
import { EpisodePayload, SettingsPayload } from '@/types'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from '@/pages/_app'

interface PageProps extends SharedPageProps {
  episode: EpisodePayload
  settings?: SettingsPayload
}

interface Query {
  [key: string]: string
}

export default function EpisodeSlugRoute(props: PageProps) {
  const { settings, episode } = props
  return <EpisodePage data={episode} settings={settings} />
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { params = {} } = ctx
  const client = getClient({ token: readToken })

  const [settings, episode] = await Promise.all([
    getSettings(client),
    getEpisodeBySlug(client, params.slug),
  ])

  if (!episode) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      episode,
      settings,
      token: readToken,
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
