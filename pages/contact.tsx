import ContactPage from '@/components/pages/contact/ContactPage'
import { readToken } from '@/sanity/lib/api'
import { getContactPage, getClient, getSettings } from '@/sanity/lib/client'
import { ContactPagePayload, SettingsPayload } from '@/types'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from '@/pages/_app'

interface PageProps extends SharedPageProps {
  data: ContactPagePayload
  settings: SettingsPayload
}

interface Query {
  [key: string]: string
}

export default function Page(props: PageProps) {
  const { data, settings } = props
  return <ContactPage data={data} settings={settings} />
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async () => {
  const client = getClient({ token: readToken })

  const [settings, data] = await Promise.all([
    getSettings(client),
    getContactPage(client),
  ])

  return {
    props: {
      data,
      settings,
      token: readToken,
    },
  }
}
