import HomePage from '@/components/pages/home/HomePage'
import { readToken } from '@/sanity/lib/api'
import { getHomePage, getClient, getSettings } from '@/sanity/lib/client'
import { HomePagePayload, SettingsPayload } from '@/types'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from '@/pages/_app'

interface PageProps extends SharedPageProps {
  data: HomePagePayload
  settings: SettingsPayload
}

interface Query {
  [key: string]: string
}

export default function Page(props: PageProps) {
  const { data, settings } = props
  return <HomePage data={data} settings={settings} />
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async () => {
  const client = getClient({ token: readToken })

  const [settings, data] = await Promise.all([
    getSettings(client),
    getHomePage(client),
  ])

  return {
    props: {
      data,
      settings,
      token: readToken,
    },
  }
}
