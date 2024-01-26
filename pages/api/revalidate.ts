/**
 * This code is responsible for revalidating the cache when a post or author is updated.
 *
 * It is set up to receive a validated GROQ-powered Webhook from Sanity.io:
 * https://www.sanity.io/docs/webhooks
 *
 * 1. Go to the API section of your Sanity project on sanity.io/manage or run `npx sanity hook create`
 * 2. Click "Create webhook"
 * 3. Set the URL to https://YOUR_NEXTJS_SITE_URL/api/revalidate
 * 4. Dataset: Choose desired dataset or leave at default "all datasets"
 * 5. Trigger on: "Create", "Update", and "Delete"
 * 6. Filter: _type == "page" || _type == "episode" || _type == "scene" || _type == "writing" || _type == "settings"
 * 7. Projection: Leave empty
 * 8. Status: Enable webhook
 * 9. HTTP method: POST
 * 10. HTTP Headers: Leave empty
 * 11. API version: v2021-03-25
 * 12. Include drafts: No
 * 13. Secret: Set to the same value as SANITY_REVALIDATE_SECRET (create a random secret if you haven't yet)
 * 14. Save the cofiguration
 * 15. Add the secret to Vercel: `npx vercel env add SANITY_REVALIDATE_SECRET`
 * 16. Redeploy with `npx vercel --prod` to apply the new environment variable
 */

import { apiVersion, dataset, projectId } from '@/sanity/lib/api'
import { resolveHref } from '@/sanity/lib/utils'
import type { NextApiRequest, NextApiResponse } from 'next'
import {
  createClient,
  groq,
  type SanityClient,
  type SanityDocument,
} from 'next-sanity'
import { parseBody, type ParsedBody } from 'next-sanity/webhook'

export { config } from 'next-sanity/webhook'

export default async function revalidate(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { body, isValidSignature } = await parseBody(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    )
    if (!isValidSignature) {
      const message = 'Invalid signature'
      console.log(message)
      return res.status(401).send(message)
    }

    if (typeof body?._id !== 'string' || !body?._id) {
      const invalidId = 'Invalid _id'
      console.error(invalidId, { body })
      return res.status(400).send(invalidId)
    }

    const staleRoutes = await queryStaleRoutes(body as any)
    await Promise.all(staleRoutes.map((route) => res.revalidate(route)))

    const updatedRoutes = `Updated routes: ${staleRoutes.join(', ')}`
    console.log(updatedRoutes)
    return res.status(200).send(updatedRoutes)
  } catch (err) {
    console.error(err)
    return res.status(500).send(err.message)
  }
}

type StaleDocument = {
  _type: string
  slug: string
}

type StaleRoute = string

async function queryStaleRoutes(
  body
): Promise<StaleRoute[]> {
  const client = createClient({ projectId, dataset, apiVersion, useCdn: false })

  switch (body._type) {
    case 'home':
      return await queryAllRoutes(client)
    case 'page':
      return await queryStalePageRoutes(client, body._id)
    case 'episode':
      return await queryStaleEpisodeRoutes(client, body._id)
    case 'scene':
      return await queryStaleSceneRoutes(client, body._id)
    case 'writing':
      return await queryStaleWritingRoutes(client, body._id)
    case 'settings':
      return await queryAllRoutes(client)
    default:
      throw new TypeError(`Unknown type: ${body._type}`)
  }
}

async function _queryAllRoutes(client: SanityClient): Promise<StaleDocument[]> {
  return await client.fetch(groq`*[_type == "page" || _type == "episode" || _type == "scene" || _type == "writing"] {
    "slug": slug.current,
    _type
  }`)
}

async function queryAllRoutes(client: SanityClient): Promise<StaleRoute[]> {
  const docs = await _queryAllRoutes(client)

  return [
    '/', 
    ...docs.map((doc) => `${resolveHref(doc._type, doc.slug)}` as StaleRoute)
  ]
}

async function queryStalePageRoutes(
  client: SanityClient,
  id: string,
): Promise<StaleRoute[]> {
  let slugs = await client.fetch(
    groq`*[_type == "page" && _id == $id].slug.current`,
    { id },
  )

  return ['/', ...slugs.map((slug) => `/${slug}`)]
}

async function queryStaleEpisodeRoutes(
  client: SanityClient,
  id: string,
): Promise<StaleRoute[]> {
  let slugs = await client.fetch(
    groq`*[_type == "episode" && _id == $id].slug.current`,
    { id },
  )

  return ['/', '/episodes', ...slugs.map((slug) => `/episodes/${slug}`)]
}

async function queryStaleSceneRoutes(
  client: SanityClient,
  id: string,
): Promise<StaleRoute[]> {
  let slugs = await client.fetch(
    groq`*[_type == "scene" && _id == $id].slug.current`,
    { id },
  )

  return ['/', '/scenes', ...slugs.map((slug) => `/scenes/${slug}`)]
}

async function queryStaleWritingRoutes(
  client: SanityClient,
  id: string,
): Promise<StaleRoute[]> {
  let slugs = await client.fetch(
    groq`*[_type == "writing" && _id == $id].slug.current`,
    { id },
  )

  return ['/', '/writing', ...slugs.map((slug) => `/writing/${slug}`)]
}
