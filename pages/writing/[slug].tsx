import WritingPage from '@/components/pages/writing/WritingPage'
import { readToken } from '@/sanity/lib/api'
import {
  getAllWritingsSlugs,
  getClient,
  getWritingBySlug,
  getSettings,
} from '@/sanity/lib/client'
import { WritingPayload, SettingsPayload } from '@/types'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from '@/pages/_app'

interface PageProps extends SharedPageProps {
  writing: WritingPayload
  settings?: SettingsPayload
}

interface Query {
  [key: string]: string
}

export default function WritingSlugRoute(props: PageProps) {
  const { settings, writing } = props
  return <WritingPage data={writing} settings={settings} />
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { params = {} } = ctx
  const client = getClient({ token: readToken })

  const [settings, writing] = await Promise.all([
    getSettings(client),
    getWritingBySlug(client, params.slug),
  ])

  if (!writing) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      writing,
      settings,
      token: readToken,
    },
  }
}

export const getStaticPaths = async () => {
  const slugs = await getAllWritingsSlugs()

  return {
    paths: slugs?.map(({ slug }) => `/writing/${slug}`) || [],
    fallback: 'blocking',
  }
}
