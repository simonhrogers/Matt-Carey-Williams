import { groq } from 'next-sanity'

export const homePageQuery = groq`
  *[_type == "home"][0]{
    _id,
    overview,
    showcaseProjects[]->{
      _type,
      coverImage,
      overview,
      "slug": slug.current,
      tags,
      title,
    },
    title,
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
  *[_type == "episode"]{
    _id,
    "slug": slug.current,
    title,
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
  *[_type == "writing"]{
    _id,
    "slug": slug.current,
    title,
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
