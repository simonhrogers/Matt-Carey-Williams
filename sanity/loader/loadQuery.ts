import 'server-only'

import * as queryStore from '@sanity/react-loader'
import { draftMode } from 'next/headers'

import { client } from '@/sanity/lib/client'
import {
  aboutPageQuery,
  contactPageQuery,
  homePageQuery,
  pagesBySlugQuery,
  projectBySlugQuery,
  episodesPageQuery,
  episodeBySlugQuery,
  scenesPageQuery,
  sceneBySlugQuery,
  writingsPageQuery,
  writingBySlugQuery,
  settingsQuery,
} from '@/sanity/lib/queries'
import { token } from '@/sanity/lib/token'
import {
  AboutPagePayload,
  ContactPagePayload,
  HomePagePayload,
  PagePayload,
  ProjectPayload,
  EpisodePayload,
  ScenePayload,
  WritingPayload,
  SettingsPayload,
} from '@/types'

const serverClient = client.withConfig({
  token,
  stega: {
    // Enable stega if it's a Vercel preview deployment, as the Vercel Toolbar has controls that shows overlays
    enabled: process.env.VERCEL_ENV === 'preview',
  },
})

/**
 * Sets the server client for the query store, doing it here ensures that all data fetching in production
 * happens on the server and not on the client.
 * Live mode in `sanity/presentation` still works, as it uses the `useLiveMode` hook to update `useQuery` instances with
 * live draft content using `postMessage`.
 */
queryStore.setServerClient(serverClient)

// const usingCdn = serverClient.config().useCdn
const usingCdn = false
// Automatically handle draft mode
export const loadQuery = ((query, params = {}, options = {}) => {
  const {
    perspective = draftMode().isEnabled ? 'previewDrafts' : 'published',
  } = options
  // Don't cache by default
  let revalidate: NextFetchRequestConfig['revalidate'] = 0
  // If `next.tags` is set, and we're not using the CDN, then it's safe to cache
  if (!usingCdn && Array.isArray(options.next?.tags)) {
    revalidate = false
  } else if (usingCdn) {
    revalidate = 60
  }
  return queryStore.loadQuery(query, params, {
    ...options,
    cache: 'no-store',
    next: {
      // revalidate,
      ...(options.next || {}),
    },
    perspective,
    // @TODO add support in `@sanity/client/stega` for the below
    // stega: {enabled: draftMode().isEnabled}
  })
}) satisfies typeof queryStore.loadQuery

/**
 * Loaders that are used in more than one place are declared here, otherwise they're colocated with the component
 */

export function loadSettings() {
  return loadQuery<SettingsPayload>(
    settingsQuery,
    {},
    { next: { tags: ['settings', 'home', 'page', 'episode', 'writing'] } },
  )
}

export function loadHomePage() {
  return loadQuery<HomePagePayload | null>(
    homePageQuery,
    {},
    { next: { tags: ['home', 'episode', 'writing', 'scene'] } },
  )
}

export function loadAboutPage() {
  return loadQuery<AboutPagePayload | null>(
    aboutPageQuery,
    {},
    { next: { tags: ['page:about'] } },
  )
}

export function loadContactPage() {
  return loadQuery<ContactPagePayload | null>(
    contactPageQuery,
    {},
    { next: { tags: ['page:contact'] } },
  )
}

// export function loadProject(slug: string) {
//   return loadQuery<ProjectPayload | null>(
//     projectBySlugQuery,
//     { slug },
//     { next: { tags: [`project:${slug}`] } },
//   )
// }

export function loadEpisodesPage() {
  return loadQuery<EpisodePayload[]>(
    episodesPageQuery,
    {},
    { next: { tags: ['episode'] } },
  )
}

export function loadEpisode(slug: string) {
  return loadQuery<EpisodePayload | null>(
    episodeBySlugQuery,
    { slug },
    { next: { tags: [`episode:${slug}`] } },
  )
}

export function loadScenesPage() {
  return loadQuery<ScenePayload[]>(
    scenesPageQuery,
    {},
    { next: { tags: ['scene'] } },
  )
}

export function loadScene(slug: string) {
  return loadQuery<ScenePayload | null>(
    sceneBySlugQuery,
    { slug },
    { next: { tags: [`scene:${slug}`] } },
  )
}

export function loadWritingsPage() {
  return loadQuery<WritingPayload[]>(
    writingsPageQuery,
    {},
    { next: { tags: ['writing'] } },
  )
}

export function loadWriting(slug: string) {
  return loadQuery<WritingPayload | null>(
    writingBySlugQuery,
    { slug },
    { next: { tags: [`writing:${slug}`] } },
  )
}

export function loadPage(slug: string) {
  return loadQuery<PagePayload | null>(
    pagesBySlugQuery,
    { slug },
    { next: { tags: [`page:${slug}`] } },
  )
}
