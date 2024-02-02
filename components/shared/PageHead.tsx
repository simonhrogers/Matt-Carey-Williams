import { urlForImage } from '@/sanity/lib/image'
import Head from 'next/head'

import SiteMeta from '@/components/shared/SiteMeta'

export default function PageHead({ settings, data, noIndex = false }) {
  console.log(settings)
  console.log(data)

  const staticFallbacks = {
    title: 'Matt Carey-Williams',
    description: 'Matt Carey-Williams works with contemporary artists on exceptional exhibitions. Through a year-round programme in London and presentations at venues across the world, his nomadic curatorial project stages unexpected encounters between emerging and established artists and international audiences, drawing on three decades’ experience connecting artists, institutions and collectors at the highest levels.',
    image: null,
  }

  const title = data.seoTitle || settings.title || staticFallbacks.title
  const description =
    data.seoDescription || settings.description || staticFallbacks.description
  const image = data.seoImage || settings.image || staticFallbacks.image

  let titleWithSiteName = `${title} | ${settings.title}`

  if (
    title === settings.title ||
    title === 'Homepage' ||
    title === 'Home' ||
    title === 'Index' ||
    title === 'Matt Carey-Williams'
  ) {
    titleWithSiteName = settings.title
  }

  return (
    <Head>
      <title>{titleWithSiteName}</title>
      <SiteMeta />
      <meta key="description" name="description" content={description} />
      {image?.asset && (
        <meta
          property="og:image"
          content={urlForImage(image).width(1200).height(627).fit('crop').url()}
        />
      )}
      {noIndex && <meta name="robots" content="noindex" />}
    </Head>
  )
}
