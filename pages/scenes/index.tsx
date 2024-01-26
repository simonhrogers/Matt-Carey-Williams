import ScenesPage from '@/components/pages/scenes/ScenesPage'
import { readToken } from '@/sanity/lib/api'
import { getAllScenes, getClient, getSettings } from '@/sanity/lib/client'
import { ScenesPayload, SettingsPayload } from '@/types'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from '@/pages/_app'

interface PageProps extends SharedPageProps {
  data: ScenesPayload
  settings: SettingsPayload
}

interface Query {
  [key: string]: string
}

export default function Page(props: PageProps) {
  const { data, settings } = props
  return <ScenesPage data={data} settings={settings} />
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async () => {
  const client = getClient({ token: readToken })

  const [settings, data] = await Promise.all([
    getSettings(client),
    getAllScenes(client),
  ])

  return {
    props: {
      data,
      settings,
      token: readToken,
    },
  }
}
