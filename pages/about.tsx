import AboutPage from '@/components/pages/about/AboutPage'
import { readToken } from '@/sanity/lib/api'
import { getAboutPage, getClient, getSettings } from '@/sanity/lib/client'
import { AboutPagePayload, SettingsPayload } from '@/types'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from '@/pages/_app'

interface PageProps extends SharedPageProps {
  data: AboutPagePayload
  settings: SettingsPayload
}

interface Query {
  [key: string]: string
}

export default function Page(props: PageProps) {
  const { data, settings } = props
  return <AboutPage data={data} settings={settings} />
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async () => {
  const client = getClient({ token: readToken })

  const [settings, data] = await Promise.all([
    getSettings(client),
    getAboutPage(client),
  ])

  return {
    props: {
      data,
      settings,
      token: readToken,
    },
  }
}
