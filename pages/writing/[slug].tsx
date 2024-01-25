import WritingPage from '@/components/pages/writing/WritingPage'
import WritingPreview from '@/components/pages/writing/WritingPreview'
import { readToken } from '@/sanity/lib/api'
import {
  getAllWritingsSlugs,
  getClient,
  getWriting,
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
  const { settings, writing, draftMode } = props

  if (draftMode) {
    return (
      <WritingPreview writing={writing} settings={settings} />
    )
  }

  return <WritingPage writing={writing} settings={settings} />
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const [settings, { writing, moreWritings }] = await Promise.all([
    getSettings(client),
    getWriting(client, params.slug),
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
      draftMode,
      token: draftMode ? readToken : '',
    },
  }
}

export const getStaticPaths = async () => {
  const slugs = await getAllWritingsSlugs()

  return {
    paths: slugs?.map(({ slug }) => `/writings/${slug}`) || [],
    fallback: 'blocking',
  }
}
