import ScenesPage from '@/components/ScenesPage'
import PreviewScenesPage from '@/components/PreviewScenesPage'
import { readToken } from '@/sanity/lib/api'
import { getAllPosts, getClient, getSettings } from '@/sanity/lib/client'
import { Post, Settings } from '@/sanity/lib/queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'

interface PageProps extends SharedPageProps {
  posts: Post[]
  settings: Settings
}

interface Query {
  [key: string]: string
}

export default function Page(props: PageProps) {
  const { posts, settings, draftMode } = props

  if (draftMode) {
    return <PreviewScenesPage posts={posts} settings={settings} />
  }

  return <ScenesPage posts={posts} settings={settings} />
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const [settings, posts = []] = await Promise.all([
    getSettings(client),
    getAllPosts(client),
  ])

  return {
    props: {
      posts,
      settings,
      draftMode,
      token: draftMode ? readToken : '',
    },
  }
}
