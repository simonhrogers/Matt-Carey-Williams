import PageComponent from '@/components/pages/page/Page'
import { readToken } from '@/sanity/lib/api'
import { 
  getAllPageSlugs,
  getClient, 
  getPageBySlug, 
  getSettings 
} from '@/sanity/lib/client'
import { PagePayload, SettingsPayload } from '@/types'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from '@/pages/_app'

interface PageProps extends SharedPageProps {
  data: PagePayload
  settings: SettingsPayload
}

interface Query {
  [key: string]: string
}

export default function Page(props: PageProps) {
  const { data, settings, } = props

  return <PageComponent 
    data={data} 
    settings={settings}
  />
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { params = {} } = ctx
  const client = getClient({ token: readToken })

  const [data, settings] = await Promise.all([
    getPageBySlug(client, params.slug),
    getSettings(client)
  ])

  return {
    props: {
      data,
      settings,
      token: readToken,
    },
  }
}

export const getStaticPaths = async () => {
  const slugs = await getAllPageSlugs()
  const staticPages = [
    'about',
    'contact',
    'episodes',
    'writing',
    'scenes',
  ]
  const filteredSlugs = slugs?.filter(({ slug }) => !staticPages.includes(slug || ''))
  return {
    paths: filteredSlugs?.map(({ slug }) => `/${slug}`) || [],
    fallback: 'blocking',
  }
}