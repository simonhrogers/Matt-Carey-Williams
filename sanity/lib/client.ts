import {
  apiVersion,
  dataset,
  projectId,
  studioUrl,
  useCdn,
} from './api'
import {
  homePageQuery,
  aboutPageQuery,
  contactPageQuery,
  scenesPageQuery,
  sceneBySlugQuery,
  sceneSlugsQuery,
  episodesPageQuery,
  episodeBySlugQuery,
  episodeSlugsQuery,
  writingsPageQuery,
  writingBySlugQuery,
  writingSlugsQuery,
  pageSlugsQuery,
  pageBySlugQuery,
  settingsQuery,
  episodesQuery,
  scenesQuery,
  writingsQuery,
} from './queries'
import type {
  HomePagePayload,
  ScenePayload,
  ScenesPayload,
  SettingsPayload,
  EpisodePayload,
  EpisodesPayload,
  WritingPayload,
  WritingsPayload,
  PagePayload,
} from '@/types'
import { createClient, type SanityClient } from 'next-sanity'

export function getClient(preview?: { token: string }): SanityClient {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    studioUrl,
  })
  if (preview) {
    if (!preview.token) {
      throw new Error('You must provide a token to preview drafts')
    }
    return client.withConfig({
      token: preview.token,
      useCdn: false,
      ignoreBrowserTokenWarning: true,
    })
  }
  return client
}

export const client = getClient()

export const getSanityImageConfig = () => getClient()

export async function getSettings(client: SanityClient): Promise<SettingsPayload> {
  return (await client.fetch(settingsQuery)) || {}
}

// episode

export async function getAllEpisodes(client: SanityClient): Promise<EpisodesPayload> {
  return (await client.fetch(episodesPageQuery)) || []
}

export async function getAllEpisodesSitemap(client: SanityClient): Promise<EpisodesPayload> {
  return (await client.fetch(episodesQuery)) || []
}

export async function getAllEpisodesSlugs(): Promise<Pick<EpisodePayload, 'slug'>[]> {
  const client = getClient()
  const slugs = (await client.fetch<string[]>(episodeSlugsQuery)) || []
  return slugs.map((slug) => ({ slug }))
}

export async function getEpisodeBySlug(
  client: SanityClient,
  slug: string,
): Promise<EpisodePayload> {
  return (await client.fetch(episodeBySlugQuery, { slug })) || ({} as any)
}

// scene

export async function getAllScenes(client: SanityClient): Promise<ScenesPayload> {
  return (await client.fetch(scenesPageQuery)) || []
}

export async function getAllScenesSitemap(client: SanityClient): Promise<ScenesPayload> {
  return (await client.fetch(scenesQuery)) || []
}

export async function getAllScenesSlugs(): Promise<Pick<ScenePayload, 'slug'>[]> {
  const client = getClient()
  const slugs = (await client.fetch<string[]>(sceneSlugsQuery)) || []
  return slugs.map((slug) => ({ slug }))
}

export async function getSceneBySlug(
  client: SanityClient,
  slug: string,
): Promise<ScenePayload> {
  return (await client.fetch(sceneBySlugQuery, { slug })) || ({} as any)
}

// writing

export async function getAllWritings(client: SanityClient): Promise<WritingsPayload> {
  return (await client.fetch(writingsPageQuery)) || []
}

export async function getAllWritingsSitemap(client: SanityClient): Promise<WritingsPayload> {
  return (await client.fetch(writingsQuery)) || []
}

export async function getAllWritingsSlugs(): Promise<Pick<WritingPayload, 'slug'>[]> {
  const client = getClient()
  const slugs = (await client.fetch<string[]>(writingSlugsQuery)) || []
  return slugs.map((slug) => ({ slug }))
}

export async function getWritingBySlug(
  client: SanityClient,
  slug: string,
): Promise<WritingPayload> {
  return (await client.fetch(writingBySlugQuery, { slug })) || ({} as any)
}

// page (about, contact + dynamic)

export async function getAllPageSlugs(): Promise<Pick<PagePayload, 'slug'>[]> {
  const client = getClient()
  const slugs = (await client.fetch<string[]>(pageSlugsQuery)) || []
  return slugs.map((slug) => ({ slug }))
}

export async function getPageBySlug(
  client: SanityClient,
  slug: string,
): Promise<PagePayload> {
  return (await client.fetch(pageBySlugQuery, { slug })) || ({} as any)
}

export async function getHomePage(client: SanityClient): Promise<HomePagePayload> {
  return (await client.fetch(homePageQuery)) || ({} as any)
}

export async function getAboutPage(client: SanityClient): Promise<PagePayload> {
  return (await client.fetch(aboutPageQuery)) || ({} as any)
}

export async function getContactPage(client: SanityClient): Promise<PagePayload> {
  return (await client.fetch(contactPageQuery)) || ({} as any)
}