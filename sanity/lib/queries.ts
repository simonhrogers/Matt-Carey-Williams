
import { groq } from 'next-sanity'

const imageFields = groq`
  _type,
  alt,
  body,
  asset,
  "id": asset._ref,
  "preview": asset->metadata.lqip,
  "aspectRatio": asset->metadata.dimensions.aspectRatio,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  hotspot { x, y },
  crop {
    bottom,
    left,
    right,
    top,
  }
`

const image = groq`image {${imageFields}}`

const exhibitions = groq`
_id,
_type,
"slug": slug.current,
title,
names,
"number": count(*[_type == "episode"]),
location,
duration,
"coverImage": coverImage {${imageFields}},
`

const exhibitionBySlug = groq`
_id,
"slug": slug.current,
title,
names,
"number": count(*[_type == "episode"]),
location,
duration,
images[] {
  ${imageFields},
  layout,
  caption,
  credit
},
body,
pressRelease {
  ...,
  asset-> {
    ...,
  }
},
cv {
  ...,
  asset-> {
    ...,
  }
},
portfolio {
  ...,
  asset-> {
    ...,
  }
},
readMore-> {
  _type,
  "slug": slug.current,
},
`

export const scenesQuery = groq`
*[_type == "scene"] | order(date desc, _updatedAt desc) {
  ${exhibitions}
}`

export const sceneSlugsQuery = groq`
*[_type == "scene" && defined(slug.current)][].slug.current
`

export const sceneBySlugQuery = groq`
*[_type == "scene" && slug.current == $slug][0] {
  ${exhibitionBySlug}
}
`

export const episodesQuery = groq`
*[_type == "episode"] | order(date desc, _updatedAt desc) {
  ${exhibitions}
}`

export const episodeSlugsQuery = groq`
*[_type == "episode" && defined(slug.current)][].slug.current
`

export const episodeBySlugQuery = groq`
*[_type == "episode" && slug.current == $slug][0] {
  ${exhibitionBySlug}
}
`

export const writingsQuery = groq`
*[_type == "writing"] | order(date desc, _updatedAt desc) {
  _id,
  _type,
  "slug": slug.current,
  title,
  excerpt,
  date,
  "referenceType": reference->_type
}`

export const writingSlugsQuery = groq`
*[_type == "writing" && defined(slug.current)][].slug.current
`

export const writingBySlugQuery = groq`
*[_type == "writing" && slug.current == $slug][0] {
  _id,
  _type,
  "slug": slug.current,
  title,
  author,
  location,
  date,
  body[]{
    ...,
    _type == "image" => {
      ${imageFields},
      caption,
    },
    _type == "imagesGroup" => {
      images[] {
        ${imageFields},
        caption,
      }
    }
  }
}
`

export const pageSlugsQuery = groq`
  *[_type == "page" && defined(slug.current)][].slug.current
`

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    body,
    overview,
    title,
    "slug": slug.current,
  }
`





export const homePageQuery = groq`
  *[_type == "home"][0]{
    _id,
    overview,
    title,
    "featuredItems": featuredItems[]->{
      _type in ["episode", "scene"] => {
        _id,
        _type,
        "slug": slug.current,
        title,
        names,
        pressRelease {
          ...,
          asset-> {
            ...,
          }
        },
        "number": count(*[_type == "scene"]),
        location,
        duration,
        "coverImage": coverImage {${imageFields}},
      },
      _type == "writing" => {
        _id,
        _type,
        "slug": slug.current,
        title,
        excerpt,
        date,
      },
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
    address,
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

// export const pagesBySlugQuery = groq`
//   *[_type == "page" && slug.current == $slug][0] {
//     _id,
//     body,
//     overview,
//     title,
//     "slug": slug.current,
//   }
// `

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
      names,
      "number": count(*[_type == "episode"]),
      location,
      duration,
      "coverImage": coverImage {${imageFields}},
    }
  }
`

// export const episodeBySlugQuery = groq`
//   *[_type == "episode" && slug.current == $slug][0] {
//     ${exhibitionBySlug}
//   }
// `

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
      names,
      "number": count(*[_type == "scene"]),
      location,
      duration,
      "coverImage": coverImage {${imageFields}},
    }
  }
`

// export const sceneBySlugQuery = groq`
//   *[_type == "scene" && slug.current == $slug][0] {
//     ${exhibitionBySlug}
//   }
// `

export const writingsPageQuery = groq`
  *[_type == "page" && slug.current == "writing"][0] {
    _id,
    "slug": slug.current,
    title,
    "writings": *[_type == "writing"] | order(date desc) {
      _id,
      _type,
      "slug": slug.current,
      title,
      excerpt,
      date,
      "referenceType": reference->_type
    }
  }
`

// export const writingBySlugQuery = groq`
//   *[_type == "writing" && slug.current == $slug][0] {
//     _id,
//     "slug": slug.current,
//     title,
//     author,
//     location,
//     date,
//     body[]{
//       ...,
//       _type == "image" => {
//         ${imageFields},
//         caption,
//       }
//     }
//   }
// `

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
