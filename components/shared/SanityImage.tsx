import { dataset, projectId } from '@/sanity/lib/api'
import lazysizes from 'lazysizes'
import 'lazysizes/plugins/parent-fit/ls.parent-fit'
import imageUrlBuilder from "@sanity/image-url"
import { client } from "@/sanity/lib/client"
const builder = imageUrlBuilder(client)

export const SanityImage = (props: any) => {

  const { image } = props

  const srcset = builder.image(image).width(300) + "&q=80&auto=format 300w, " +
    builder.image(image).width(400) + "&q=80&auto=format 400w, " +
    builder.image(image).width(500) + "&q=80&auto=format 500w, " +
    builder.image(image).width(600) + "&q=80&auto=format 600w, " +
    builder.image(image).width(700) + "&q=80&auto=format 700w, " +
    builder.image(image).width(800) + "&q=80&auto=format 800w, " +
    builder.image(image).width(900) + "&q=80&auto=format 900w, " +
    builder.image(image).width(1000) + "&q=80&auto=format 1000w, " +
    builder.image(image).width(1100) + "&q=80&auto=format 1100w, " +
    builder.image(image).width(1200) + "&q=80&auto=format 1200w, " +
    builder.image(image).width(1400) + "&q=80&auto=format 1400w, " +
    builder.image(image).width(1600) + "&q=80&auto=format 1600w, " +
    builder.image(image).width(1800) + "&q=80&auto=format 1800w, " +
    builder.image(image).width(2000) + "&q=80&auto=format 2000w"
  
  const loadingImageUrl = builder.image(image).width(6).blur(15)

  return (
    <img
      src={loadingImageUrl}
      data-srcset={srcset}
      data-aspectratio={image.aspectRatio}
      data-sizes="auto"
      className="image lazyload lazyfade"
      alt={image.alt}
      suppressHydrationWarning={true}
    />
  )
}

export default SanityImage