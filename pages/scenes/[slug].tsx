import ScenePage from '@/components/ScenePage'
import PreviewScenePage from '@/components/PreviewScenePage'
import { readToken } from '@/sanity/lib/api'
import {
  getAllScenesSlugs,
  getClient,
  getScene,
  getSettings,
} from '@/sanity/lib/client'
import { Scene, Settings } from '@/sanity/lib/queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'

interface PageProps extends SharedPageProps {
  scene: Scene
  moreScenes: Scene[]
  settings?: Settings
}

interface Query {
  [key: string]: string
}

export default function SceneSlugRoute(props: PageProps) {
  const { settings, scene, moreScenes, draftMode } = props

  if (draftMode) {
    return (
      <PreviewScenePage scene={scene} moreScenes={moreScenes} settings={settings} />
    )
  }

  return <ScenePage scene={scene} moreScenes={moreScenes} settings={settings} />
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const [settings, { scene, moreScenes }] = await Promise.all([
    getSettings(client),
    getScene(client, params.slug),
  ])

  if (!scene) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      scene,
      moreScenes,
      settings,
      draftMode,
      token: draftMode ? readToken : '',
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
