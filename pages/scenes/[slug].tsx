import ScenePage from '@/components/pages/scenes/ScenePage'
import { readToken } from '@/sanity/lib/api'
import {
  getAllScenesSlugs,
  getClient,
  getSceneBySlug,
  getSettings,
} from '@/sanity/lib/client'
import { ScenePayload, SettingsPayload } from '@/types'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from '@/pages/_app'

interface PageProps extends SharedPageProps {
  scene: ScenePayload
  settings?: SettingsPayload
}

interface Query {
  [key: string]: string
}

export default function SceneSlugRoute(props: PageProps) {
  const { settings, scene } = props
  return <ScenePage data={scene} settings={settings} />
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { params = {} } = ctx
  const client = getClient({ token: readToken })

  const [settings, scene] = await Promise.all([
    getSettings(client),
    getSceneBySlug(client, params.slug),
  ])

  if (!scene) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      scene,
      settings,
      token: readToken,
    },
  }
}

export const getStaticPaths = async () => {
  const slugs = await getAllScenesSlugs()

  return {
    paths: slugs?.map(({ slug }) => `/scenes/${slug}`) || [],
    fallback: 'blocking',
  }
}
