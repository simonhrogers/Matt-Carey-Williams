import { groq } from 'next-sanity'

const imageFields = groq`
  _type,
  alt,
  body,
  asset,
  "id": asset._ref,
  "preview": asset->metadata.lqip,
  "aspectRatio": asset->metadata.dimensions.aspectRatio,
  hotspot { x, y },
  crop {
    bottom,
    left,
    right,
    top,
  },
`

const image = groq`image {${imageFields}}`

export const homePageQuery = groq`
  *[_type == "home"][0]{
    _id,
    overview,
    title,
    "episode": *[_type == "episode"][0] {
      _id,
      _type,
      "slug": slug.current,
      title,
      "number": count(*[_type == "episode"]),
      location,
      duration,
      "coverImage": coverImage {${imageFields}},
    },
    "scene": *[_type == "scene"][0] {
      _id,
      _type,
      "slug": slug.current,
      title,
      "number": count(*[_type == "scene"]),
      location,
      duration,
      "coverImage": coverImage {${imageFields}},
    },
    "writing": *[_type == "writing"][0] {
      _id,
      _type,
      "slug": slug.current,
      title,
      excerpt,
    },
  }
`

export const aboutPageQuery = groq`
  *[_type == "page" && slug.current == "about"][0]{
    _id,
    body,
    overview,
    title,
  }
`

export const contactPageQuery = groq`
  *[_type == "page" && slug.current == "contact"][0]{
    _id,
    location,
    staffMembers[] {
      _key,
      name,
      title,
      ${image},
      body
    },
    overview,
    title,
  }
`

export const pagesBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    body,
    overview,
    title,
    "slug": slug.current,
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    client,
    coverImage,
    description,
    duration,
    overview,
    site,
    "slug": slug.current,
    tags,
    title,
  }
`

export const projectsQuery = groq`
  *[_type == "project"]{
    _id,
    coverImage,
    description,
    duration,
    overview,
    "slug": slug.current,
    tags,
    title,
  }
`

export const episodesPageQuery = groq`
  *[_type == "page" && slug.current == "episodes"][0]{
    _id,
    "slug": slug.current,
    title,
    "episodes": *[_type == "episode"] {
      _id,
      _type,
      "slug": slug.current,
      title,
      "number": count(*[_type == "episode"]),
      location,
      duration,
      "coverImage": coverImage {${imageFields}},
    }
  }
`

export const episodeBySlugQuery = groq`
  *[_type == "episode" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    title,
  }
`

export const scenesPageQuery = groq`
  *[_type == "page" && slug.current == "scenes"][0]{
    _id,
    "slug": slug.current,
    title,
    "scenes": *[_type == "scene"] {
      _id,
      _type,
      "slug": slug.current,
      title,
      "number": count(*[_type == "scene"]),
      location,
      duration,
      "coverImage": coverImage {${imageFields}},
    }
  }
`

export const sceneBySlugQuery = groq`
  *[_type == "scene" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    title,
  }
`

export const writingsPageQuery = groq`
  *[_type == "page" && slug.current == "writing"][0]{
    _id,
    "slug": slug.current,
    title,
    "writings": *[_type == "writing"] {
      _id,
      _type,
      "slug": slug.current,
      title,
      excerpt,
    }
  }
`

export const writingBySlugQuery = groq`
  *[_type == "writing" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    title,
  }
`

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    footer,
    menuItems[]->{
      _type,
      "slug": slug.current,
      title
    },
    ogImage,
  }
`
