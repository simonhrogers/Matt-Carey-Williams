import WritingsPage from '@/components/pages/writing/WritingsPage'
import { readToken } from '@/sanity/lib/api'
import { getAllWritings, getClient, getSettings } from '@/sanity/lib/client'
import { WritingsPayload, SettingsPayload } from '@/types'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from '@/pages/_app'

interface PageProps extends SharedPageProps {
  data: WritingsPayload
  settings: SettingsPayload
}

interface Query {
  [key: string]: string
}

export default function Page(props: PageProps) {
  const { data, settings } = props
  return <WritingsPage data={data} settings={settings} />
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async () => {
  const client = getClient({ token: readToken })

  const [settings, data] = await Promise.all([
    getSettings(client),
    getAllWritings(client),
  ])

  return {
    props: {
      data,
      settings,
      token: readToken,
    },
  }
}
