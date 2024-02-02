import { 
  // getAllPosts,
  getAllEpisodesSitemap,
  getAllScenesSitemap,
  getAllWritingsSitemap, 
  getClient 
} from '@/sanity/lib/client'

type SitemapLocation = {
  url: string
  changefreq?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never'
  priority: number
  lastmod?: Date
}

// Use this to manually add routes to the sitemap
const defaultUrls: SitemapLocation[] = [
  {
    url: '/',
    changefreq: 'daily',
    priority: 1,
    lastmod: new Date(), // or custom date: '2023-06-12T00:00:00.000Z',
  },
  { 
    url: '/episodes', 
    priority: 0.9,
    changefreq: 'monthly' 
  },
  { 
    url: '/scenes', 
    priority: 0.8,
    changefreq: 'monthly' 
  },
  { 
    url: '/writing', 
    priority: 0.7,
    changefreq: 'monthly' 
  },
  { 
    url: '/about', 
    priority: 0.6,
    changefreq: 'monthly' 
  },
  { 
    url: '/contact', 
    priority: 0.6,
    changefreq: 'monthly' 
  },
  { 
    url: '/privacy-policy', 
    changefreq: 'monthly', 
    priority: 0.4,
  },
]

const createSitemap = (locations: SitemapLocation[]) => {
  const baseUrl = process.env.NEXT_PUBLIC_URL // Make sure to configure this
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${locations
        .map((location) => {
          return `<url>
                    <loc>${baseUrl}${location.url}</loc>
                    <priority>${location.priority}</priority>
                    ${
                      location.lastmod
                        ? `<lastmod>${location.lastmod.toISOString()}</lastmod>`
                        : ''
                    }
                  </url>`
        })
        .join('')}
  </urlset>
  `
}

export default function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  const client = getClient()

  // Get list of Post urls
  // const [posts = []] = await Promise.all([getAllPosts(client)])
  // const postUrls: SitemapLocation[] = posts
  //   .filter(({ slug = '' }) => slug)
  //   .map((post) => {
  //     return {
  //       url: `/posts/${post.slug}`,
  //       priority: 0.5,
  //       lastmod: new Date(post._updatedAt),
  //     }
  //   })

  // ... get more routes here

  // Get list of Writing urls
  const [writings = []] = await Promise.all([getAllWritingsSitemap(client)])
  const writingUrls: SitemapLocation[] = writings
    .filter(({ slug = '' }) => slug)
    .map((writing) => {
      return {
        url: `/writings/${writing.slug}`,
        priority: 0.5,
        lastmod: new Date(writing._updatedAt),
      }
    })
    

  // Get list of Episode urls
  const [episodes = []] = await Promise.all([getAllEpisodesSitemap(client)])
  const episodeUrls: SitemapLocation[] = episodes
    .filter(({ slug = '' }) => slug)
    .map((episode) => {
      return {
        url: `/episodes/${episode.slug}`,
        priority: 0.5,
        lastmod: new Date(episode._updatedAt),
      }
    })

  // Get list of Scene urls
  const [scenes = []] = await Promise.all([getAllScenesSitemap(client)])
  const sceneUrls: SitemapLocation[] = scenes
    .filter(({ slug = '' }) => slug)
    .map((scene) => {
      return {
        url: `/scenes/${scene.slug}`,
        priority: 0.5,
        lastmod: new Date(scene._updatedAt),
      }
    })

  // Return the default urls, combined with dynamic urls above
  const locations = [
    ...defaultUrls, 
    ...writingUrls,
    ...episodeUrls,
    ...sceneUrls,
    // ...postUrls
  ]

  // Set response to XML
  res.setHeader('Content-Type', 'text/xml')
  res.write(createSitemap(locations))
  res.end()

  return {
    props: {},
  }
}
