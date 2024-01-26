import EpisodesPage from '@/components/pages/episodes/EpisodesPage'
import { readToken } from '@/sanity/lib/api'
import { getAllEpisodes, getClient, getSettings } from '@/sanity/lib/client'
import { EpisodesPayload, SettingsPayload } from '@/types'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from '@/pages/_app'

interface PageProps extends SharedPageProps {
  data: EpisodesPayload
  settings: SettingsPayload
}

interface Query {
  [key: string]: string
}

export default function Page(props: PageProps) {
  const { data, settings } = props
  return <EpisodesPage data={data} settings={settings} />
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async () => {
  const client = getClient({ token: readToken })

  const [settings, data] = await Promise.all([
    getSettings(client),
    getAllEpisodes(client),
  ])

  return {
    props: {
      data,
      settings,
      token: readToken,
    },
  }
}
